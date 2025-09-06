import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleScanPlant = () => {
    router.push('/camera');
  };

  const handleRemediesGuide = () => {
    router.push('/guide');
  };

  const handleMyScans = () => {
    console.log('My scans');
  };

  const handleExpertTips = () => {
    console.log('Expert tips');
  };

  const handleWeatherAlerts = () => {
    console.log('Weather alerts');
  };

  const handleMarketPrices = () => {
    console.log('Market prices');
  };

  return (
    <ThemedView style={styles.container}>
      <AppHeader
        title="Welcome to AgriDoctor"
        subtitle="AI-powered plant disease detection and remedies"
        rightElement={
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={colors.primary} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Actions
            </Text>
            
            <View style={styles.actionButtons}>
              <AgriButton
                title="📸 Scan Plant"
                onPress={handleScanPlant}
                variant="primary"
                size="large"
                icon="camera"
                fullWidth
                style={styles.primaryAction}
              />
              
              <AgriButton
                title="📖 Remedies Guide"
                onPress={handleRemediesGuide}
                variant="secondary"
                size="large"
                icon="book"
                fullWidth
                style={styles.secondaryAction}
              />
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.recentActivity}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recent Activity
              </Text>
              <AgriButton
                title="View All"
                onPress={handleMyScans}
                variant="outline"
                size="small"
              />
            </View>
            
            <View style={[styles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.activityHeader}>
                <View style={[styles.activityIcon, { backgroundColor: Colors.agriculture.success + '20' }]}>
                  <Ionicons name="checkmark-circle" size={24} color={Colors.agriculture.success} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityTitle, { color: colors.text }]}>
                    Tomato Blight Detected
                  </Text>
                  <Text style={[styles.activityTime, { color: colors.icon }]}>
                    2 hours ago • 89% confidence
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.icon} />
              </View>
            </View>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Explore Features
            </Text>
            
            <View style={styles.featuresGrid}>
              <FeatureCard
                title="Expert Tips"
                description="Get professional farming advice and seasonal tips"
                icon="school"
                onPress={handleExpertTips}
                size="medium"
              />
              
              <FeatureCard
                title="Weather Alerts"
                description="Stay updated with weather conditions and alerts"
                icon="cloud"
                onPress={handleWeatherAlerts}
                isPremium={true}
                size="medium"
              />
              
              <FeatureCard
                title="Market Prices"
                description="Check current market prices for your crops"
                icon="trending-up"
                onPress={handleMarketPrices}
                isPremium={true}
                size="medium"
              />
              
              <FeatureCard
                title="Crop Calendar"
                description="Plan your farming activities with smart scheduling"
                icon="calendar"
                onPress={() => console.log('Crop calendar')}
                size="medium"
              />
            </View>
          </View>

          {/* Health Status */}
          <View style={styles.healthSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Farm Health Overview
            </Text>
            
            <View style={[styles.healthCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.healthStats}>
                <View style={styles.healthStat}>
                  <View style={[styles.healthIcon, { backgroundColor: Colors.agriculture.success + '20' }]}>
                    <Ionicons name="leaf" size={20} color={Colors.agriculture.success} />
                  </View>
                  <Text style={[styles.healthNumber, { color: Colors.agriculture.success }]}>12</Text>
                  <Text style={[styles.healthLabel, { color: colors.icon }]}>Healthy Plants</Text>
                </View>
                
                <View style={styles.healthStat}>
                  <View style={[styles.healthIcon, { backgroundColor: Colors.agriculture.warning + '20' }]}>
                    <Ionicons name="warning" size={20} color={Colors.agriculture.warning} />
                  </View>
                  <Text style={[styles.healthNumber, { color: Colors.agriculture.warning }]}>3</Text>
                  <Text style={[styles.healthLabel, { color: colors.icon }]}>Need Attention</Text>
                </View>
                
                <View style={styles.healthStat}>
                  <View style={[styles.healthIcon, { backgroundColor: Colors.agriculture.error + '20' }]}>
                    <Ionicons name="medical" size={20} color={Colors.agriculture.error} />
                  </View>
                  <Text style={[styles.healthNumber, { color: Colors.agriculture.error }]}>1</Text>
                  <Text style={[styles.healthLabel, { color: colors.icon }]}>Diseased</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Subscription Prompt for Free Users */}
          <View style={styles.subscriptionPrompt}>
            <View style={[styles.promoCard, { backgroundColor: Colors.agriculture.primaryGreen, borderColor: Colors.agriculture.darkGreen }]}>
              <View style={styles.promoHeader}>
                <Ionicons name="star" size={24} color={Colors.agriculture.sunYellow} />
                <Text style={styles.promoTitle}>Upgrade to AgriDoctor Pro</Text>
              </View>
              <Text style={styles.promoDescription}>
                Unlock unlimited scans, offline guides, advanced analytics, and expert support
              </Text>
              <AgriButton
                title="Start Free Trial"
                onPress={() => console.log('Start subscription')}
                variant="warning"
                size="medium"
                icon="rocket"
                style={styles.promoButton}
              />
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.agriculture.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  welcomeContainer: {
    flex: 1,
  },
  
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  
  headerActions: {
    alignItems: 'center',
  },
  
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  
  actionButtons: {
    gap: 12,
  },
  
  primaryAction: {
    marginBottom: 8,
  },
  
  secondaryAction: {
    marginBottom: 0,
  },
  
  recentActivity: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  activityCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  activityContent: {
    flex: 1,
  },
  
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  
  activityTime: {
    fontSize: 12,
  },
  
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  
  healthSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  
  healthCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  healthStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  
  healthStat: {
    alignItems: 'center',
  },
  
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  healthNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  healthLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  
  subscriptionPrompt: {
    paddingHorizontal: 20,
  },
  
  promoCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  
  promoDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 16,
  },
  
  promoButton: {
    alignSelf: 'flex-start',
  },
});
