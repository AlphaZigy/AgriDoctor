# 🌱 AgriDoctor - AI-Powered Plant Disease Detection

> **Modern mobile app for farmers to detect plant diseases and get treatment recommendations using AI technology**

[![React Native](https://img.shields.io/badge/React%20Native-0.79.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~53.0.22-lightgrey.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📱 App Overview

AgriDoctor is a comprehensive mobile application designed to help farmers and agricultural professionals quickly identify plant diseases through AI-powered image analysis and receive actionable treatment recommendations.

### 🎯 Key Features

- **📸 AI Disease Detection** - Snap photos of plants to identify diseases instantly
- **📚 Comprehensive Disease Guide** - Browse extensive database of plant diseases
- **💊 Treatment Recommendations** - Get detailed remedies and prevention tips
- **🏠 Farmer Dashboard** - Quick access to essential farming tools
- **⚙️ Personalized Settings** - Customize app experience and notifications
- **🌙 Dark/Light Mode** - Comfortable viewing in any lighting condition

## 🚀 Tech Stack

### **Frontend Framework**
- **React Native** 0.79.6 - Cross-platform mobile development
- **Expo** ~53.0.22 - Development platform and build tools
- **TypeScript** ~5.8.3 - Type-safe JavaScript development

### **Navigation & UI**
- **Expo Router** - File-based routing system
- **React Native Paper** - Material Design components
- **@expo/vector-icons** - Comprehensive icon library
- **react-native-safe-area-context** - Safe area handling

### **Development Tools**
- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **Metro Bundler** - JavaScript bundler

## 📁 Project Structure

```
AgriDoctor/
├── app/                          # Screen components
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home/Dashboard screen
│   │   ├── settings.tsx         # Settings screen
│   │   └── explore.tsx          # Explore screen
│   ├── camera.tsx               # Disease detection camera
│   ├── guide.tsx                # Disease guide browser
│   ├── results.tsx              # Analysis results
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable UI components
│   ├── ui/                      # Custom UI components
│   │   ├── AgriButton.tsx       # Custom button component
│   │   ├── AppHeader.tsx        # Fixed header component
│   │   ├── FeatureCard.tsx      # Feature display cards
│   │   ├── DiseaseCard.tsx      # Disease information cards
│   │   ├── ConfidenceBar.tsx    # AI confidence indicator
│   │   └── RemedyCard.tsx       # Treatment recommendation cards
│   └── ...                     # Other shared components
├── constants/                    # App configuration
│   ├── Colors.ts                # Agriculture-themed color palette
│   └── Styles.ts                # Shared styling constants
├── types/                       # TypeScript type definitions
│   └── index.ts                 # App-wide type definitions
├── hooks/                       # Custom React hooks
├── assets/                      # Static assets (images, fonts)
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

### **Color Palette**
```typescript
// Agriculture-inspired colors
primaryGreen: '#2E7D32'    // Main brand color
secondaryGreen: '#4CAF50'  // Secondary actions
lightGreen: '#81C784'      // Success states
darkGreen: '#1B5E20'       // Headers and emphasis
warning: '#FF8F00'         // Warning states
error: '#D32F2F'           // Error states
```

### **UI Components**
- **AgriButton** - Branded buttons with agriculture theming
- **FeatureCard** - Dashboard feature displays
- **DiseaseCard** - Disease information with confidence scores
- **AppHeader** - Fixed headers with navigation and actions
- **ConfidenceBar** - Visual AI confidence indicators

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlphaZigy/AgriDoctor.git
   cd AgriDoctor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Scan QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## 📱 Screen Overview

### 🏠 **Home Dashboard**
- Quick access to core features
- Recent disease scans
- Weather alerts and farming tips
- Market price indicators

### 📸 **Camera Screen**
- AI-powered plant disease detection
- Real-time image capture
- Flash toggle and camera controls
- Instant analysis processing

### 📊 **Results Screen**
- Disease identification results
- Confidence score indicators
- Detailed treatment recommendations
- Share and save functionality

### 📚 **Disease Guide**
- Comprehensive disease database
- Advanced search and filtering
- Category-based browsing
- Seasonal disease information

### ⚙️ **Settings Screen**
- User preferences
- Notification management
- Theme selection (dark/light)
- Data backup and export

## 🔄 Recent Updates & Improvements

### ✅ **v1.0.0 - Initial Release** (September 2025)

#### **Core Features Implemented:**
- ✅ Complete UI/UX design with agriculture theme
- ✅ Tab-based navigation system
- ✅ All major screens (Home, Camera, Results, Guide, Settings)
- ✅ Custom UI component library
- ✅ Fixed headers with proper navigation
- ✅ TypeScript integration and error handling
- ✅ React Native Paper integration
- ✅ Professional color scheme and styling

#### **Technical Achievements:**
- ✅ File-based routing with Expo Router
- ✅ Type-safe development with TypeScript
- ✅ Responsive design for various screen sizes
- ✅ Material Design components integration
- ✅ Safe area handling for modern devices
- ✅ Git version control and GitHub integration

## 🚧 Planned Improvements

### **Phase 1: Core Functionality** (Q4 2025)
- [ ] **AI Integration** - Connect real disease detection API
- [ ] **Camera Enhancement** - Add image preprocessing and optimization
- [ ] **Database Integration** - Implement persistent data storage
- [ ] **User Authentication** - Add user accounts and profiles
- [ ] **Offline Mode** - Enable offline disease detection

### **Phase 2: Advanced Features** (Q1 2026)
- [ ] **Weather Integration** - Real-time weather data and alerts
- [ ] **Market Prices** - Live agricultural market information
- [ ] **Expert Consultation** - Connect with agricultural experts
- [ ] **Crop Management** - Comprehensive farm management tools
- [ ] **Community Features** - Farmer forums and knowledge sharing

### **Phase 3: Business Features** (Q2 2026)
- [ ] **Subscription Model** - Premium features and AI credits
- [ ] **Multi-language Support** - Localization for global markets
- [ ] **Analytics Dashboard** - Farm health analytics and insights
- [ ] **Integration APIs** - Connect with farming equipment and sensors
- [ ] **White-label Solutions** - Customizable versions for organizations

## 🤝 Contributing

We welcome contributions to AgriDoctor! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Make your changes** and add tests if applicable
4. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
5. **Push to the branch** (`git push origin feature/AmazingFeature`)
6. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use the existing component patterns
- Maintain the agriculture theme consistency
- Add proper error handling
- Include unit tests for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Alpha Zigara**
- 🌐 Website: [www.dubzig.co.zw](https://www.dubzig.co.zw)
- 📧 Business Email: [info@dubzig.co.zw](mailto:info@dubzig.co.zw)
- 📱 Phone: [+263717865911](tel:+263717865911)
- 💻 GitHub: [@AlphaZigy](https://github.com/AlphaZigy)
- 🚀 Project: [AgriDoctor](https://github.com/AlphaZigy/AgriDoctor)

## 🙏 Acknowledgments

- **React Native Team** - For the amazing cross-platform framework
- **Expo Team** - For simplifying React Native development
- **Material Design** - For the comprehensive design system
- **Agriculture Community** - For inspiration and domain knowledge

---

**📱 Built with ❤️ for farmers and agricultural professionals worldwide 🌾**