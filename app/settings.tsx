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
import { Alert, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

// Custom switch using provided SVG files
const CustomSwitch = ({ value, onValueChange }: { value: boolean, onValueChange: (v: boolean) => void }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
    >
      <Image
        source={value ? require('@/assets/images/toggle-on.svg') : require('@/assets/images/toggle-off.svg')}
        style={{ width: 60, height: 34 }}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
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
            <View className="bg-wird-cream p-4 rounded-2xl items-center w-[80%] shadow-xl">
              <DateTimePicker
                value={date}
                mode="time"
                display="spinner"
                textColor="#255458"
                onChange={(event, selectedDate) => {
                  if (selectedDate) onChange(selectedDate);
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPicker(false)}
                className="mt-6 bg-[#255458] px-8 py-3 rounded-full shadow-md"
              >
                <Text className="text-wird-cream font-bold text-lg font-GESSTextMedium">تم</Text>
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

  return (
    <View className="flex-1 bg-wird-dark-teal pt-[77px] px-[33px] pb-8">

      {/* Top Header: Home Icon */}
      <View className="mb-8 items-start" style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Image
            source={require('@/assets/images/home.svg')}
            style={{ width: 30, height: 30 }}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Settings Sections */}
      <View className="flex-1 mt-10">

        {/* Morning Reminder Block */}
        <View className="mb-8">
          <View className="border border-wird-cream/30 rounded-2xl px-6 py-4 mb-4 flex-row items-center justify-between">
            <CustomSwitch value={morningReminder} onValueChange={handleMorningToggle} />
            <Text className="text-wird-cream font-bold text-xl font-GESSTextMedium text-right">
              التذكير الصباحي
            </Text>
          </View>

          <View className="flex-row items-center w-full px-2 justify-between">
            <View className="items-start flex-1">
              {morningReminder && (
                <View>
                  <TouchableOpacity
                    onPress={() => setShowMorningPicker(true)}
                    className="bg-[#FFFBF1] rounded-[5px] items-center justify-center"
                    style={{ width: 190, height: 40 }}
                  >
                    <Text className="text-wird-charcoal font-bold font-GESSTextMedium text-base leading-none">
                      {formatTime(morningDate)}
                    </Text>
                  </TouchableOpacity>
                  {renderPicker(morningDate, handleMorningTimeChange, showMorningPicker, setShowMorningPicker)}
                </View>
              )}
            </View>

            <Text className="text-wird-cream font-bold text-base font-GESSTextMedium text-right pr-4">
              وقت التذكير
            </Text>
          </View>
        </View>

        {/* Evening Reminder Block */}
        <View className="mb-8">
          <View className="border border-wird-cream/30 rounded-2xl px-6 py-4 mb-4 flex-row items-center justify-between">
            <CustomSwitch value={eveningReminder} onValueChange={handleEveningToggle} />
            <Text className="text-wird-cream font-bold text-xl font-GESSTextMedium text-right">
              التذكير المسائي
            </Text>
          </View>

          <View className="flex-row items-center px-2 w-full justify-between">
            <View className="items-start flex-1">
              {eveningReminder && (
                <View>
                  <TouchableOpacity
                    onPress={() => setShowEveningPicker(true)}
                    className="bg-[#FFFBF1] rounded-[5px] items-center justify-center"
                    style={{ width: 190, height: 40 }}
                  >
                    <Text className="text-wird-charcoal font-bold font-GESSTextMedium text-base leading-none">
                      {formatTime(eveningDate)}
                    </Text>
                  </TouchableOpacity>
                  {renderPicker(eveningDate, handleEveningTimeChange, showEveningPicker, setShowEveningPicker)}
                </View>
              )}
            </View>

            <Text className="text-wird-cream font-bold text-base font-GESSTextMedium text-right pr-4">
              وقت التذكير
            </Text>
          </View>
        </View>

        {/* Intro Popup Reset Block */}
        <View className="mb-8">
          <View className="border border-wird-cream/30 rounded-2xl px-6 py-4">
            {/* Title row */}
            <View className="flex-row items-center justify-between mb-3">
              <TouchableOpacity
                onPress={handleResetIntroPopup}
                disabled={!canReset}
                className={`px-4 py-2 rounded-full ${canReset ? 'bg-wird-cream' : 'bg-wird-cream/30'}`}
                activeOpacity={0.7}
              >
                <Text className={`text-sm font-GESSTextMedium font-bold ${canReset ? 'text-wird-charcoal' : 'text-wird-cream/50'}`}>
                  إعادة ضبط
                </Text>
              </TouchableOpacity>
              <Text className="text-wird-cream font-bold text-xl font-GESSTextMedium text-right">
                التنبيه الترحيبي
              </Text>
            </View>

            {/* Status row */}
            <View className="flex-row justify-end">
              <Text className="text-wird-cream/60 text-sm font-GESSTextMedium text-right">
                {popupStatusLabel}
              </Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
}
