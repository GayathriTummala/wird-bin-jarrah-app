import Counter from '@/components/Counter';
import FirstTimePopup, { DismissMode } from '@/components/FirstTimePopup';
import PagerView from '@/components/PagerViewCompat';
import ReaderPage from '@/components/ReaderPage';
import { contentData } from '@/constants/content';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function ReaderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
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

  return (
    <View className="flex-1 bg-wird-dark-teal">

      {/* Intro Overlay Popup */}
      <FirstTimePopup
        visible={showPopup}
        onDismiss={handleClosePopup}
      />

      {/* Top Header Area. The old header was a 100px-tall View with 97px top
          padding, which laid the icon touchables mostly OUTSIDE the header's
          bounds — touches outside a parent's box never register in release
          builds, which made these icons feel dead. The buttons are now
          absolutely positioned 56×56 targets that fully contain their icons. */}
      <View className="h-[100px] w-full" />
      <TouchableOpacity
        onPress={handleHomePress}
        activeOpacity={0.6}
        style={{ position: 'absolute', left: 20, top: 86, width: 56, height: 56, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}
      >
        <Image
          source={require('@/assets/images/home.svg')}
          style={{ width: 38, height: 38 }}
          contentFit="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleBookmarkPress}
        activeOpacity={0.6}
        style={{ position: 'absolute', right: 20, top: 86, width: 56, height: 56, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}
      >
        <Image
          source={bookmarkedPage === currentPage ? require('@/assets/images/bookmark2.png') : require('@/assets/images/bookmark1.png')}
          style={[
            { width: 38, height: 38 },
            bookmarkedPage === currentPage && { transform: [{ scale: 1.2 }] }
          ]}
          contentFit="contain"
        />
      </TouchableOpacity>

      {/* Main Content Swiper inside the Cream Card */}
      <View
        className="flex-1 mx-[33px] mt-[22px] overflow-hidden"
        style={{
          backgroundColor: '#FFFBF1',
          boxShadow: '0 -1.4px 4px 0 #11100F, 0 1.4px 4px 0 #163A3D'
        }}
      >
        <PagerView
          style={{ flex: 1 }}
          initialPage={startPage}
          ref={pagerRef}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          layoutDirection="rtl"
        >
          {contentData.map((page, index) => (
            <ReaderPage key={page.id} page={page} index={index} totalPages={contentData.length} />
          ))}
        </PagerView>
      </View>

      {/* Manual Counter Floating at Bottom */}
      <View className="w-full" style={{ paddingTop: 45, paddingBottom: 43 }}>
        <Counter pageId={contentData[currentPage]?.id || currentPage} />
      </View>
    </View>
  );
}
