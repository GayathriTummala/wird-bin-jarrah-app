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

      {/* Top Header Area (130px height total) */}
      <View
        className="h-[130px] w-full px-[33px] pt-[77px] justify-between items-center"
        style={{ flexDirection: 'row' }}
      >
        <TouchableOpacity onPress={handleHomePress}>
          <Image
            source={require('@/assets/images/home.svg')}
            style={{ width: 30, height: 30 }}
            contentFit="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBookmarkPress} style={{ width: 22, height: 29, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={bookmarkedPage === currentPage ? require('@/assets/images/bookmark2.png') : require('@/assets/images/bookmark1.png')}
            style={[
              { width: 22, height: 29 },
              bookmarkedPage === currentPage && { transform: [{ scale: 1.5 }] }
            ]}
            contentFit="contain"
          />
        </TouchableOpacity>
      </View>

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
