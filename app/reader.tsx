import Counter, { COUNTER_BAND_H } from '@/components/Counter';
import FirstTimePopup, { DismissMode } from '@/components/FirstTimePopup';
import PagerView from '@/components/PagerViewCompat';
import ReaderPage from '@/components/ReaderPage';
import { CARD, wirdPages } from '@/constants/pages';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutScale } from '../hooks/useLayoutScale';

// Chrome boxes from the Figma content frames (402×874 baseline)
const HOME = { x: 33, y: 76.8, w: 33.23, h: 31.13 };
const BOOKMARK = { x: 346, y: 76.9, w: 22.23, h: 30.87 };
const HAND_SWIPE = { x: 48, y: 696.84, w: 30, h: 26.9 }; // card-local: (15, 568.04)

export default function ReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { s, colX } = useLayoutScale();
  const startPage = params.initialPage ? parseInt(params.initialPage as string, 10) : 0;

  const [currentPage, setCurrentPage] = useState(startPage);
  const pagerRef = useRef<any>(null);

  // Intro popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissMode, setPopupDismissMode] = useState<DismissMode | null>(null);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const dismissMode = await SecureStore.getItemAsync('introDismissMode') as DismissMode;
        const dismissUntil = await SecureStore.getItemAsync('introDismissUntil');

        if (dismissMode === 'permanent') {
          return; // never show
        }

        if ((dismissMode === '1day' || dismissMode === '1week') && dismissUntil) {
          if (Date.now() < parseInt(dismissUntil, 10)) {
            return; // still snoozed
          } else {
            // snooze expired, reset
            await SecureStore.deleteItemAsync('introDismissMode');
            await SecureStore.deleteItemAsync('introDismissUntil');
          }
        }

        // Show popup
        setShowPopup(true);
      } catch (error) {
        setShowPopup(true);
      }
    };
    checkIntroStatus();
  }, []);

  const handleClosePopup = async (mode?: DismissMode) => {
    setShowPopup(false);
    if (mode) {
      setPopupDismissMode(mode);

      if (mode === 'permanent') {
        await SecureStore.setItemAsync('introDismissMode', 'permanent');
      } else if (mode === '1day') {
        const until = Date.now() + 24 * 60 * 60 * 1000;
        await SecureStore.setItemAsync('introDismissMode', '1day');
        await SecureStore.setItemAsync('introDismissUntil', until.toString());
      } else if (mode === '1week') {
        const until = Date.now() + 7 * 24 * 60 * 60 * 1000;
        await SecureStore.setItemAsync('introDismissMode', '1week');
        await SecureStore.setItemAsync('introDismissUntil', until.toString());
      }
    }
  };

  const handleHomePress = () => {
    router.replace('/');
  };

  const [bookmarkedPage, setBookmarkedPage] = useState<number | null>(null);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const saved = await SecureStore.getItemAsync('bookmarkedPage');
        if (saved !== null) {
          setBookmarkedPage(parseInt(saved, 10));
        }
      } catch { }
    };
    fetchBookmark();
  }, []);

  const handleBookmarkPress = async () => {
    try {
      if (bookmarkedPage === currentPage) {
        await SecureStore.deleteItemAsync('bookmarkedPage');
        setBookmarkedPage(null);
      } else {
        await SecureStore.setItemAsync('bookmarkedPage', currentPage.toString());
        setBookmarkedPage(currentPage);
      }
    } catch (error) {
      console.error('Error saving bookmark', error);
    }
  };

  // Only add padding for Android devices with traditional software buttons (typically >20dp)
  const bottomPadding = Platform.OS === 'android' && insets.bottom > 20 ? insets.bottom : 0;

  // Keep header icons reachable below the notch on devices taller than baseline
  const headerTop = Math.max(HOME.y * s, insets.top + 10);
  const counterBandH = COUNTER_BAND_H * s + bottomPadding;

  return (
    <View className="flex-1 bg-wird-navy">

      {/* Intro Overlay Popup */}
      <FirstTimePopup
        visible={showPopup}
        onDismiss={handleClosePopup}
      />

      {/* Home — 56pt touch target fully containing the icon */}
      <TouchableOpacity
        onPress={handleHomePress}
        activeOpacity={0.6}
        style={{
          position: 'absolute',
          left: colX + (HOME.x + HOME.w / 2 - 28) * s,
          top: headerTop - (28 - HOME.h / 2) * s,
          width: 56 * s,
          height: 56 * s,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <Image source={require('@/assets/images/reader/icon-home.svg')} style={{ width: HOME.w * s, height: HOME.h * s }} contentFit="contain" />
      </TouchableOpacity>

      {/* Bookmark */}
      <TouchableOpacity
        onPress={handleBookmarkPress}
        activeOpacity={0.6}
        style={{
          position: 'absolute',
          left: colX + (BOOKMARK.x + BOOKMARK.w / 2 - 28) * s,
          top: headerTop - (28 - BOOKMARK.h / 2) * s,
          width: 56 * s,
          height: 56 * s,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {bookmarkedPage === currentPage ? (
          // Official lime state (Figma 2468:6979): 31×45 canvas, bookmark shape
          // at (4, 5.5) with baked shadow — nudged so the shape aligns with the
          // off-state icon position.
          <Image
            source={require('@/assets/images/reader/bookmark-on.png')}
            style={{
              width: 31 * s,
              height: 45 * s,
              transform: [{ translateX: 0.4 * s }, { translateY: 1.6 * s }],
            }}
            contentFit="contain"
          />
        ) : (
          <Image
            source={require('@/assets/images/reader/icon-bookmark.svg')}
            style={{ width: BOOKMARK.w * s, height: BOOKMARK.h * s }}
            contentFit="contain"
          />
        )}
      </TouchableOpacity>

      {/* Content card */}
      <View
        style={{
          position: 'absolute',
          left: colX + CARD.x * s,
          top: CARD.y * s,
          width: CARD.w * s,
          height: CARD.h * s,
          backgroundColor: '#CDCCC9',
          overflow: 'hidden',
        }}
      >
        <PagerView
          style={{ flex: 1 }}
          initialPage={startPage}
          ref={pagerRef}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          layoutDirection="rtl"
        >
          {wirdPages.map((page) => (
            <ReaderPage key={page.id} page={page} s={s} />
          ))}
        </PagerView>

        {/* Swipe hint — static overlay inside the card; the design omits it on the last page */}
        {currentPage < wirdPages.length - 1 && (
          <Image
            source={require('@/assets/images/reader/icon-hand-swipe.svg')}
            style={{
              position: 'absolute',
              left: (HAND_SWIPE.x - CARD.x) * s,
              top: (HAND_SWIPE.y - CARD.y) * s,
              width: HAND_SWIPE.w * s,
              height: HAND_SWIPE.h * s,
            }}
            contentFit="contain"
            pointerEvents="none"
          />
        )}
      </View>

      {/* Counter band anchored to the bottom — same UI and behavior on every page */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: counterBandH,
          paddingBottom: bottomPadding,
        }}
      >
        <Counter pageId={wirdPages[currentPage]?.id ?? currentPage} s={s} colX={colX} />
      </View>
    </View>
  );
}
