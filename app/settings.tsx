import {
  cancelEveningReminder,
  cancelMorningReminder,
  requestNotificationPermissions,
  scheduleEveningReminder,
  scheduleMorningReminder,
} from '@/hooks/useNotifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Alert, ImageStyle, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '../hooks/useLayoutScale';

// Boxes traced from the Figma settings frame (node 2468:6826, 402×874 baseline).
const L = {
  home: { x: 33, y: 76.8, w: 33.23, h: 31.13 },
  card1: { x: 40, y: 168.8, w: 322, h: 61 },
  card2: { x: 40, y: 309.8, w: 322, h: 61 },
  card3: { x: 40, y: 451.8, w: 322, h: 98 },
  toggle1: { x: 61, y: 184.8, w: 53.51, h: 29.18 },
  toggle2: { x: 61, y: 325.8, w: 53.51, h: 29.18 },
  titleMorning: { x: 205.05, y: 187.82, w: 135.01, h: 27.49 },
  titleEvening: { x: 212.1, y: 328.82, w: 127.96, h: 27.49 },
  titleWelcome: { x: 210.45, y: 473.67, w: 129.61, h: 25.64 },
  sun: { x: 176.25, y: 192.05, w: 17.7, h: 18.5 },
  moon: { x: 184.25, y: 332.05, w: 15.53, h: 16.8 },
  labelTime1: { x: 257.83, y: 248.75, w: 83.16, h: 19.05 },
  labelTime2: { x: 257.83, y: 390.75, w: 83.16, h: 19.05 },
  resetBtn: { x: 61, y: 469.8, w: 94, h: 38 },
  resetLabel: { x: 15.68, y: 11.37, w: 63.37, h: 16.22 }, // relative to resetBtn
  // Dynamic time chip (not in the static design): aligned with the toggles on
  // the left, vertically centered with the وقت التذكير label row.
  timeChip1: { x: 61, y: 243, w: 118, h: 30 },
  timeChip2: { x: 61, y: 385, w: 118, h: 30 },
};

// Returns a human-readable Arabic status string for the intro popup dismiss state
const getPopupStatusLabel = (mode: string | null, until: string | null): string => {
  if (!mode) return 'يظهر عند فتح الورد';
  if (mode === 'permanent') return 'مخفي بشكل دائم';
  if ((mode === '1day' || mode === '1week') && until) {
    const remaining = parseInt(until) - Date.now();
    if (remaining <= 0) return 'يظهر عند فتح الورد'; // snooze expired
    const hours = Math.ceil(remaining / (1000 * 60 * 60));
    if (hours <= 24) return `مخفي لـ ${hours} ساعة`;
    const days = Math.ceil(remaining / (1000 * 60 * 60 * 24));
    return `مخفي لـ ${days} يوم`;
  }
  return 'يظهر عند فتح الورد';
};

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { s, colX } = useLayoutScale();

  const [morningReminder, setMorningReminder] = useState(false);
  const [eveningReminder, setEveningReminder] = useState(false);

  const [morningDate, setMorningDate] = useState(new Date());
  const [eveningDate, setEveningDate] = useState(new Date());
  const [showMorningPicker, setShowMorningPicker] = useState(false);
  const [showEveningPicker, setShowEveningPicker] = useState(false);

  // Intro popup dismiss state
  const [popupMode, setPopupMode] = useState<string | null>(null);
  const [popupUntil, setPopupUntil] = useState<string | null>(null);

  // Load saved settings on mount
  useEffect(() => {
    const loadSavedSettings = async () => {
      try {
        const savedMorning = await SecureStore.getItemAsync('morningReminderEnabled');
        const savedEvening = await SecureStore.getItemAsync('eveningReminderEnabled');
        const savedMorningTime = await SecureStore.getItemAsync('morningReminderTime');
        const savedEveningTime = await SecureStore.getItemAsync('eveningReminderTime');
        const savedPopupMode = await SecureStore.getItemAsync('introDismissMode');
        const savedPopupUntil = await SecureStore.getItemAsync('introDismissUntil');

        if (savedMorning === 'true') setMorningReminder(true);
        if (savedEvening === 'true') setEveningReminder(true);
        if (savedMorningTime) setMorningDate(new Date(parseInt(savedMorningTime)));
        if (savedEveningTime) setEveningDate(new Date(parseInt(savedEveningTime)));
        setPopupMode(savedPopupMode);
        setPopupUntil(savedPopupUntil);
      } catch (e) { }
    };
    loadSavedSettings();
  }, []);

  const abs = (b: { x: number; y: number; w: number; h: number }): ImageStyle => ({
    position: 'absolute',
    left: colX + b.x * s,
    top: b.y * s,
    width: b.w * s,
    height: b.h * s,
  });
  const rel = (b: { x: number; y: number; w: number; h: number }): ImageStyle => ({
    position: 'absolute',
    left: b.x * s,
    top: b.y * s,
    width: b.w * s,
    height: b.h * s,
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  const handleMorningToggle = async (value: boolean) => {
    setMorningReminder(value);
    await SecureStore.setItemAsync('morningReminderEnabled', value ? 'true' : 'false');
    if (value) {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert('الإذن مطلوب', 'يرجى السماح بالإشعارات في الإعدادات');
        setMorningReminder(false);
        return;
      }
      await scheduleMorningReminder(morningDate);
    } else {
      await cancelMorningReminder();
    }
  };

  const handleEveningToggle = async (value: boolean) => {
    setEveningReminder(value);
    await SecureStore.setItemAsync('eveningReminderEnabled', value ? 'true' : 'false');
    if (value) {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert('الإذن مطلوب', 'يرجى السماح بالإشعارات في الإعدادات');
        setEveningReminder(false);
        return;
      }
      await scheduleEveningReminder(eveningDate);
    } else {
      await cancelEveningReminder();
    }
  };

  const handleMorningTimeChange = async (date: Date) => {
    setMorningDate(date);
    await SecureStore.setItemAsync('morningReminderTime', date.getTime().toString());
    if (morningReminder) {
      await scheduleMorningReminder(date);
    }
  };

  const handleEveningTimeChange = async (date: Date) => {
    setEveningDate(date);
    await SecureStore.setItemAsync('eveningReminderTime', date.getTime().toString());
    if (eveningReminder) {
      await scheduleEveningReminder(date);
    }
  };

  // Reset intro popup so it shows again next time
  const handleResetIntroPopup = async () => {
    try {
      await SecureStore.deleteItemAsync('introDismissMode');
      await SecureStore.deleteItemAsync('introDismissUntil');
      setPopupMode(null);
      setPopupUntil(null);
    } catch (e) { }
  };

  const renderPicker = (
    date: Date,
    onChange: (d: Date) => void,
    showPicker: boolean,
    setShowPicker: (b: boolean) => void
  ) => {
    if (!showPicker) return null;

    if (Platform.OS === 'ios') {
      return (
        <Modal transparent={true} animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-wird-light-grey p-4 rounded-2xl items-center w-[80%] shadow-xl">
              <DateTimePicker
                value={date}
                mode="time"
                display="spinner"
                textColor="#113152"
                onChange={(event, selectedDate) => {
                  if (selectedDate) onChange(selectedDate);
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                className="mt-6 bg-wird-navy px-8 py-3 rounded-full shadow-md"
              >
                <Text className="text-wird-light-grey font-bold text-lg font-GESSTextMedium">تم</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }

    return (
      <DateTimePicker
        value={date}
        mode="time"
        display="default"
        onChange={(event, selectedDate) => {
          setShowPicker(false);
          if (selectedDate) onChange(selectedDate);
        }}
      />
    );
  };

  const popupStatusLabel = getPopupStatusLabel(popupMode, popupUntil);
  const canReset = !!popupMode && !(popupMode !== 'permanent' && popupUntil && Date.now() >= parseInt(popupUntil));

  const cardStyle = (b: { x: number; y: number; w: number; h: number }) => ({
    ...abs(b),
    borderWidth: 0.65 * s,
    borderColor: '#CDCCC9',
    borderRadius: 13 * s,
    opacity: 0.7,
  });

  // Keep the home button reachable below the notch on devices taller than the baseline.
  const homeTop = Math.max(L.home.y * s, insets.top + 10);

  return (
    <View className="flex-1 bg-wird-navy">
      {/* Home */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        activeOpacity={0.6}
        hitSlop={{ top: 18, bottom: 18, left: 18, right: 18 }}
        style={{ ...abs(L.home), top: homeTop }}
      >
        <Image source={require('@/assets/images/settings/icon-home.svg')} style={{ width: '100%', height: '100%' }} contentFit="contain" />
      </TouchableOpacity>

      {/* Card outlines */}
      <View style={cardStyle(L.card1)} pointerEvents="none" />
      <View style={cardStyle(L.card2)} pointerEvents="none" />
      <View style={cardStyle(L.card3)} pointerEvents="none" />

      {/* Morning reminder */}
      <Image source={require('@/assets/images/settings/title-morning.svg')} style={abs(L.titleMorning)} contentFit="contain" />
      <Image source={require('@/assets/images/settings/icon-sun.svg')} style={abs(L.sun)} contentFit="contain" />
      <TouchableOpacity
        onPress={() => handleMorningToggle(!morningReminder)}
        activeOpacity={0.8}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={abs(L.toggle1)}
      >
        <Image
          source={morningReminder
            ? require('@/assets/images/settings/toggle-on.svg')
            : require('@/assets/images/settings/toggle-off.svg')}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
        />
      </TouchableOpacity>
      <Image source={require('@/assets/images/settings/label-reminder-time.svg')} style={abs(L.labelTime1)} contentFit="contain" />
      {morningReminder && (
        <TouchableOpacity
          onPress={() => setShowMorningPicker(true)}
          activeOpacity={0.7}
          style={{
            ...abs(L.timeChip1),
            backgroundColor: '#E6E6E6',
            borderRadius: 8 * s,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            allowFontScaling={false}
            className="font-GESSTextMedium font-bold"
            style={{ color: '#113152', fontSize: 14 * s, lineHeight: 20 * s }}
          >
            {formatTime(morningDate)}
          </Text>
        </TouchableOpacity>
      )}
      {renderPicker(morningDate, handleMorningTimeChange, showMorningPicker, setShowMorningPicker)}

      {/* Evening reminder */}
      <Image source={require('@/assets/images/settings/title-evening.svg')} style={abs(L.titleEvening)} contentFit="contain" />
      <Image source={require('@/assets/images/settings/icon-moon.svg')} style={abs(L.moon)} contentFit="contain" />
      <TouchableOpacity
        onPress={() => handleEveningToggle(!eveningReminder)}
        activeOpacity={0.8}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={abs(L.toggle2)}
      >
        <Image
          source={eveningReminder
            ? require('@/assets/images/settings/toggle-on.svg')
            : require('@/assets/images/settings/toggle-off.svg')}
          style={{ width: '100%', height: '100%' }}
          contentFit="contain"
        />
      </TouchableOpacity>
      <Image source={require('@/assets/images/settings/label-reminder-time.svg')} style={abs(L.labelTime2)} contentFit="contain" />
      {eveningReminder && (
        <TouchableOpacity
          onPress={() => setShowEveningPicker(true)}
          activeOpacity={0.7}
          style={{
            ...abs(L.timeChip2),
            backgroundColor: '#E6E6E6',
            borderRadius: 8 * s,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            allowFontScaling={false}
            className="font-GESSTextMedium font-bold"
            style={{ color: '#113152', fontSize: 14 * s, lineHeight: 20 * s }}
          >
            {formatTime(eveningDate)}
          </Text>
        </TouchableOpacity>
      )}
      {renderPicker(eveningDate, handleEveningTimeChange, showEveningPicker, setShowEveningPicker)}

      {/* Welcome popup card */}
      <Image source={require('@/assets/images/settings/title-welcome.svg')} style={abs(L.titleWelcome)} contentFit="contain" />
      <TouchableOpacity
        onPress={handleResetIntroPopup}
        disabled={!canReset}
        activeOpacity={0.7}
        style={{
          ...abs(L.resetBtn),
          backgroundColor: '#E6E6E6',
          borderRadius: 19 * s,
          opacity: canReset ? 1 : 0.4,
        }}
      >
        <Image source={require('@/assets/images/settings/label-reset.svg')} style={rel(L.resetLabel)} contentFit="contain" />
      </TouchableOpacity>
      <Text
        allowFontScaling={false}
        className="font-GESSTextMedium"
        style={{
          position: 'absolute',
          right: colX + 61 * s,
          top: 506 * s,
          fontSize: 15 * s,
          lineHeight: 22 * s,
          color: '#CDCCC9',
          textAlign: 'right',
        }}
      >
        {popupStatusLabel}
      </Text>
    </View>
  );
}
