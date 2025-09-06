import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  isPremium?: boolean;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary';
}

export function FeatureCard({
  title,
  description,
  icon,
  onPress,
  isPremium = false,
  disabled = false,
  size = 'medium',
  variant = 'default',
}: FeatureCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const cardStyle = [
    styles.card,
    styles[size],
    getVariantStyle(variant, colors),
    disabled && styles.disabled,
  ];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, getIconContainerStyle(variant, colors)]}>
          <Ionicons
            name={icon}
            size={getIconSize(size)}
            color={getIconColor(variant, colors)}
          />
        </View>
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={12} color={Colors.agriculture.sunYellow} />
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.icon }]}>{description}</Text>
      
      <View style={styles.footer}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.icon}
        />
      </View>
    </TouchableOpacity>
  );
}

function getVariantStyle(variant: string, colors: any) {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      };
    case 'secondary':
      return {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
      };
    default:
      return {
        backgroundColor: colors.card,
        borderColor: colors.border,
      };
  }
}

function getIconContainerStyle(variant: string, colors: any) {
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      };
    case 'secondary':
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      };
    default:
      return {
        backgroundColor: colors.primary + '15',
      };
  }
}

function getIconColor(variant: string, colors: any) {
  switch (variant) {
    case 'primary':
    case 'secondary':
      return '#fff';
    default:
      return colors.primary;
  }
}

function getIconSize(size: string) {
  switch (size) {
    case 'small':
      return 20;
    case 'large':
      return 32;
    default:
      return 24;
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  small: {
    padding: 12,
  },
  
  medium: {
    padding: 16,
  },
  
  large: {
    padding: 20,
  },
  
  disabled: {
    opacity: 0.6,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.agriculture.sunYellow + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.agriculture.sunYellow + '40',
  },
  
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.agriculture.sunYellow,
    marginLeft: 4,
  },
  
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    lineHeight: 22,
  },
  
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  
  footer: {
    alignItems: 'flex-end',
  },
});
