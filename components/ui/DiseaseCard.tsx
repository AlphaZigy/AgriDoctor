import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DiseaseCategory, DiseaseSeverity, PlantDisease } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DiseaseCardProps {
  disease: PlantDisease;
  onPress: () => void;
  showPremiumBadge?: boolean;
  variant?: 'list' | 'grid';
}

export function DiseaseCard({
  disease,
  onPress,
  showPremiumBadge = true,
  variant = 'list',
}: DiseaseCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getSeverityColor = () => {
    switch (disease.severity) {
      case DiseaseSeverity.LOW:
        return Colors.agriculture.success;
      case DiseaseSeverity.MEDIUM:
        return Colors.agriculture.warning;
      case DiseaseSeverity.HIGH:
      case DiseaseSeverity.CRITICAL:
        return Colors.agriculture.error;
      default:
        return Colors.agriculture.warning;
    }
  };

  const getCategoryIcon = () => {
    switch (disease.category) {
      case DiseaseCategory.FUNGAL:
        return 'bug-outline';
      case DiseaseCategory.BACTERIAL:
        return 'medical-outline';
      case DiseaseCategory.VIRAL:
        return 'warning-outline';
      case DiseaseCategory.NUTRITIONAL:
        return 'nutrition-outline';
      case DiseaseCategory.PEST:
        return 'bug';
      case DiseaseCategory.ENVIRONMENTAL:
        return 'cloudy-outline';
      default:
        return 'leaf-outline';
    }
  };

  const cardStyle = variant === 'grid' ? styles.gridCard : styles.listCard;

  return (
    <TouchableOpacity
      style={[cardStyle, { backgroundColor: colors.card, borderColor: colors.border }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryIcon, { backgroundColor: getSeverityColor() + '20' }]}>
            <Ionicons
              name={getCategoryIcon() as any}
              size={20}
              color={getSeverityColor()}
            />
          </View>
          <View>
            <Text style={[styles.categoryText, { color: colors.icon }]}>
              {disease.category.toUpperCase()}
            </Text>
            <View style={styles.severityContainer}>
              <View style={[styles.severityDot, { backgroundColor: getSeverityColor() }]} />
              <Text style={[styles.severityText, { color: getSeverityColor() }]}>
                {disease.severity.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
        
        {showPremiumBadge && disease.isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={12} color={Colors.agriculture.sunYellow} />
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
      </View>

      {disease.imageUrl && variant === 'grid' && (
        <Image
          source={{ uri: disease.imageUrl }}
          style={styles.diseaseImage}
          resizeMode="cover"
        />
      )}

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {disease.name}
      </Text>
      
      {disease.scientificName && (
        <Text style={[styles.scientificName, { color: colors.icon }]} numberOfLines={1}>
          {disease.scientificName}
        </Text>
      )}

      <Text style={[styles.description, { color: colors.icon }]} numberOfLines={3}>
        {disease.description}
      </Text>

      <View style={styles.footer}>
        <View style={styles.cropsContainer}>
          <Ionicons name="leaf" size={14} color={colors.icon} />
          <Text style={[styles.cropsText, { color: colors.icon }]} numberOfLines={1}>
            {disease.affectedCrops.slice(0, 3).join(', ')}
            {disease.affectedCrops.length > 3 && ` +${disease.affectedCrops.length - 3}`}
          </Text>
        </View>
        
        <View style={styles.remedyCount}>
          <Ionicons name="medical" size={14} color={colors.primary} />
          <Text style={[styles.remedyCountText, { color: colors.primary }]}>
            {disease.remedies.length} remedies
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listCard: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  gridCard: {
    borderRadius: 12,
    padding: 12,
    margin: 8,
    flex: 1,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  severityText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.agriculture.sunYellow + '20',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.agriculture.sunYellow + '40',
  },

  premiumText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.agriculture.sunYellow,
    marginLeft: 2,
  },

  diseaseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 20,
  },

  scientificName: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 6,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cropsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  cropsText: {
    fontSize: 11,
    marginLeft: 4,
  },

  remedyCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  remedyCountText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
});
