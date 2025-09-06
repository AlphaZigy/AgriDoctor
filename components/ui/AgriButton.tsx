import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AgriButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: any;
}

export function AgriButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
}: AgriButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const buttonStyles = [
    styles.base,
    styles[size],
    fullWidth && styles.fullWidth,
    getVariantStyle(variant, colors),
    disabled && styles.disabled,
    style,
  ];

  const textColor = getTextColor(variant, colors, disabled);

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color={textColor} />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <Ionicons
                name={icon}
                size={getIconSize(size)}
                color={textColor}
                style={styles.iconLeft}
              />
            )}
            <Text style={[styles.text, { color: textColor }, styles[`${size}Text`]]}>
              {title}
            </Text>
            {icon && iconPosition === 'right' && (
              <Ionicons
                name={icon}
                size={getIconSize(size)}
                color={textColor}
                style={styles.iconRight}
              />
            )}
          </>
        )}
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
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
        borderWidth: 2,
      };
    case 'success':
      return {
        backgroundColor: Colors.agriculture.success,
        borderColor: Colors.agriculture.success,
      };
    case 'warning':
      return {
        backgroundColor: Colors.agriculture.warning,
        borderColor: Colors.agriculture.warning,
      };
    case 'danger':
      return {
        backgroundColor: Colors.agriculture.error,
        borderColor: Colors.agriculture.error,
      };
    default:
      return {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      };
  }
}

function getTextColor(variant: string, colors: any, disabled: boolean) {
  if (disabled) return colors.icon;
  
  switch (variant) {
    case 'outline':
      return colors.primary;
    case 'warning':
      return '#000';
    default:
      return '#fff';
  }
}

function getIconSize(size: string) {
  switch (size) {
    case 'small':
      return 16;
    case 'large':
      return 24;
    default:
      return 20;
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 44,
  },
  
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 52,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  
  smallText: {
    fontSize: 14,
  },
  
  mediumText: {
    fontSize: 16,
  },
  
  largeText: {
    fontSize: 18,
  },
  
  iconLeft: {
    marginRight: 8,
  },
  
  iconRight: {
    marginLeft: 8,
  },
});
