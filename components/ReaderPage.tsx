import { Image } from 'expo-image';
import React from 'react';
import { Image as RNImage, Text, View } from 'react-native';

const renderTextWithAyahMarkers = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(۝[٠-٩0-9]+)/g);

  return parts.map((part, index) => {
    if (part.startsWith('۝')) {
      const digits = part.slice(1);
      return (
        <View key={index} style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: '#EAC385',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 6,
          transform: [{ translateY: 4 }]
        }}>
          <Text style={{
            color: '#255458',
            fontSize: 12,
            fontFamily: 'GESSTextMedium',
            includeFontPadding: false,
            textAlignVertical: 'center'
          }}>
            {digits}
          </Text>
        </View>
      );
    }
    return <Text key={index}>{part}</Text>;
  });
};

export default function ReaderPage({ page, index, totalPages }: { page: any, index: number, totalPages: number }) {
  return (
    <View className="flex-1 px-[26px]">
      {/* Centering Wrapper to vertically align content and labels together */}
      <View className="flex-1 justify-center items-center w-full pt-10">

        {/* Content Text */}
        <View className="w-full items-center">
          {page.topTextAr && (
            <Text
              className="mb-6 px-10 items-center justify-center text-wird-charcoal text-[20px] leading-normal text-center font-GESSTextBold font-bold"
              style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
            >
              {page.topTextAr}
            </Text>
          )}
          {page.imageSource ? (
            <View className="w-full items-center justify-center relative">
              <Image
                source={page.imageSource}
                style={{
                  width: '100%',
                  aspectRatio: (RNImage.resolveAssetSource(page.imageSource)?.width || 300) / (RNImage.resolveAssetSource(page.imageSource)?.height || 402)
                }}
                contentFit="contain"
              />
              {page.bottomTextAr && (
                <Text
                  className="text-wird-charcoal text-[20px] font-GESSTextMedium absolute bottom-0 left-0"
                  style={{ writingDirection: 'rtl' }}
                >
                  {page.bottomTextAr}
                </Text>
              )}
            </View>
          ) : page.id === 40 ? (
            <View className="w-full items-center">
              {/* First line custom layout (Flex-row prevents overlap and allows exact line placement) */}
              <View className="flex-row justify-center items-center w-full mb-[2px]" style={{ direction: 'rtl' }}>
                <Text className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px]">اللهم إني </Text>
                <View className="items-center justify-center relative">
                  <Text className="font-GESSTextBold text-[#255458] text-[20px] leading-[33px]">عَبدُكَ ابنُ عَبدِكَ</Text>
                  {/* Explicit 138px line placed securely BELOW the text */}
                  <View style={{ width: 140, height: 1, backgroundColor: '#255458', marginTop: 1 }} />
                </View>
                <View className="justify-start self-start" style={{ marginTop: -2, marginRight: -6 }}>
                  <Text className="font-GESSTextBold text-[#255458] text-[14px] leading-[20px]">(١)</Text>
                </View>
              </View>

              {/* Rest of paragraph 1 */}
              <Text className="text-center mb-4 font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px]" style={{ writingDirection: 'rtl' }}>
                {renderTextWithAyahMarkers("ابنُ أمَتِك ناصيتي بيدِك ماض فيَّ حُكمُك عدل في قضاؤك، أسألك بكل اسم هو لك سمَّيتَ به نفسك أو أنزلته في كتابك، أو علمته أحداً من خَلقِك، أو استَأثرتَ به في عِلم الغيب عندَك أن تجعل القرآن العظيم\nنورَ صدري، و ربيعَ قلبي،\nو جلاء حُزني و ذهابَ همي.")}
              </Text>

              {/* Footnote with proper side-by-side superscript */}
              <View className="flex-row w-full justify-center items-start mt-2 px-[10px]" style={{ direction: 'rtl' }}>
                <Text className="font-GESSTextMedium text-[#255458] text-[14px] leading-[20px]" style={{ marginTop: 0 }}>(١) </Text>
                <Text className="font-GESSTextMedium text-[#255458] text-[20px] leading-[33px] text-center" style={{ flexShrink: 1, writingDirection: 'rtl' }}>
                  وتقول المرأة: اللهم إني أمَتُكَ بنت عَبدِك ابنُ أمَتِك.. إلى آخره.
                </Text>
              </View>
            </View>
          ) : page.richTextAr ? (
            <View className="w-full items-center">
              {page.richTextAr.map((paragraph: any[], pIdx: number) => (
                <Text key={pIdx} className="text-center mb-4" style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}>
                  {paragraph.map((span: any, sIdx: number) => (
                    <Text key={sIdx} className={span.className} style={span.style}>
                      {renderTextWithAyahMarkers(span.text)}
                    </Text>
                  ))}
                </Text>
              ))}
            </View>
          ) : (
            <Text
              className="text-wird-charcoal text-[20px] leading-[33px] text-center font-GESSTextMedium"
              style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
            >
              {renderTextWithAyahMarkers(page.textAr)}
            </Text>
          )}
        </View>
      </View>

      {/* Title and Repeat labels positioned exactly 25px below the text/image */}
      {(page.titleAr || page.repeatAr || page.richTitleAr) ? (
        <View className="flex-row w-full mt-[10px] mb-[30px] items-center">
          {page.richTitleAr ? (
            <Text className="text-center flex-1" style={{ writingDirection: 'rtl' }}>
              {page.richTitleAr.map((span: any, idx: number) => (
                <Text key={idx} className={span.className}>
                  {span.text}
                </Text>
              ))}
            </Text>
          ) : page.titleAr && page.repeatAr ? (
            <>
              <Text className="text-wird-teal text-[20px] leading-[29px] font-GESSTextMedium text-left flex-1 font-medium">
                {page.titleAr}
              </Text>
              <Text className="text-wird-dark-teal text-[20px] leading-[29px] font-GESSTextBold text-right flex-1 font-bold">
                {page.repeatAr}
              </Text>
            </>
          ) : page.repeatAr ? (
            <Text className="text-wird-dark-teal text-[20px] leading-[29px] font-GESSTextBold text-right flex-1 font-bold">
              {page.repeatAr}
            </Text>
          ) : (
            <Text className="text-wird-teal text-[20px] leading-[29px] font-GESSTextMedium text-left flex-1 font-medium">
              {page.titleAr}
            </Text>
          )}
        </View>
      ) : null}

      {/* Card Footer (Page number & Hand icon) */}
      <View className="w-full flex-row items-center mb-[20px] relative">
        {/* Hand Icon (mirrored for RTL) */}
        {index !== totalPages - 1 && (
          <View className="absolute left-0">
            <Image
              source={require('@/assets/images/swipe-right.svg')}
              style={{ width: 30, height: 27 }}
              contentFit="contain"
            />
          </View>
        )}

        {/* Centered Page Text */}
        <View className="flex-1 items-center">
          <Text
            className="text-wird-charcoal font-medium text-sm"
            style={{ textAlign: 'center' }}
          >
            <Text className='font-GESSTextMedium' >صفحة </Text>
            <Text style={{ fontFamily: 'Inter' }}>{index + 1}</Text>
            <Text className='font-GESSTextMedium'> من </Text>
            <Text style={{ fontFamily: 'Inter' }}>{totalPages}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
