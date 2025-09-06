// Disease Detection Types
import { Colors } from '@/constants/Colors';

export interface PlantDisease {
  id: string;
  name: string;
  scientificName?: string;
  category: DiseaseCategory;
  description: string;
  symptoms: string[];
  causes: string[];
  remedies: Remedy[];
  preventiveMeasures: string[];
  severity: DiseaseSeverity;
  affectedCrops: string[];
  imageUrl?: string;
  isPremium: boolean;
}

export interface DetectionResult {
  id: string;
  imageUri: string;
  disease: PlantDisease;
  confidence: number;
  plantType: string;
  detectedAt: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface Remedy {
  id: string;
  title: string;
  type: RemedyType;
  description: string;
  ingredients: string[];
  steps: string[];
  duration: string;
  effectiveness: number;
  cost: CostLevel;
  isOrganic: boolean;
  isPremium: boolean;
  icon: string;
}

// Enums
export enum DiseaseCategory {
  FUNGAL = 'fungal',
  BACTERIAL = 'bacterial',
  VIRAL = 'viral',
  NUTRITIONAL = 'nutritional',
  PEST = 'pest',
  ENVIRONMENTAL = 'environmental',
}

export enum DiseaseSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RemedyType {
  CHEMICAL = 'chemical',
  ORGANIC = 'organic',
  BIOLOGICAL = 'biological',
  PREVENTIVE = 'preventive',
}

export enum CostLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ConfidenceLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

// User and Subscription Types
export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string;
  location?: string;
  farmSize?: string;
  mainCrops: string[];
  subscriptionType: SubscriptionType;
  language: SupportedLanguage;
  darkMode: boolean;
  notificationPreferences: NotificationPreferences;
  createdAt: Date;
  lastLogin: Date;
}

export interface SubscriptionType {
  type: 'free' | 'premium';
  scansRemaining?: number;
  maxScansPerMonth?: number;
  expiresAt?: Date;
  features: SubscriptionFeature[];
}

export interface SubscriptionFeature {
  name: string;
  included: boolean;
  limit?: number;
}

export interface NotificationPreferences {
  diseaseAlerts: boolean;
  weeklyTips: boolean;
  subscriptionUpdates: boolean;
  marketPrices: boolean;
}

export enum SupportedLanguage {
  ENGLISH = 'en',
  SHONA = 'sn',
  NDEBELE = 'nd',
}

// UI State Types
export interface AppTheme {
  isDark: boolean;
  colors: typeof Colors.light | typeof Colors.dark;
}

export interface CameraState {
  isActive: boolean;
  flashEnabled: boolean;
  isProcessing: boolean;
  capturedImage?: string;
}

export interface SearchFilters {
  category?: DiseaseCategory;
  severity?: DiseaseSeverity;
  cropType?: string;
  remedyType?: RemedyType;
  isOrganic?: boolean;
  showPremiumOnly?: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Results: {
    detectionResult: DetectionResult;
  };
  Guide: {
    filters?: SearchFilters;
  };
  DiseaseDetail: {
    diseaseId: string;
  };
  Settings: undefined;
  Subscription: undefined;
  Profile: undefined;
};

// Component Props
export interface ConfidenceBarProps {
  confidence: number;
  level: ConfidenceLevel;
}

export interface RemedyCardProps {
  remedy: Remedy;
  onPress: () => void;
  isLocked?: boolean;
}

export interface DiseaseCardProps {
  disease: PlantDisease;
  onPress: () => void;
  showPremiumBadge?: boolean;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  isPremium?: boolean;
  disabled?: boolean;
}

export interface UpgradePromptProps {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  feature: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DetectionApiResponse {
  detectionId: string;
  plantType: string;
  diseases: {
    name: string;
    confidence: number;
    diseaseId: string;
  }[];
  processingTime: number;
}
