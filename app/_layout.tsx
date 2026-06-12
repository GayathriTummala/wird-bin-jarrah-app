import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ActivityIndicator, LogBox, View } from 'react-native';
import 'react-native-reanimated';
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
      <View style={{ flex: 1, backgroundColor: '#255458', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#FFFBF1" />
      </View>
    );
  }

  return (
    <FontScaleProvider>
      <AudioPlayerProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#255458' }
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="reader" />
          <Stack.Screen name="settings" />
        </Stack>
      </AudioPlayerProvider>
    </FontScaleProvider>
  );
}
