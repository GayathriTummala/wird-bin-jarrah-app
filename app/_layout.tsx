import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'GESSTextMedium': require('../assets/fonts/GE-SS-Text-Medium.otf'),
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
