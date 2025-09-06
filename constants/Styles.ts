import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  secondaryButton: {
    backgroundColor: Colors.light.surface,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  
  outlineButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  
  // Text styles
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 6,
  },
  
  heading3: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  
  body: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  
  caption: {
    fontSize: 14,
    color: Colors.light.icon,
    lineHeight: 20,
  },
  
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.surface,
  },
  
  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Spacing
  margin8: { margin: 8 },
  margin16: { margin: 16 },
  padding8: { padding: 8 },
  padding16: { padding: 16 },
  marginBottom8: { marginBottom: 8 },
  marginBottom16: { marginBottom: 16 },
  marginTop8: { marginTop: 8 },
  marginTop16: { marginTop: 16 },
});

export const DarkStyles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
    backgroundColor: Colors.dark.background,
  },
  
  card: {
    ...GlobalStyles.card,
    backgroundColor: Colors.dark.card,
  },
  
  heading1: {
    ...GlobalStyles.heading1,
    color: Colors.dark.text,
  },
  
  heading2: {
    ...GlobalStyles.heading2,
    color: Colors.dark.text,
  },
  
  heading3: {
    ...GlobalStyles.heading3,
    color: Colors.dark.text,
  },
  
  body: {
    ...GlobalStyles.body,
    color: Colors.dark.text,
  },
  
  caption: {
    ...GlobalStyles.caption,
    color: Colors.dark.icon,
  },
});
