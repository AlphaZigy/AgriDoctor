import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  backgroundColor?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightElement,
  backgroundColor,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor || colors.background}
      />
      <SafeAreaView 
        style={[
          styles.safeArea, 
          { backgroundColor: backgroundColor || colors.background }
        ]}
      >
        <View style={[styles.header, { backgroundColor: backgroundColor || colors.background }]}>
          <View style={styles.leftSection}>
            {showBackButton && (
              <TouchableOpacity
                style={[styles.backButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={handleBackPress}
              >
                <Ionicons name="arrow-back" size={20} color={colors.text} />
              </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                {title}
              </Text>
              {subtitle && (
                <Text style={[styles.subtitle, { color: colors.icon }]} numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          {rightElement && (
            <View style={styles.rightSection}>
              {rightElement}
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    zIndex: 1000,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 60,
  },
  
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  
  titleContainer: {
    flex: 1,
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 2,
  },
  
  rightSection: {
    marginLeft: 12,
  },
});
