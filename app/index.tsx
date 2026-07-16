import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ImageStyle, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppAudio } from '../contexts/AudioPlayerContext';
import { useLayoutScale } from '../hooks/useLayoutScale';

// All boxes below are traced from the Figma landing frame (node 2468:7059,
// 402×874 baseline). Coordinates stay in baseline units; `s` scales them.

// Title block: y-values relative to the block top (184.23 in the frame).
const GROUP = {
  title: { x: 51.28, y: 0, w: 300.47, h: 96.08 },
  subtitle1: { x: 54.41, y: 138.53, w: 294.11, h: 37.55 },
  subtitle2: { x: 56.65, y: 201.01, w: 288.62, h: 47.2 },
  shaykh: { x: 180.45, y: 302.62, w: 40.83, h: 17.76 },
  scholar: { x: 52.01, y: 337.75, w: 298.97, h: 40.57 },
  dates: { x: 133.35, y: 393.47, w: 135.74, h: 38.08 },
};
const GROUP_H = 431.55; // title top → dates bottom
// Frame space above the block (184.23) vs. below it down to the bar (124.02):
// extra vertical space on taller/shorter screens is split in this same ratio.
const GROUP_SPACE_RATIO = 184.23 / (184.23 + 124.02);

const BAR_H = 134.2; // bar top (739.8) → frame bottom

// Bar buttons: outer box relative to the bar top, children relative to the box.
const BUTTONS = {
  settings: {
    box: { x: 28, y: 7, w: 70.72, h: 89.5 },
    icon: { x: 11.32, y: 19.76, w: 47.63, h: 50.03 },
    label: { x: 14.56, y: 70.12, w: 44.34, h: 19.4 },
  },
  book: {
    box: { x: 172, y: 15, w: 57.87, h: 81.6 },
    icon: { x: 3.88, y: 15.64, w: 51.16, h: 45.05 },
    label: { x: 11.68, y: 62.96, w: 34.99, h: 18.63 },
  },
  sound: {
    box: { x: 302.58, y: 15, w: 72.13, h: 81.6 },
    icon: { x: 8.44, y: 14.32, w: 53.38, h: 46.29 },
    label: { x: 8.48, y: 62.96, w: 49.7, h: 18.61 },
  },
};

// Audio popup: bubble sits directly on the bar top; children relative to bubble.
const POPUP = {
  bubble: { x: 185, w: 195, h: 92.26 },
  label: { x: 24.15, y: 7.18, w: 149.42, h: 27.07 },
  cancel: { x: 22.02, y: 41.94, w: 30.4, h: 30.4 },
  play: { x: 79.68, y: 41.94, w: 30.4, h: 30.4 },
  replay: { x: 137.34, y: 41.94, w: 30.4, h: 30.4 },
};

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { s, colX, height } = useLayoutScale();

  const [showAudio, setShowAudio] = useState(false);

  // Persistent audio player from the root provider — survives navigation
  // so the play/pause state stays correct when returning to this screen.
  const { player, status } = useAppAudio();

  // Only add padding for Android devices with traditional software buttons (typically >20dp)
  const bottomPadding = Platform.OS === 'android' && insets.bottom > 20 ? insets.bottom : 0;

  const barHeight = BAR_H * s + bottomPadding;
  const barTop = height - barHeight;
  const groupTop = (barTop - GROUP_H * s) * GROUP_SPACE_RATIO;

  const abs = (b: { x: number; y: number; w: number; h: number }, offsetY = 0): ImageStyle => ({
    position: 'absolute',
    left: colX + b.x * s,
    top: offsetY + b.y * s,
    width: b.w * s,
    height: b.h * s,
  });
  // For children of an already-scaled absolute parent (no column offset).
  const rel = (b: { x: number; y: number; w: number; h: number }): ImageStyle => ({
    position: 'absolute',
    left: b.x * s,
    top: b.y * s,
    width: b.w * s,
    height: b.h * s,
  });
  // Touchable box padded around a visual box — real touch area instead of
  // hitSlop, which silently stops working outside the parent's bounds.
  const TOUCH_PAD = 10;
  const touch = (b: { x: number; y: number; w: number; h: number }) => ({
    position: 'absolute' as const,
    left: (b.x - TOUCH_PAD) * s,
    top: (b.y - TOUCH_PAD) * s,
    width: (b.w + TOUCH_PAD * 2) * s,
    height: (b.h + TOUCH_PAD * 2) * s,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  });

  const handleBookPress = async () => {
    try {
      const bookmarkedPage = await SecureStore.getItemAsync('bookmarkedPage');
      if (bookmarkedPage !== null) {
        router.push({ pathname: '/reader', params: { initialPage: bookmarkedPage } });
      } else {
        router.push('/reader');
      }
    } catch {
      router.push('/reader');
    }
  };

  const handlePlayPausePress = () => {
    if (!player) return;
    if (status.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleReplayPress = () => {
    if (!player) return;
    player.seekTo(0);
    // Replay should restart playback, not just rewind.
    player.play();
  };

  return (
    <View className="flex-1 bg-wird-navy">
      {/* Full-bleed gradient background (composited conic+linear export from Figma) */}
      <Image
        source={require('@/assets/images/landing/landing-bg.png')}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="fill"
      />

      {/* Title block — vector calligraphy and text, uniform-scaled */}
      <View style={{ position: 'absolute', top: groupTop, left: 0, right: 0, height: GROUP_H * s }}>
        <Image source={require('@/assets/images/landing/title-calligraphy.png')} style={abs(GROUP.title)} contentFit="contain" />
        <Image source={require('@/assets/images/landing/subtitle-1.svg')} style={abs(GROUP.subtitle1)} contentFit="contain" />
        <Image source={require('@/assets/images/landing/subtitle-2.svg')} style={abs(GROUP.subtitle2)} contentFit="contain" />
        <Image source={require('@/assets/images/landing/label-alshaykh.svg')} style={abs(GROUP.shaykh)} contentFit="contain" />
        <Image source={require('@/assets/images/landing/scholar-name.png')} style={abs(GROUP.scholar)} contentFit="contain" />
        <Image source={require('@/assets/images/landing/dates.svg')} style={abs(GROUP.dates)} contentFit="contain" />
      </View>

      {/* Audio popup — anchored on top of the bottom bar */}
      {showAudio && (
        <View
          style={{
            position: 'absolute',
            left: colX + POPUP.bubble.x * s,
            bottom: barHeight,
            width: POPUP.bubble.w * s,
            height: POPUP.bubble.h * s,
          }}
        >
          <Image
            source={require('@/assets/images/landing/audio-popup-bubble.svg')}
            style={StyleSheet.absoluteFill}
            contentFit="fill"
          />
          <Image source={require('@/assets/images/landing/label-listen-full.svg')} style={rel(POPUP.label)} contentFit="contain" />
          <TouchableOpacity
            onPress={() => setShowAudio(false)}
            activeOpacity={0.6}
            style={touch(POPUP.cancel)}
          >
            <Image source={require('@/assets/images/landing/icon-cancel.svg')} style={{ width: POPUP.cancel.w * s, height: POPUP.cancel.h * s }} contentFit="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePlayPausePress}
            activeOpacity={0.6}
            style={touch(POPUP.play)}
          >
            <Image
              source={
                status.playing
                  ? require('@/assets/images/landing/icon-pause.svg')
                  : require('@/assets/images/landing/icon-play.svg')
              }
              style={{ width: POPUP.play.w * s, height: POPUP.play.h * s }}
              contentFit="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReplayPress}
            activeOpacity={0.6}
            style={touch(POPUP.replay)}
          >
            <Image source={require('@/assets/images/landing/icon-replay.svg')} style={{ width: POPUP.replay.w * s, height: POPUP.replay.h * s }} contentFit="contain" />
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom bar — flat navy, full screen width */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: barHeight,
          backgroundColor: '#113152',
        }}
      >
        <TouchableOpacity onPress={() => router.push('/settings')} activeOpacity={0.6} style={abs(BUTTONS.settings.box)} hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}>
          <Image source={require('@/assets/images/landing/icon-settings.png')} style={rel(BUTTONS.settings.icon)} contentFit="contain" />
          <Image source={require('@/assets/images/landing/label-aldabt.svg')} style={rel(BUTTONS.settings.label)} contentFit="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBookPress} activeOpacity={0.6} style={abs(BUTTONS.book.box)} hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}>
          <Image source={require('@/assets/images/landing/icon-book.png')} style={rel(BUTTONS.book.icon)} contentFit="contain" />
          <Image source={require('@/assets/images/landing/label-alwird.svg')} style={rel(BUTTONS.book.label)} contentFit="contain" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowAudio(true)} activeOpacity={0.6} style={abs(BUTTONS.sound.box)} hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}>
          <Image source={require('@/assets/images/landing/icon-sound.png')} style={rel(BUTTONS.sound.icon)} contentFit="contain" />
          <Image source={require('@/assets/images/landing/label-alsawt.svg')} style={rel(BUTTONS.sound.label)} contentFit="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
