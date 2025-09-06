import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SupportedLanguage } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: colorScheme === 'dark',
    language: SupportedLanguage.ENGLISH,
    notifications: {
      diseaseAlerts: true,
      weeklyTips: true,
      subscriptionUpdates: false,
      marketPrices: true,
    },
    subscription: {
      type: 'free',
      scansRemaining: 7,
      maxScansPerMonth: 10,
    },
  });

  const languages = [
    { code: SupportedLanguage.ENGLISH, name: 'English', flag: '🇬🇧' },
    { code: SupportedLanguage.SHONA, name: 'Shona', flag: '🇿🇼' },
    { code: SupportedLanguage.NDEBELE, name: 'Ndebele', flag: '🇿🇼' },
  ];

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSettings(prev => ({ ...prev, language }));
    // In real app, implement language switching
    Alert.alert('Language Changed', `Language set to ${languages.find(l => l.code === language)?.name}`);
  };

  const handleNotificationToggle = (type: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleDarkModeToggle = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
    // In real app, implement theme switching
  };

  const handleSubscriptionUpgrade = () => {
    Alert.alert(
      'Subscription Upgrade',
      'Subscription management will be available in a future update.',
      [{ text: 'OK' }]
    );
  };

  const handleBackup = () => {
    Alert.alert('Backup', 'Your data has been backed up to the cloud.');
  };

  const handleExportData = () => {
    Alert.alert('Export', 'Your data is being prepared for export.');
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset App',
      'Are you sure you want to reset all app data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => {
          Alert.alert('Reset Complete', 'App has been reset to default settings.');
        }}
      ]
    );
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    rightElement, 
    onPress, 
    showArrow = true 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.icon }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      
      <View style={styles.settingRight}>
        {rightElement}
        {showArrow && onPress && (
          <Ionicons name="chevron-forward" size={16} color={colors.icon} style={styles.settingArrow} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <AgriButton
            title=""
            onPress={() => router.back()}
            variant="outline"
            size="small"
            icon="arrow-back"
            style={styles.backButton}
          />
          
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Settings
          </Text>
          
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Subscription Status */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Subscription</Text>
            
            <View style={[styles.subscriptionCard, { 
              backgroundColor: settings.subscription.type === 'free' 
                ? Colors.agriculture.warning + '10' 
                : Colors.agriculture.success + '10',
              borderColor: settings.subscription.type === 'free'
                ? Colors.agriculture.warning + '30'
                : Colors.agriculture.success + '30'
            }]}>
              <View style={styles.subscriptionHeader}>
                <View style={styles.subscriptionInfo}>
                  <Text style={[styles.subscriptionType, { 
                    color: settings.subscription.type === 'free' 
                      ? Colors.agriculture.warning 
                      : Colors.agriculture.success 
                  }]}>
                    {settings.subscription.type === 'free' ? 'Free Plan' : 'Pro Plan'}
                  </Text>
                  {settings.subscription.type === 'free' && (
                    <Text style={[styles.scansRemaining, { color: colors.text }]}>
                      {settings.subscription.scansRemaining}/{settings.subscription.maxScansPerMonth} scans left
                    </Text>
                  )}
                </View>
                
                <Ionicons 
                  name={settings.subscription.type === 'free' ? 'star-outline' : 'star'} 
                  size={24} 
                  color={settings.subscription.type === 'free' 
                    ? Colors.agriculture.warning 
                    : Colors.agriculture.sunYellow
                  } 
                />
              </View>
              
              {settings.subscription.type === 'free' && (
                <AgriButton
                  title="Upgrade to Pro"
                  onPress={handleSubscriptionUpgrade}
                  variant="warning"
                  size="medium"
                  icon="rocket"
                  fullWidth
                  style={styles.upgradeButton}
                />
              )}
            </View>
          </View>

          {/* Appearance */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
            
            <SettingItem
              icon="moon"
              title="Dark Mode"
              subtitle="Use dark theme throughout the app"
              rightElement={
                <Switch
                  value={settings.darkMode}
                  onValueChange={handleDarkModeToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={settings.darkMode ? 'white' : colors.icon}
                />
              }
              showArrow={false}
            />
          </View>

          {/* Language */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Language</Text>
            
            {languages.map((lang) => (
              <SettingItem
                key={lang.code}
                icon="language"
                title={`${lang.flag} ${lang.name}`}
                subtitle={lang.code === settings.language ? 'Current language' : undefined}
                onPress={() => handleLanguageChange(lang.code)}
                rightElement={
                  lang.code === settings.language ? (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  ) : null
                }
                showArrow={lang.code !== settings.language}
              />
            ))}
          </View>

          {/* Notifications */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
            
            <SettingItem
              icon="warning"
              title="Disease Alerts"
              subtitle="Get notified about disease outbreaks in your area"
              rightElement={
                <Switch
                  value={settings.notifications.diseaseAlerts}
                  onValueChange={() => handleNotificationToggle('diseaseAlerts')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={settings.notifications.diseaseAlerts ? 'white' : colors.icon}
                />
              }
              showArrow={false}
            />
            
            <SettingItem
              icon="school"
              title="Weekly Tips"
              subtitle="Receive farming tips and best practices"
              rightElement={
                <Switch
                  value={settings.notifications.weeklyTips}
                  onValueChange={() => handleNotificationToggle('weeklyTips')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={settings.notifications.weeklyTips ? 'white' : colors.icon}
                />
              }
              showArrow={false}
            />
            
            <SettingItem
              icon="trending-up"
              title="Market Prices"
              subtitle="Updates on crop market prices"
              rightElement={
                <Switch
                  value={settings.notifications.marketPrices}
                  onValueChange={() => handleNotificationToggle('marketPrices')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={settings.notifications.marketPrices ? 'white' : colors.icon}
                />
              }
              showArrow={false}
            />
          </View>

          {/* Data & Privacy */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Data & Privacy</Text>
            
            <SettingItem
              icon="cloud-upload"
              title="Backup Data"
              subtitle="Backup your scans and settings to the cloud"
              onPress={handleBackup}
            />
            
            <SettingItem
              icon="download"
              title="Export Data"
              subtitle="Download your data in CSV format"
              onPress={handleExportData}
            />
            
            <SettingItem
              icon="shield-checkmark"
              title="Privacy Policy"
              subtitle="View our privacy policy and data usage"
              onPress={() => Alert.alert('Privacy Policy', 'Privacy policy will be available in a future update.')}
            />
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
            
            <SettingItem
              icon="help-circle"
              title="Help Center"
              subtitle="Get help and find answers to common questions"
              onPress={() => Alert.alert('Help Center', 'Help documentation will be available in a future update.')}
            />
            
            <SettingItem
              icon="mail"
              title="Contact Support"
              subtitle="Get in touch with our support team"
              onPress={() => Alert.alert('Contact Support', 'Support contact will be available in a future update.')}
            />
            
            <SettingItem
              icon="star"
              title="Rate App"
              subtitle="Rate AgriDoctor on the app store"
              onPress={() => Alert.alert('Rate App', 'Thank you for using AgriDoctor!')}
            />
          </View>

          {/* About */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
            
            <SettingItem
              icon="information-circle"
              title="App Version"
              subtitle="Version 1.0.0 (Build 1)"
              showArrow={false}
            />
            
            <SettingItem
              icon="document-text"
              title="Terms of Service"
              subtitle="Read our terms and conditions"
              onPress={() => Alert.alert('Terms & Conditions', 'Terms and conditions will be available in a future update.')}
            />
            
            <SettingItem
              icon="people"
              title="About AgriDoctor"
              subtitle="Learn more about our mission and team"
              onPress={() => Alert.alert('About AgriDoctor', 'About information will be available in a future update.')}
            />
          </View>

          {/* Danger Zone */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors.agriculture.error }]}>Danger Zone</Text>
            
            <SettingItem
              icon="refresh"
              title="Reset App"
              subtitle="Reset all settings and clear data"
              onPress={handleResetApp}
              rightElement={
                <Ionicons name="warning" size={16} color={Colors.agriculture.error} />
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  safeArea: {
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  
  backButton: {
    width: 40,
    paddingHorizontal: 8,
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  
  placeholder: {
    width: 40,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 32,
  },
  
  section: {
    marginBottom: 24,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  
  subscriptionCard: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
  },
  
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  subscriptionInfo: {
    flex: 1,
  },
  
  subscriptionType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  scansRemaining: {
    fontSize: 14,
  },
  
  upgradeButton: {
    marginTop: 8,
  },
  
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 1,
    borderWidth: 1,
    borderRadius: 0,
  },
  
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  settingContent: {
    flex: 1,
  },
  
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  
  settingSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  settingArrow: {
    marginLeft: 8,
  },
});
