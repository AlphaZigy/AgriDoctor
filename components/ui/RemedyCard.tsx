import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CostLevel, Remedy, RemedyType } from '@/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RemedyCardProps {
  remedy: Remedy;
  onPress: () => void;
  isLocked?: boolean;
  variant?: 'detailed' | 'compact';
}

export function RemedyCard({
  remedy,
  onPress,
  isLocked = false,
  variant = 'detailed',
}: RemedyCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getTypeIcon = () => {
    switch (remedy.type) {
      case RemedyType.CHEMICAL:
        return 'flask';
      case RemedyType.ORGANIC:
        return 'leaf';
      case RemedyType.BIOLOGICAL:
        return 'bug';
      case RemedyType.PREVENTIVE:
        return 'shield-checkmark';
      default:
        return 'medical';
    }
  };

  const getTypeColor = () => {
    switch (remedy.type) {
      case RemedyType.CHEMICAL:
        return Colors.agriculture.warning;
      case RemedyType.ORGANIC:
        return Colors.agriculture.success;
      case RemedyType.BIOLOGICAL:
        return Colors.agriculture.primaryGreen;
      case RemedyType.PREVENTIVE:
        return Colors.agriculture.info;
      default:
        return colors.primary;
    }
  };

  const getCostColor = () => {
    switch (remedy.cost) {
      case CostLevel.LOW:
        return Colors.agriculture.success;
      case CostLevel.MEDIUM:
        return Colors.agriculture.warning;
      case CostLevel.HIGH:
        return Colors.agriculture.error;
      default:
        return colors.icon;
    }
  };

  const getCostText = () => {
    switch (remedy.cost) {
      case CostLevel.LOW:
        return 'Low Cost';
      case CostLevel.MEDIUM:
        return 'Medium Cost';
      case CostLevel.HIGH:
        return 'High Cost';
      default:
        return 'Unknown';
    }
  };

  const renderEffectivenessStars = () => {
    const stars = [];
    const filledStars = Math.floor(remedy.effectiveness / 20);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < filledStars ? 'star' : 'star-outline'}
          size={12}
          color={Colors.agriculture.sunYellow}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };

  const cardStyle = variant === 'compact' ? styles.compactCard : styles.detailedCard;

  return (
    <TouchableOpacity
      style={[
        cardStyle,
        { backgroundColor: colors.card, borderColor: colors.border },
        isLocked && styles.lockedCard,
      ]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.8}
    >
      {isLocked && (
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-closed" size={24} color={colors.icon} />
          <Text style={[styles.lockText, { color: colors.icon }]}>Premium Feature</Text>
        </View>
      )}

      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <View style={[styles.typeIcon, { backgroundColor: getTypeColor() + '20' }]}>
            <Ionicons
              name={getTypeIcon() as any}
              size={20}
              color={getTypeColor()}
            />
          </View>
          <View>
            <Text style={[styles.typeText, { color: getTypeColor() }]}>
              {remedy.type.toUpperCase()}
            </Text>
            {remedy.isOrganic && (
              <View style={styles.organicBadge}>
                <Ionicons name="leaf" size={10} color={Colors.agriculture.success} />
                <Text style={[styles.organicText, { color: Colors.agriculture.success }]}>
                  ORGANIC
                </Text>
              </View>
            )}
          </View>
        </View>

        {remedy.isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={12} color={Colors.agriculture.sunYellow} />
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
      </View>

      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {remedy.title}
      </Text>

      <Text style={[styles.description, { color: colors.icon }]} numberOfLines={variant === 'compact' ? 2 : 3}>
        {remedy.description}
      </Text>

      {variant === 'detailed' && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.effectivenessContainer}>
              <Text style={[styles.detailLabel, { color: colors.icon }]}>Effectiveness:</Text>
              <View style={styles.starsContainer}>
                {renderEffectivenessStars()}
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.costContainer}>
              <Ionicons name="wallet" size={14} color={getCostColor()} />
              <Text style={[styles.costText, { color: getCostColor() }]}>
                {getCostText()}
              </Text>
            </View>
            
            <View style={styles.durationContainer}>
              <Ionicons name="time" size={14} color={colors.icon} />
              <Text style={[styles.durationText, { color: colors.icon }]}>
                {remedy.duration}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={[styles.ingredientCount, { color: colors.icon }]}>
          {remedy.ingredients.length} ingredients
        </Text>
        
        <View style={styles.stepsInfo}>
          <Ionicons name="list" size={14} color={colors.primary} />
          <Text style={[styles.stepsText, { color: colors.primary }]}>
            {remedy.steps.length} steps
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  detailedCard: {
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
    position: 'relative',
  },

  compactCard: {
    borderRadius: 12,
    padding: 12,
    margin: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },

  lockedCard: {
    opacity: 0.7,
  },

  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    zIndex: 10,
  },

  lockText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  typeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  organicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  organicText: {
    fontSize: 9,
    fontWeight: '500',
    marginLeft: 2,
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

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 20,
  },

  description: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },

  details: {
    marginBottom: 12,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  effectivenessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailLabel: {
    fontSize: 12,
    marginRight: 8,
  },

  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  costText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },

  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  durationText: {
    fontSize: 11,
    marginLeft: 4,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ingredientCount: {
    fontSize: 11,
  },

  stepsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepsText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 4,
  },
});
