import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, LogBox, Text, TextInput, View } from 'react-native';
import 'react-native-reanimated';

// Revamp requirement: identical text/button sizes on every device. The OS
// font-size (accessibility) setting must never rescale the app's text.
// @ts-expect-error defaultProps is untyped on RN function components
Text.defaultProps = { ...(Text.defaultProps ?? {}), allowFontScaling: false };
// @ts-expect-error same for TextInput
TextInput.defaultProps = { ...(TextInput.defaultProps ?? {}), allowFontScaling: false };
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext';
import { FontScaleProvider } from '../contexts/FontScaleContext';
import '../global.css';

// expo-notifications auto-registers for push tokens on Android, which is no
// longer supported in Expo Go (SDK 53+). Local notifications still work.
// Suppress the noisy red-screen log; for real push, use a dev build.
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
]);

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'GESSTextMedium': require('../assets/fonts/GE-SS-Text-Medium.otf'),
    'GESSTextBold': require('../assets/fonts/GE-SS-Text-Bold.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#113152', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#FFFBF1" />
      </View>
    );
  }

  return (
    <FontScaleProvider>
      <AudioPlayerProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#113152' }
          }}
        >
          <Stack.Screen name="index" />
          {/* The reader is a page-by-page swipe experience: iOS's edge
              swipe-back gesture conflicts with page swipes and pops the
              user back to home accidentally, so disable it here. */}
          <Stack.Screen
            name="reader"
            options={{ gestureEnabled: false, fullScreenGestureEnabled: false }}
          />
          <Stack.Screen name="settings" />
        </Stack>
      </AudioPlayerProvider>
    </FontScaleProvider>
  );
}
