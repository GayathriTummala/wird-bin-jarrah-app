import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import '../global.css';

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
  );
}
