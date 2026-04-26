import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pause, Play, RotateCcw, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function LandingScreen() {
  const router = useRouter();

  const [showAudio, setShowAudio] = useState(false);

  const audioSource = useMemo(() => require('../assets/audio/wird.mp3'), []);

  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

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

  const textShadowStyle = {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  };

  return (
    <View className="flex-1 bg-[#255458]">

      {/* Main Content Area */}
      <View className="flex-1 pt-[85px]">
        {/* Double Border Container */}
        <View
          style={{
            flex: 1,
            marginHorizontal: 33,
            marginBottom: 52,
            borderWidth: 3,
            borderColor: '#FFFBF1',
            backgroundColor: '#44797D',
            shadowColor: '#11100F',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <View style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#FFFBF1',
            margin: 6,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 32,
            paddingHorizontal: 16,
          }}>

            <View className="items-center mt-2 flex-shrink">
              {/* Title */}
              <Text
                className="text-[#FFFBF1] font-bold font-GESSTextMedium text-center mb-4 leading-tight"
                style={{ fontSize: 48, ...textShadowStyle }}
              >
                ورد بن جراح
              </Text>

              {/* Subtitle */}
              <Text className="text-[#FFFBF1] text-[18px] text-center font-GESSTextMedium leading-8 mb-6">
                {'من كلام الله تعالى\nوكلام سيد البشر'}
              </Text>

              {/* Description */}
              <Text className="text-[#FFFBF1] text-sm text-center font-GESSTextMedium leading-7">
                {'نفع الله به من قرأه وأجزل المثوبة لمن\nطبعه اختاره فقير عفو الله ورحمته'}
              </Text>
            </View>

            <View className="items-center mb-2 flex-shrink">
              <Text className="text-[#FFFBF1] text-base mb-1 font-GESSTextMedium">
                الشيخ
              </Text>
              <Text
                className="text-[#FFFBF1] font-bold font-GESSTextMedium mb-3 text-center"
                style={{ fontSize: 22, ...textShadowStyle }}
              >
                محمد بن سليمان الجراح
              </Text>
              <Text className="text-[#FFFBF1] text-sm font-GESSTextMedium leading-6 text-center">
                {'(١٣٢٢هـ - ١٤١٧هـ)\nرحمه الله تعالى'}
              </Text>
            </View>

          </View>
        </View>

        {/* Bottom Bar Section - full width, 108px, SVG icons */}
        <View
          className="h-[108px] bg-[#44797D] justify-around items-center"
          style={{ flexDirection: 'row-reverse' }}
        >
          {!showAudio ? (
            <>

              {/* Sound Icon */}
              <TouchableOpacity onPress={() => setShowAudio(true)} className="items-center">
                <View style={{
                  shadowColor: '#163A3D',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 3.7,
                  elevation: 4,
                }}>
                  <Image
                    source={require('@/assets/images/sound.svg')}
                    style={{ width: 36, height: 36 }}
                    contentFit="contain"
                  />
                </View>
                <Text style={{
                  color: '#FFFBF1',
                  fontFamily: 'GESSTextMedium',
                  fontSize: 15,
                  marginTop: 6,
                  textShadowColor: '#163A3D',
                  textShadowOffset: { width: 0, height: 3 },
                  textShadowRadius: 3.7
                }}>
                  الصوت
                </Text>
              </TouchableOpacity>

              {/* Reader / Book Icon */}
              <TouchableOpacity onPress={handleBookPress} className="items-center">
                <View style={{
                  shadowColor: '#163A3D',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 3.7,
                  elevation: 4,
                }}>
                  <Image
                    source={require('@/assets/images/reader.svg')}
                    style={{ width: 36, height: 36 }}
                    contentFit="contain"
                  />
                </View>
                <Text style={{
                  color: '#FFFBF1',
                  fontFamily: 'GESSTextMedium',
                  fontSize: 15,
                  marginTop: 6,
                  textShadowColor: '#163A3D',
                  textShadowOffset: { width: 0, height: 3 },
                  textShadowRadius: 3.7
                }}>
                  الورد
                </Text>
              </TouchableOpacity>

              {/* Settings Icon */}
              <TouchableOpacity onPress={() => router.push('/settings')} className="items-center">
                <View style={{
                  shadowColor: '#163A3D',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 3.7,
                  elevation: 4,
                }}>
                  <Image
                    source={require('@/assets/images/app-setting.svg')}
                    style={{ width: 36, height: 36 }}
                    contentFit="contain"
                  />
                </View>
                <Text style={{
                  color: '#FFFBF1',
                  fontFamily: 'GESSTextMedium',
                  fontSize: 15,
                  marginTop: 6,
                  textShadowColor: '#163A3D',
                  textShadowOffset: { width: 0, height: 3 },
                  textShadowRadius: 3.7
                }}>
                  الضبط
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View
              className="flex-row items-center justify-center gap-10 w-full"
              style={{ flexDirection: 'row-reverse' }}
            >
              <TouchableOpacity
                onPress={() => setShowAudio(false)}
                className="w-10 h-10 rounded-full items-center justify-center border border-[#FFFBF1]"
              >
                <X size={20} color="#FFFBF1" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  if (status.playing) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
                className="w-14 h-14 bg-[#FFFBF1] rounded-full items-center justify-center shadow-lg"
              >
                {status.playing ? (
                  <Pause size={24} color="#255458" />
                ) : (
                  <Play size={24} color="#255458" style={{ marginLeft: 4 }} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => player.seekTo(0)}
                className="w-10 h-10 border border-[#FFFBF1] rounded-full items-center justify-center shadow-lg"
              >
                <RotateCcw size={20} color="#FFFBF1" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
