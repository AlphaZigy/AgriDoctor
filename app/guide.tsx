import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { DiseaseCard } from '@/components/ui/DiseaseCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DiseaseCategory, DiseaseSeverity, PlantDisease } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GuideScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiseaseCategory | 'all'>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<DiseaseSeverity | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock disease data
  const mockDiseases: PlantDisease[] = [
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
      id: 'bacterial-wilt',
      name: 'Bacterial Wilt',
      scientificName: 'Ralstonia solanacearum',
      category: DiseaseCategory.BACTERIAL,
      description: 'A bacterial disease that causes rapid wilting and death of plants.',
      symptoms: ['Sudden wilting', 'Brown vascular tissue', 'Bacterial ooze'],
      causes: ['Contaminated soil', 'High soil moisture'],
      remedies: [],
      preventiveMeasures: ['Use disease-free seeds', 'Improve drainage'],
      severity: DiseaseSeverity.CRITICAL,
      affectedCrops: ['Tomato', 'Pepper', 'Eggplant'],
      isPremium: true,
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
    {
      id: 'nitrogen-deficiency',
      name: 'Nitrogen Deficiency',
      scientificName: '',
      category: DiseaseCategory.NUTRITIONAL,
      description: 'A nutrient deficiency that causes yellowing of older leaves and stunted growth.',
      symptoms: ['Yellowing of older leaves', 'Stunted growth', 'Poor fruit development'],
      causes: ['Poor soil fertility', 'Excessive rainfall', 'Sandy soils'],
      remedies: [],
      preventiveMeasures: ['Regular fertilization', 'Soil testing', 'Organic matter addition'],
      severity: DiseaseSeverity.MEDIUM,
      affectedCrops: ['All crops'],
      isPremium: false,
    },
  ];

  const categories = [
    { key: 'all', label: 'All', icon: 'grid' },
    { key: DiseaseCategory.FUNGAL, label: 'Fungal', icon: 'bug' },
    { key: DiseaseCategory.BACTERIAL, label: 'Bacterial', icon: 'medical' },
    { key: DiseaseCategory.VIRAL, label: 'Viral', icon: 'warning' },
    { key: DiseaseCategory.NUTRITIONAL, label: 'Nutritional', icon: 'nutrition' },
    { key: DiseaseCategory.PEST, label: 'Pest', icon: 'bug-outline' },
    { key: DiseaseCategory.ENVIRONMENTAL, label: 'Environmental', icon: 'cloudy' },
  ];

  const severityLevels = [
    { key: 'all', label: 'All Severity', color: colors.icon },
    { key: DiseaseSeverity.LOW, label: 'Low', color: Colors.agriculture.success },
    { key: DiseaseSeverity.MEDIUM, label: 'Medium', color: Colors.agriculture.warning },
    { key: DiseaseSeverity.HIGH, label: 'High', color: Colors.agriculture.error },
    { key: DiseaseSeverity.CRITICAL, label: 'Critical', color: Colors.agriculture.error },
  ];

  const filteredDiseases = mockDiseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         disease.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         disease.affectedCrops.some(crop => 
                           crop.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || disease.severity === selectedSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const handleDiseasePress = (disease: PlantDisease) => {
    console.log('Disease detail:', disease.id);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSeverity('all');
    setSearchQuery('');
  };

  return (
    <ThemedView style={styles.container}>
      <AppHeader
        title="Disease Guide"
        subtitle="Browse plant diseases and treatments"
        showBackButton={true}
        rightElement={
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="filter" size={20} color={colors.primary} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color={colors.icon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search diseases, crops, symptoms..."
              placeholderTextColor={colors.icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={colors.icon} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        {showFilters && (
          <View style={[styles.filtersContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: selectedCategory === category.key
                          ? colors.primary
                          : colors.background,
                        borderColor: colors.border,
                      }
                    ]}
                    onPress={() => setSelectedCategory(category.key as any)}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={16}
                      color={selectedCategory === category.key ? 'white' : colors.icon}
                    />
                    <Text style={[
                      styles.filterChipText,
                      {
                        color: selectedCategory === category.key ? 'white' : colors.text
                      }
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Severity Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: colors.text }]}>Severity</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
                {severityLevels.map((severity) => (
                  <TouchableOpacity
                    key={severity.key}
                    style={[
                      styles.filterChip,
                      {
                        backgroundColor: selectedSeverity === severity.key
                          ? severity.color
                          : colors.background,
                        borderColor: colors.border,
                      }
                    ]}
                    onPress={() => setSelectedSeverity(severity.key as any)}
                  >
                    <Text style={[
                      styles.filterChipText,
                      {
                        color: selectedSeverity === severity.key ? 'white' : colors.text
                      }
                    ]}>
                      {severity.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Clear Filters */}
            <View style={styles.filterActions}>
              <AgriButton
                title="Clear All Filters"
                onPress={clearFilters}
                variant="outline"
                size="small"
                icon="refresh"
              />
            </View>
          </View>
        )}

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={[styles.resultsText, { color: colors.icon }]}>
            {filteredDiseases.length} diseases found
          </Text>
          
          {(selectedCategory !== 'all' || selectedSeverity !== 'all' || searchQuery.length > 0) && (
            <TouchableOpacity onPress={clearFilters}>
              <Text style={[styles.clearAllText, { color: colors.primary }]}>
                Clear all
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Disease List */}
        <View style={styles.diseaseListContainer}>
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map((disease) => (
              <DiseaseCard
                key={disease.id}
                disease={disease}
                onPress={() => handleDiseasePress(disease)}
                showPremiumBadge={true}
                variant="list"
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={64} color={colors.icon} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                No diseases found
              </Text>
              <Text style={[styles.emptyDescription, { color: colors.icon }]}>
                Try adjusting your search or filters to find what you&apos;re looking for.
              </Text>
              <AgriButton
                title="Clear Filters"
                onPress={clearFilters}
                variant="primary"
                size="medium"
                icon="refresh"
                style={styles.emptyAction}
              />
            </View>
          )}

          {/* Quick Access Categories */}
          {filteredDiseases.length > 0 && (
            <View style={styles.quickAccessSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Quick Access
              </Text>
              
              <View style={styles.quickAccessGrid}>
                <TouchableOpacity
                  style={[styles.quickAccessCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => console.log('Common diseases')}
                >
                  <Ionicons name="trending-up" size={24} color={Colors.agriculture.warning} />
                  <Text style={[styles.quickAccessTitle, { color: colors.text }]}>
                    Most Common
                  </Text>
                  <Text style={[styles.quickAccessDesc, { color: colors.icon }]}>
                    Frequently occurring diseases
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.quickAccessCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => console.log('Seasonal diseases')}
                >
                  <Ionicons name="calendar" size={24} color={Colors.agriculture.primaryGreen} />
                  <Text style={[styles.quickAccessTitle, { color: colors.text }]}>
                    Seasonal Guide
                  </Text>
                  <Text style={[styles.quickAccessDesc, { color: colors.icon }]}>
                    Diseases by season
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  
  filtersContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  
  filterSection: {
    marginBottom: 16,
  },
  
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  
  filterScroll: {
    flexDirection: 'row',
  },
  
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
    minHeight: 32,
  },
  
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  
  filterActions: {
    alignItems: 'flex-start',
  },
  
  resultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  
  resultsText: {
    fontSize: 14,
  },
  
  clearAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  diseaseListContainer: {
    flex: 1,
  },
  
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  
  emptyDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  
  emptyAction: {
    paddingHorizontal: 24,
  },
  
  quickAccessSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  
  quickAccessGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  
  quickAccessCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  
  quickAccessTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  
  quickAccessDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
