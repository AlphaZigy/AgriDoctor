import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightElement?: React.ReactNode;
  isPremium?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightElement,
  isPremium = false,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={[styles.settingsItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingsItemLeft}>
        <View style={[styles.settingsItemIcon, { backgroundColor: colors.primary + '20' }]}>
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        <View style={styles.settingsItemContent}>
          <View style={styles.settingsItemHeader}>
            <Text style={[styles.settingsItemTitle, { color: colors.text }]}>
              {title}
            </Text>
            {isPremium && (
              <View style={[styles.premiumBadge, { backgroundColor: Colors.agriculture.warning }]}>
                <Text style={styles.premiumText}>PRO</Text>
              </View>
            )}
          </View>
          {subtitle && (
            <Text style={[styles.settingsItemSubtitle, { color: colors.icon }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color={colors.icon} />
      ))}
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');
  const [autoScanEnabled, setAutoScanEnabled] = useState(false);

  const handleLanguagePress = () => {
    // Navigate to language selection
    console.log('Language selection');
  };

  const handleSubscriptionPress = () => {
    console.log('Subscription');
  };

  const handlePrivacyPress = () => {
    console.log('Privacy policy');
  };

  const handleTermsPress = () => {
    console.log('Terms of service');
  };

  const handleSupportPress = () => {
    console.log('Support');
  };

  const handleSignOut = () => {
    // Handle sign out logic
    console.log('Sign out');
  };

  return (
    <ThemedView style={styles.container}>
      <AppHeader
        title="Settings"
        subtitle="Customize your AgriDoctor experience"
        rightElement={
          <TouchableOpacity
            style={[styles.notificationButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => console.log('Notifications')}
          >
            <Ionicons name="notifications" size={20} color={colors.primary} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

          {/* Profile Section */}
          <View style={styles.section}>
            <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
                <Ionicons name="person" size={32} color="white" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colors.text }]}>
                  John Farmer
                </Text>
                <Text style={[styles.profileEmail, { color: colors.icon }]}>
                  john@example.com
                </Text>
                <View style={[styles.subscriptionBadge, { backgroundColor: Colors.agriculture.warning + '20' }]}>
                  <Text style={[styles.subscriptionText, { color: Colors.agriculture.warning }]}>
                    Free Plan
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.editButton, { borderColor: colors.border }]}
                onPress={() => console.log('Edit profile')}
              >
                <Ionicons name="pencil" size={16} color={colors.icon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Subscription Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Subscription
            </Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <SettingsItem
                icon="crown"
                title="Upgrade to Pro"
                subtitle="Unlimited scans, advanced analytics, and more"
                onPress={handleSubscriptionPress}
                isPremium={true}
              />
            </View>
          </View>

          {/* App Preferences */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              App Preferences
            </Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <SettingsItem
                icon="language"
                title="Language"
                subtitle="English"
                onPress={handleLanguagePress}
              />
              <SettingsItem
                icon="moon"
                title="Dark Mode"
                subtitle="Automatically switch appearance"
                showArrow={false}
                rightElement={
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={darkModeEnabled ? 'white' : colors.icon}
                  />
                }
              />
              <SettingsItem
                icon="notifications"
                title="Push Notifications"
                subtitle="Get alerts for plant health updates"
                showArrow={false}
                rightElement={
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={notificationsEnabled ? 'white' : colors.icon}
                  />
                }
              />
              <SettingsItem
                icon="scan"
                title="Auto-Scan Mode"
                subtitle="Automatically analyze images"
                showArrow={false}
                rightElement={
                  <Switch
                    value={autoScanEnabled}
                    onValueChange={setAutoScanEnabled}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor={autoScanEnabled ? 'white' : colors.icon}
                  />
                }
                isPremium={true}
              />
            </View>
          </View>

          {/* Support & Legal */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Support & Legal
            </Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <SettingsItem
                icon="help-circle"
                title="Help & Support"
                subtitle="Get help or contact us"
                onPress={handleSupportPress}
              />
              <SettingsItem
                icon="shield-checkmark"
                title="Privacy Policy"
                subtitle="How we protect your data"
                onPress={handlePrivacyPress}
              />
              <SettingsItem
                icon="document-text"
                title="Terms of Service"
                subtitle="App usage terms and conditions"
                onPress={handleTermsPress}
              />
              <SettingsItem
                icon="star"
                title="Rate AgriDoctor"
                subtitle="Share your feedback"
                onPress={() => console.log('Rate app')}
              />
            </View>
          </View>

          {/* Sign Out */}
          <View style={styles.section}>
            <AgriButton
              title="Sign Out"
              onPress={handleSignOut}
              variant="outline"
              icon="log-out"
              style={{ marginHorizontal: 20 }}
            />
          </View>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={[styles.versionText, { color: colors.icon }]}>
              AgriDoctor v1.0.0
            </Text>
          </View>
        </ScrollView>
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
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 32,
  },
  
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  
  section: {
    marginBottom: 24,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  
  sectionCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  profileInfo: {
    flex: 1,
  },
  
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  profileEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  
  subscriptionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  subscriptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  settingsItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  settingsItemContent: {
    flex: 1,
  },
  
  settingsItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  
  settingsItemSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  premiumBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  
  versionText: {
    fontSize: 14,
  },
});
