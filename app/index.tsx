import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Pause, Play, RotateCcw, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Only add padding for Android devices with traditional software buttons (typically >20dp)
  const bottomPadding = Platform.OS === 'android' && insets.bottom > 20 ? insets.bottom : 0;

  const [showAudio, setShowAudio] = useState(false);

  const audioSource = useMemo(() => require('../assets/audio/completedua.mp3'), []);

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

  return (
    <View className="flex-1 bg-[#255458]">

      {/* Main Content Area */}
      <View className="flex-1 pt-[100px]">
        {/* Double Border Container */}
        <View
          style={{
            flex: 1,
            marginHorizontal: 39,
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
            paddingVertical: 89,
          }}>

            {/* Vector Image */}
            <View style={{ alignItems: 'center' }}>
              <View style={{
                shadowColor: '#163A3D',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 6,
              }}>
                <View style={{
                  shadowColor: 'rgba(233, 253, 255, 0.28)',
                  shadowOffset: { width: 0, height: -1 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                }}>
                  <View style={{
                    shadowColor: 'rgba(22, 58, 61, 0.41)',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                  }}>
                    <Image
                      source={require('@/assets/images/landing.svg')}
                      style={{ width: 230, height: 91 }}
                      contentFit="contain"
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Text 1 — من كلام الله */}
            <Text
              className="text-center mt-[55px] font-GESSTextMedium"
              style={{
                color: '#FFFBF1',
                fontSize: 25,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 30,
                textAlign: 'center',
                fontFeatureSettings: "'liga' off, 'clig' off",
              }}
            >
              {'من كــلام الله تعــالى\nو كـلام سيــد البــشر'}
            </Text>

            {/* Text 2 — نفع الله */}
            <Text
              className="text-center mt-[36px]"
              style={{
                color: '#FFFBF1',
                fontFamily: 'GE SS',
                fontSize: 18,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 26,
                textAlign: 'center',
                fontFeatureSettings: "'liga' off, 'clig' off",
              }}
            >
              {'نفع الله به من قرأه و أجزل المثوبة لمن\nطبعه اختاره فقيــــــر عفو الله و رحمته'}
            </Text>

            {/* Text 3 — الشيخ */}
            <Text
              className="text-center mt-[44px]"
              style={{
                color: '#FFFBF1',
                fontFamily: 'GE SS',
                fontSize: 18,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 24,
                textAlign: 'center',
                fontFeatureSettings: "'liga' off, 'clig' off",
              }}
            >
              {'الشيـــــخ'}
            </Text>

            {/* Text 4 — محمد بن سليمان الجراح */}
            <View style={{
              marginTop: 20,
              width: 336,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                width: '100%',
                shadowColor: '#163A3D',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 4,
              }}>
                <View style={{
                  width: '100%',
                  shadowColor: 'rgba(233, 253, 255, 0.28)',
                  shadowOffset: { width: 0, height: -2 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                }}>
                  <View style={{
                    width: '100%',
                    shadowColor: 'rgba(22, 58, 61, 0.41)',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 1,
                    shadowRadius: 4,
                  }}>
                    <Text
                      style={{
                        width: 336,
                        color: '#FFFBF1',
                        fontFamily: 'GE SS',
                        fontSize: 25,
                        fontWeight: '700',
                        fontStyle: 'normal',
                        lineHeight: 24.979,
                        textAlign: 'center',
                        fontFeatureSettings: "'liga' off, 'clig' off",
                        textShadowColor: 'rgba(22, 58, 61, 0.41)',
                        textShadowOffset: { width: 0, height: 4 },
                        textShadowRadius: 4,
                      }}
                    >
                      {'محمـد بن سليـمان الجــراح'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Text 5 — التاريخ */}
            <Text
              className="text-center mt-[24px]"
              style={{
                width: 336,
                color: '#FFFBF1',
                fontFamily: 'GE SS',
                fontSize: 18,
                fontWeight: '500',
                fontStyle: 'normal',
                lineHeight: 24,
                textAlign: 'center',
                fontFeatureSettings: "'liga' off, 'clig' off",
              }}
            >
              {'(١٣٢٢ هـ - ١٤١٧ هـ)\nرحمــه الله تعـــالى'}
            </Text>

          </View>
        </View>

        {/* Bottom Bar Section - full width, SVG icons */}
        <View
          className="bg-[#44797D] justify-around items-center"
          style={{
            flexDirection: 'row-reverse',
            height: 108 + bottomPadding,
            paddingBottom: bottomPadding
          }}
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
