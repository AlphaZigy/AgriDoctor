import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { DiseaseCard } from '@/components/ui/DiseaseCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DiseaseCategory, DiseaseSeverity, PlantDisease } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory | 'all'>('all');

  // Mock disease data - showing most common diseases
  const featuredDiseases: PlantDisease[] = [
    {
      id: 'tomato-blight',
      name: 'Tomato Late Blight',
      scientificName: 'Phytophthora infestans',
      category: DiseaseCategory.FUNGAL,
      description: 'A serious fungal disease that affects tomato and potato plants, causing rapid destruction if not controlled.',
      symptoms: ['Dark water-soaked spots on leaves', 'Brown patches on stems'],
      causes: ['High humidity', 'Cool temperatures'],
      remedies: [],
      preventiveMeasures: ['Improve air circulation', 'Avoid overhead watering'],
      severity: DiseaseSeverity.HIGH,
      affectedCrops: ['Tomato', 'Potato'],
      isPremium: false,
    },
    {
      id: 'powdery-mildew',
      name: 'Powdery Mildew',
      scientificName: 'Erysiphe cichoracearum',
      category: DiseaseCategory.FUNGAL,
      description: 'A common fungal disease that appears as white powdery spots on leaves and stems.',
      symptoms: ['White powdery coating on leaves', 'Yellowing of affected areas'],
      causes: ['High humidity', 'Poor air circulation'],
      remedies: [],
      preventiveMeasures: ['Ensure good air circulation', 'Avoid overhead watering'],
      severity: DiseaseSeverity.MEDIUM,
      affectedCrops: ['Cucumber', 'Squash', 'Pumpkin'],
      isPremium: false,
    },
    {
      id: 'aphid-infestation',
      name: 'Aphid Infestation',
      scientificName: 'Aphis gossypii',
      category: DiseaseCategory.PEST,
      description: 'Small soft-bodied insects that feed on plant sap, causing stunted growth.',
      symptoms: ['Curled leaves', 'Sticky honeydew', 'Stunted growth'],
      causes: ['Overfertilization', 'Lack of natural predators'],
      remedies: [],
      preventiveMeasures: ['Encourage beneficial insects', 'Avoid overfertilization'],
      severity: DiseaseSeverity.LOW,
      affectedCrops: ['Most vegetables', 'Fruit trees'],
      isPremium: false,
    },
  ];

  const categories = [
    { key: 'all', label: 'All', icon: 'grid', count: 156 },
    { key: DiseaseCategory.FUNGAL, label: 'Fungal', icon: 'bug', count: 78 },
    { key: DiseaseCategory.BACTERIAL, label: 'Bacterial', icon: 'medical', count: 32 },
    { key: DiseaseCategory.PEST, label: 'Pests', icon: 'bug-outline', count: 28 },
    { key: DiseaseCategory.NUTRITIONAL, label: 'Nutritional', icon: 'nutrition', count: 18 },
  ];

  const handleDiseasePress = (disease: PlantDisease) => {
    console.log('Disease detail:', disease.id);
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.welcomeContainer}>
              <Text style={[styles.greeting, { color: colors.icon }]}>
                Disease Guide 📚
              </Text>
              <Text style={[styles.welcomeTitle, { color: colors.text }]}>
                Learn & Identify
              </Text>
              <Text style={[styles.subtitle, { color: colors.icon }]}>
                Browse diseases, symptoms, and treatments
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.settingsButton, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => console.log('Settings')}
            >
              <Ionicons name="settings" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => console.log('Search')}
            >
              <Ionicons name="search" size={20} color={colors.icon} />
              <Text style={[styles.searchPlaceholder, { color: colors.icon }]}>
                Search diseases, crops, symptoms...
              </Text>
              <Ionicons name="filter" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {/* Quick Categories */}
          <View style={styles.categoriesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Browse by Category
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.key}
                  style={[
                    styles.categoryCard,
                    { backgroundColor: colors.card, borderColor: colors.border },
                    selectedCategory === category.key && { 
                      backgroundColor: colors.primary,
                      borderColor: colors.primary 
                    }
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.key as any);
                    console.log('Browse category:', category.key);
                  }}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={24}
                    color={selectedCategory === category.key ? 'white' : colors.primary}
                  />
                  <Text style={[
                    styles.categoryLabel,
                    { 
                      color: selectedCategory === category.key ? 'white' : colors.text 
                    }
                  ]}>
                    {category.label}
                  </Text>
                  <Text style={[
                    styles.categoryCount,
                    { 
                      color: selectedCategory === category.key ? 'rgba(255,255,255,0.8)' : colors.icon 
                    }
                  ]}>
                    {category.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Diseases */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Most Common Diseases
              </Text>
              <AgriButton
                title="View All"
                onPress={() => console.log('View all diseases')}
                variant="outline"
                size="small"
                icon="arrow-forward"
              />
            </View>
            
            {featuredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                onPress={() => handleDiseasePress(disease)}
                showPremiumBadge={true}
                variant="list"
              />
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Actions
            </Text>
            
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => console.log('Scan plant')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: Colors.agriculture.primaryGreen + '20' }]}>
                  <Ionicons name="camera" size={28} color={Colors.agriculture.primaryGreen} />
                </View>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  Scan Plant
                </Text>
                <Text style={[styles.quickActionDesc, { color: colors.icon }]}>
                  Take a photo to identify diseases
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.quickActionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => console.log('Seasonal guide')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: Colors.agriculture.warning + '20' }]}>
                  <Ionicons name="calendar" size={28} color={Colors.agriculture.warning} />
                </View>
                <Text style={[styles.quickActionTitle, { color: colors.text }]}>
                  Seasonal Guide
                </Text>
                <Text style={[styles.quickActionDesc, { color: colors.icon }]}>
                  Diseases common this season
                </Text>
              </TouchableOpacity>
            </View>
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
  
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  
  categoriesSection: {
    marginBottom: 32,
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  
  categoryCard: {
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 80,
  },
  
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  
  categoryCount: {
    fontSize: 10,
    marginTop: 2,
  },
  
  featuredSection: {
    marginBottom: 32,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  
  quickActionsSection: {
    paddingHorizontal: 20,
  },
  
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  
  quickActionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  
  quickActionDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
