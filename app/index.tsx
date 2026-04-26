import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Pause, Play, RotateCcw, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
      <View className="flex-1 pt-[100px]">
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

            {/* Vector Image */}
            <Image
              className="mt-4"
              source={require('@/assets/images/landing.svg')}
              style={{ width: 201.999, height: 70.009 }}
              contentFit="contain"
            />

            {/* Text 1 — من كلام الله */}
            <Text
              className="!leading-7 text-[#FFFBF1] text-center font-GESSTextMedium text-[25px] font-medium mt-[55px]"

            >
              {'من كــلام الله تعــالى\nو كـلام سيــد البــشر'}
            </Text>

            {/* Text 2 — نفع الله */}
            <Text
              className="!leading-7 text-[#FFFBF1] text-center font-GESSTextMedium text-[18px] font-medium mt-[61px]"

            >
              {'نفع الله به من قرأه و أجزل المثوبة لمن\nطبعه اختاره فقيــــــر عفو الله و رحمته'}
            </Text>

            {/* Text 3 — الشيخ */}
            <Text
              className="text-[#FFFBF1] text-center font-GESSTextMedium text-[18px] font-medium mt-[58px]"

            >
              الشيـــــخ
            </Text>

            {/* Text 4 — محمد بن سليمان الجراح */}
            <Text
              className="text-[#FFFBF1] text-center font-GESSTextBold text-[25px] font-bold mt-[15px]"
              style={{

                textShadowColor: 'rgba(22, 58, 61, 0.41)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 4,
              }}
            >
              محمـد بن سليـمان الجــراح
            </Text>

            {/* Text 5 — التاريخ */}
            <Text
              className="text-[#FFFBF1] text-center font-GESSTextMedium text-[18px] font-medium mt-[27px]"

            >
              {'(١٣٢٢ هـ - ١٤١٧ هـ)\nرحمــه الله تعـــالى'}
            </Text>

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
