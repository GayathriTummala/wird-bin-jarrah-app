import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Reminders',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
    });
  }
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleMorningReminder(date: Date): Promise<void> {
  // Cancel any previous morning reminder
  const existingId = await SecureStore.getItemAsync('morningNotifId');
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'وقت الورد الصباحي 🌅',
      body: 'حان وقت قراءة ورد الصباح',
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: date.getHours(),
      minute: date.getMinutes(),
    },
  });
  await SecureStore.setItemAsync('morningNotifId', id);
}

export async function scheduleEveningReminder(date: Date): Promise<void> {
  const existingId = await SecureStore.getItemAsync('eveningNotifId');
  if (existingId) {
    await Notifications.cancelScheduledNotificationAsync(existingId);
  }

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'وقت الورد المسائي 🌙',
      body: 'حان وقت قراءة ورد المساء',
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: date.getHours(),
      minute: date.getMinutes(),
    },
  });
  await SecureStore.setItemAsync('eveningNotifId', id);
}

export async function cancelMorningReminder(): Promise<void> {
  const id = await SecureStore.getItemAsync('morningNotifId');
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    await SecureStore.deleteItemAsync('morningNotifId');
  }
}

export async function cancelEveningReminder(): Promise<void> {
  const id = await SecureStore.getItemAsync('eveningNotifId');
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    await SecureStore.deleteItemAsync('eveningNotifId');
  }
}
