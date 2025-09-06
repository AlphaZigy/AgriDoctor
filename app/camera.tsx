import { ThemedView } from '@/components/ThemedView';
import { AgriButton } from '@/components/ui/AgriButton';
import { AppHeader } from '@/components/ui/AppHeader';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Note: In a real implementation, you would use expo-camera
// For this demo, we'll simulate the camera interface

interface CameraState {
  isActive: boolean;
  flashEnabled: boolean;
  isProcessing: boolean;
  capturedImage?: string;
}

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [cameraState, setCameraState] = useState<CameraState>({
    isActive: true,
    flashEnabled: false,
    isProcessing: false,
  });

  const handleCapture = () => {
    setCameraState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate capture and processing
    setTimeout(() => {
      setCameraState(prev => ({ 
        ...prev, 
        isProcessing: false,
        capturedImage: 'mock-image-uri',
      }));
    }, 2000);
  };

  const handleRetake = () => {
    setCameraState(prev => ({ 
      ...prev, 
      capturedImage: undefined,
      isProcessing: false,
    }));
  };

  const handleConfirm = () => {
    // Navigate to results screen with mock data
    const mockDetectionResult = {
      id: 'mock-detection-1',
      imageUri: 'mock-image-uri',
      disease: {
        id: 'tomato-blight',
        name: 'Tomato Late Blight',
        scientificName: 'Phytophthora infestans',
        category: 'fungal',
        description: 'A serious disease that affects tomato plants, causing dark spots on leaves and stems.',
        symptoms: ['Dark spots on leaves', 'Brown patches on stems', 'White mold on leaf undersides'],
        causes: ['High humidity', 'Cool temperatures', 'Poor air circulation'],
        remedies: [],
        preventiveMeasures: ['Improve air circulation', 'Avoid overhead watering', 'Apply fungicide'],
        severity: 'high',
        affectedCrops: ['Tomato', 'Potato'],
        isPremium: false,
      },
      confidence: 89,
      plantType: 'Tomato',
      detectedAt: new Date(),
    };

    router.push({
      pathname: '/results',
      params: { detectionResult: JSON.stringify(mockDetectionResult) }
    });
  };

  const toggleFlash = () => {
    setCameraState(prev => ({ ...prev, flashEnabled: !prev.flashEnabled }));
  };

  return (
    <ThemedView style={styles.container}>
      <AppHeader
        title="Plant Scanner"
        subtitle="Take a photo to identify diseases"
        showBackButton={true}
        backgroundColor="black"
        rightElement={
          <TouchableOpacity
            style={[styles.flashButton, cameraState.flashEnabled && styles.activeControl]}
            onPress={toggleFlash}
          >
            <Ionicons 
              name={cameraState.flashEnabled ? "flash" : "flash-off"} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        }
      />
      
      {/* Camera Viewfinder Area */}
      <View style={styles.cameraContainer}>
        {/* Mock Camera View */}
        <View style={[styles.mockCamera, { backgroundColor: cameraState.capturedImage ? colors.card : '#000' }]}>
          {cameraState.isProcessing ? (
            <View style={styles.processingOverlay}>
              <View style={styles.processingIndicator}>
                <Ionicons name="scan" size={64} color={Colors.agriculture.primaryGreen} />
                <Text style={styles.processingText}>Analyzing plant...</Text>
                <Text style={styles.processingSubtext}>AI is detecting diseases</Text>
              </View>
            </View>
          ) : cameraState.capturedImage ? (
            <View style={styles.capturedImageContainer}>
              <Ionicons name="image" size={100} color={colors.icon} />
              <Text style={[styles.capturedText, { color: colors.text }]}>
                Image Captured
              </Text>
            </View>
          ) : (
            <View style={styles.cameraOverlay}>
              {/* Scanning Frame */}
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
              
              <Text style={styles.instructionText}>
                Position the plant leaf within the frame
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {cameraState.capturedImage ? (
            <View style={styles.captureActions}>
              <AgriButton
                title="Retake"
                onPress={handleRetake}
                variant="outline"
                size="medium"
                icon="camera-reverse"
                style={styles.actionButton}
              />
              
              <AgriButton
                title="Analyze"
                onPress={handleConfirm}
                variant="success"
                size="large"
                icon="scan"
                style={styles.analyzeButton}
              />
            </View>
          ) : (
            <View style={styles.captureControls}>
              {/* Gallery Button */}
              <TouchableOpacity style={styles.galleryButton}>
                <Ionicons name="images" size={24} color="white" />
              </TouchableOpacity>
              
              {/* Capture Button */}
              <TouchableOpacity
                style={[styles.captureButton, cameraState.isProcessing && styles.processingButton]}
                onPress={handleCapture}
                disabled={cameraState.isProcessing}
              >
                <View style={styles.captureButtonInner}>
                  {cameraState.isProcessing ? (
                    <Ionicons name="refresh" size={32} color="white" />
                  ) : (
                    <Ionicons name="camera" size={32} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              
              {/* Flash Info */}
              <View style={styles.flashInfo}>
                <Text style={styles.flashText}>
                  {cameraState.flashEnabled ? 'Flash On' : 'Flash Off'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Tips Section */}
      {!cameraState.capturedImage && !cameraState.isProcessing && (
        <View style={styles.tipsContainer}>
          <Text style={[styles.tipsTitle, { color: colors.text }]}>
            Tips for Best Results:
          </Text>
          <View style={styles.tipsList}>
            <View style={styles.tip}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.agriculture.success} />
              <Text style={[styles.tipText, { color: colors.icon }]}>
                Use good lighting or enable flash
              </Text>
            </View>
            <View style={styles.tip}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.agriculture.success} />
              <Text style={[styles.tipText, { color: colors.icon }]}>
                Keep the leaf clean and visible
              </Text>
            </View>
            <View style={styles.tip}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.agriculture.success} />
              <Text style={[styles.tipText, { color: colors.icon }]}>
                Fill the frame with the leaf
              </Text>
            </View>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  
  mockCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
    marginBottom: 40,
  },
  
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: Colors.agriculture.primaryGreen,
    borderWidth: 3,
  },
  
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 10,
  },
  
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  activeControl: {
    backgroundColor: Colors.agriculture.primaryGreen,
  },
  
  centerControls: {
    flex: 1,
    alignItems: 'center',
  },
  
  screenTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  
  captureControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  
  processingButton: {
    backgroundColor: Colors.agriculture.primaryGreen + '50',
  },
  
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.agriculture.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  flashInfo: {
    width: 50,
    alignItems: 'center',
  },
  
  flashText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  
  captureActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'white',
  },
  
  analyzeButton: {
    paddingHorizontal: 32,
  },
  
  processingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  
  processingIndicator: {
    alignItems: 'center',
  },
  
  processingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  
  processingSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 8,
  },
  
  capturedImageContainer: {
    alignItems: 'center',
  },
  
  capturedText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
  },
  
  flashButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  
  tipsContainer: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  
  tipsList: {
    gap: 8,
  },
  
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  tipText: {
    fontSize: 14,
    flex: 1,
  },
});
