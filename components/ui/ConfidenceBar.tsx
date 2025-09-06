import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ConfidenceLevel } from '@/types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ConfidenceBarProps {
  confidence: number;
  level: ConfidenceLevel;
  showPercentage?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function ConfidenceBar({
  confidence,
  level,
  showPercentage = true,
  size = 'medium',
}: ConfidenceBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getConfidenceColor = () => {
    switch (level) {
      case ConfidenceLevel.HIGH:
        return Colors.agriculture.highConfidence;
      case ConfidenceLevel.MEDIUM:
        return Colors.agriculture.mediumConfidence;
      case ConfidenceLevel.LOW:
        return Colors.agriculture.lowConfidence;
      default:
        return Colors.agriculture.mediumConfidence;
    }
  };

  const getConfidenceText = () => {
    switch (level) {
      case ConfidenceLevel.HIGH:
        return 'High Confidence';
      case ConfidenceLevel.MEDIUM:
        return 'Medium Confidence';
      case ConfidenceLevel.LOW:
        return 'Low Confidence';
      default:
        return 'Unknown';
    }
  };

  const barHeight = size === 'small' ? 6 : size === 'large' ? 12 : 8;
  const confidenceColor = getConfidenceColor();

  return (
    <View style={styles.container}>
      {showPercentage && (
        <View style={styles.header}>
          <Text style={[styles.label, { color: colors.text }]}>
            {getConfidenceText()}
          </Text>
          <Text style={[styles.percentage, { color: confidenceColor }]}>
            {Math.round(confidence)}%
          </Text>
        </View>
      )}
      
      <View style={[styles.barContainer, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.bar,
            {
              width: `${confidence}%`,
              backgroundColor: confidenceColor,
              height: barHeight,
            },
          ]}
        />
      </View>
      
      <View style={styles.indicators}>
        <View style={styles.indicatorRow}>
          <View style={[styles.indicator, { backgroundColor: Colors.agriculture.lowConfidence }]} />
          <Text style={[styles.indicatorText, { color: colors.icon }]}>Low</Text>
        </View>
        <View style={styles.indicatorRow}>
          <View style={[styles.indicator, { backgroundColor: Colors.agriculture.mediumConfidence }]} />
          <Text style={[styles.indicatorText, { color: colors.icon }]}>Medium</Text>
        </View>
        <View style={styles.indicatorRow}>
          <View style={[styles.indicator, { backgroundColor: Colors.agriculture.highConfidence }]} />
          <Text style={[styles.indicatorText, { color: colors.icon }]}>High</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  percentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  barContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  
  bar: {
    borderRadius: 4,
  },
  
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  
  indicatorText: {
    fontSize: 12,
  },
});
