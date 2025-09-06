import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { RemedyCard } from '@/components/ui/RemedyCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ConfidenceLevel, CostLevel, RemedyType } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock detection result (in real app, this would come from params)
  const mockResult = {
    id: 'detection-1',
    imageUri: 'mock-image-uri',
    disease: {
      id: 'tomato-blight',
      name: 'Tomato Late Blight',
      scientificName: 'Phytophthora infestans',
      category: 'fungal',
      description: 'Late blight is a serious disease that affects tomato and potato plants. It can cause rapid destruction of the plant if not controlled quickly. The disease thrives in cool, moist conditions.',
      symptoms: [
        'Dark, water-soaked spots on leaves',
        'Brown patches on stems and fruit',
        'White mold on leaf undersides',
        'Yellowing and wilting of affected areas'
      ],
      causes: [
        'High humidity (>90%)',
        'Cool temperatures (60-70°F)',
        'Poor air circulation',
        'Overhead watering',
        'Infected plant debris'
      ],
      preventiveMeasures: [
        'Improve air circulation',
        'Avoid overhead watering',
        'Remove infected plant material',
        'Apply preventive fungicides',
        'Rotate crops annually'
      ],
      severity: 'high',
      affectedCrops: ['Tomato', 'Potato', 'Eggplant'],
      isPremium: false,
    },
    confidence: 89,
    plantType: 'Tomato',
    detectedAt: new Date(),
  };

  const mockRemedies = [
    {
      id: 'remedy-1',
      title: 'Copper-based Fungicide Treatment',
      type: RemedyType.CHEMICAL,
      description: 'Apply copper sulfate fungicide to control late blight. Most effective when applied preventively or at first signs of disease.',
      ingredients: ['Copper sulfate', 'Water', 'Spreader-sticker'],
      steps: [
        'Mix 2-3 tablespoons of copper sulfate per gallon of water',
        'Add spreader-sticker as per label instructions',
        'Spray all plant surfaces, including undersides of leaves',
        'Apply in early morning or evening to avoid leaf burn',
        'Repeat every 7-10 days or after rain'
      ],
      duration: '7-10 days',
      effectiveness: 85,
      cost: CostLevel.MEDIUM,
      isOrganic: false,
      isPremium: false,
      icon: 'flask',
    },
    {
      id: 'remedy-2',
      title: 'Baking Soda Organic Treatment',
      type: RemedyType.ORGANIC,
      description: 'Natural fungicide using baking soda to alter leaf surface pH and prevent fungal growth.',
      ingredients: ['Baking soda', 'Liquid soap', 'Water'],
      steps: [
        'Mix 1 tablespoon baking soda per gallon of water',
        'Add 1/2 teaspoon liquid soap as surfactant',
        'Spray on all plant surfaces in early morning',
        'Ensure good coverage on leaf undersides',
        'Reapply weekly or after rain'
      ],
      duration: '5-7 days',
      effectiveness: 60,
      cost: CostLevel.LOW,
      isOrganic: true,
      isPremium: false,
      icon: 'leaf',
    },
    {
      id: 'remedy-3',
      title: 'Advanced Biocontrol Solution',
      type: RemedyType.BIOLOGICAL,
      description: 'Professional-grade biological control using beneficial microorganisms to combat late blight.',
      ingredients: ['Bacillus subtilis', 'Trichoderma harzianum', 'Carrier solution'],
      steps: [
        'Prepare biocontrol solution as per manufacturer guidelines',
        'Apply during cooler parts of the day',
        'Ensure thorough coverage of all plant surfaces',
        'Maintain soil moisture for microbial activity',
        'Reapply every 10-14 days'
      ],
      duration: '10-14 days',
      effectiveness: 90,
      cost: CostLevel.HIGH,
      isOrganic: true,
      isPremium: true,
      icon: 'bug',
    },
  ];

  const getConfidenceLevel = (confidence: number): ConfidenceLevel => {
    if (confidence >= 80) return ConfidenceLevel.HIGH;
    if (confidence >= 60) return ConfidenceLevel.MEDIUM;
    return ConfidenceLevel.LOW;
  };

  const getSeverityColor = () => {
    switch (mockResult.disease.severity) {
      case 'low':
        return Colors.agriculture.success;
      case 'medium':
        return Colors.agriculture.warning;
      case 'high':
      case 'critical':
        return Colors.agriculture.error;
      default:
        return Colors.agriculture.warning;
    }
  };

  const handleNewScan = () => {
    router.replace('/camera');
  };

  const handleViewGuide = () => {
    router.push('/guide');
  };

  return (
    <ThemedView style={styles.container}>
      <AppHeader
        title="Detection Results"
        subtitle="Plant disease analysis complete"
        showBackButton={true}
        rightElement={
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => console.log('Share results')}
          >
            <Ionicons name="share" size={20} color={colors.primary} />
          </TouchableOpacity>
        }
      />

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Result Card */}
          <View style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Plant Image Preview */}
            <View style={styles.imageContainer}>
              <View style={[styles.mockImage, { backgroundColor: colors.border }]}>
                <Ionicons name="image" size={64} color={colors.icon} />
                <Text style={[styles.imageLabel, { color: colors.icon }]}>
                  Captured Image
                </Text>
              </View>
              
              <View style={styles.imageInfo}>
                <Text style={[styles.plantType, { color: colors.icon }]}>
                  {mockResult.plantType}
                </Text>
                <Text style={[styles.timestamp, { color: colors.icon }]}>
                  {mockResult.detectedAt.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Disease Information */}
            <View style={styles.diseaseInfo}>
              <View style={styles.diseaseHeader}>
                <View style={styles.diseaseTitleContainer}>
                  <Text style={[styles.diseaseName, { color: colors.text }]}>
                    {mockResult.disease.name}
                  </Text>
                  <Text style={[styles.scientificName, { color: colors.icon }]}>
                    {mockResult.disease.scientificName}
                  </Text>
                </View>
                
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor() + '20' }]}>
                  <Ionicons name="warning" size={16} color={getSeverityColor()} />
                  <Text style={[styles.severityText, { color: getSeverityColor() }]}>
                    {mockResult.disease.severity.toUpperCase()} SEVERITY
                  </Text>
                </View>
              </View>

              <Text style={[styles.diseaseDescription, { color: colors.text }]}>
                {mockResult.disease.description}
              </Text>

              {/* Confidence Score */}
              <ConfidenceBar
                confidence={mockResult.confidence}
                level={getConfidenceLevel(mockResult.confidence)}
                showPercentage={true}
                size="large"
              />
            </View>
          </View>

          {/* Symptoms Section */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="medical" size={20} color={Colors.agriculture.error} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Symptoms to Look For
              </Text>
            </View>
            
            {mockResult.disease.symptoms.map((symptom, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="radio-button-on" size={12} color={Colors.agriculture.error} />
                <Text style={[styles.listText, { color: colors.text }]}>
                  {symptom}
                </Text>
              </View>
            ))}
          </View>

          {/* Causes Section */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="help-circle" size={20} color={Colors.agriculture.warning} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Common Causes
              </Text>
            </View>
            
            {mockResult.disease.causes.map((cause, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="radio-button-on" size={12} color={Colors.agriculture.warning} />
                <Text style={[styles.listText, { color: colors.text }]}>
                  {cause}
                </Text>
              </View>
            ))}
          </View>

          {/* Remedies Section */}
          <View style={styles.remediesSection}>
            <View style={styles.sectionHeader}>
              <Ionicons name="leaf" size={20} color={Colors.agriculture.success} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recommended Treatments
              </Text>
            </View>
            
            {mockRemedies.map((remedy) => (
              <RemedyCard
                key={remedy.id}
                remedy={remedy}
                onPress={() => {
                  console.log('Remedy detail:', remedy.id);
                }}
                isLocked={remedy.isPremium}
                variant="detailed"
              />
            ))}
          </View>

          {/* Prevention Section */}
          <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark" size={20} color={Colors.agriculture.info} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Prevention Measures
              </Text>
            </View>
            
            {mockResult.disease.preventiveMeasures.map((measure, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle" size={12} color={Colors.agriculture.success} />
                <Text style={[styles.listText, { color: colors.text }]}>
                  {measure}
                </Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <AgriButton
              title="Scan Another Plant"
              onPress={handleNewScan}
              variant="primary"
              size="large"
              icon="camera"
              fullWidth
              style={styles.primaryAction}
            />
            
            <AgriButton
              title="Browse Disease Guide"
              onPress={handleViewGuide}
              variant="secondary"
              size="large"
              icon="book"
              fullWidth
              style={styles.secondaryAction}
            />
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
  
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  
  actionButton: {
    width: 40,
    paddingHorizontal: 8,
  },
  
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 32,
  },
  
  resultCard: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  
  mockImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  imageLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  
  imageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  
  plantType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  
  timestamp: {
    fontSize: 12,
  },
  
  diseaseInfo: {
    marginBottom: 20,
  },
  
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  diseaseTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  
  scientificName: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  
  diseaseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  
  section: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  remediesSection: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingRight: 16,
  },
  
  listText: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
  
  actionSection: {
    paddingHorizontal: 16,
    gap: 12,
  },
  
  primaryAction: {
    marginBottom: 8,
  },
  
  secondaryAction: {
    marginBottom: 0,
  },
});
