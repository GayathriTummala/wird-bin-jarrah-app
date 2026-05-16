import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

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
          {page.id === 22 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 99, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 23 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 136, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 24 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 169, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 25 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 66, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 26 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 99, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 27 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 253, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 28 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 132, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 29 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 165, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 30 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 264, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 31 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 384, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 32 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 484, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 33 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 468, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center mb-5"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n')[0]}
                </Text>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n').slice(1).join('\n')}
                </Text>
              </View>
            </View>
          ) : page.id === 34 ? (
            <View className="w-full items-center justify-center mb-6">
              <View style={{ width: 303, height: 499, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className={`font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center ${idx === 0 ? 'mb-5' : ''}`}
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 35 ? (
            <View className="w-full items-center justify-center mb-6">
              <View style={{ width: 303, height: 494, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center mb-5"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 36 ? (
            <View className="w-full items-center justify-center mb-8">
              <View style={{ width: 303, height: 411, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center mb-5"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 37 ? (
            <View className="w-full items-center justify-center mb-8">
              <View style={{ width: 303, height: 409, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center mb-5"

                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 38 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 396, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('.\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {idx === 0 ? paragraph + '.' : paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 39 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 284, height: 255, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl' }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 41 ? (
            <View className="w-full items-center justify-center">
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[20px] leading-[33px] text-center"
                  style={{ writingDirection: 'rtl' }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.richTextAr ? (
            <View className="w-full items-center">
              {page.id === 40 ? (
                <View style={{ width: 284, height: 344, justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Top Paragraph Container */}
                  <View className="w-full items-center">
                    {/* Line 1: Main text with custom underline and superscript */}
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl', marginBottom: -2 }}>
                      <Text className="font-GESSTextMedium text-wird-charcoal text-[20px]" style={{ lineHeight: 27, marginLeft: 4 }}>اللهم إني </Text>
                      <View className="relative">
                        <Text className="font-GESSTextBold text-[#255458] text-[20px]" style={{ lineHeight: 27 }}>عَبدُكَ ابنُ عَبدِكَ</Text>
                        <View style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5, backgroundColor: '#255458' }} />
                      </View>
                      <View style={{ transform: [{ translateY: -6 }], marginRight: 4 }}>
                        <Text className="font-GESSTextBold text-[#255458] text-[14px]" style={{ lineHeight: 20 }}>(١)</Text>
                      </View>
                    </View>

                    {/* Lines 2-9: Exact line breaks */}
                    <Text className="text-center font-GESSTextMedium text-wird-charcoal text-[20px]" style={{ writingDirection: 'rtl', lineHeight: 27 }}>
                      {renderTextWithAyahMarkers("ابنُ أمَتِك ناصيتي بيدِك ماض فيَّ\nحُكمُك عدل في قضاؤك، أسألك بكل\nاسم هو لك سمَّيتَ به نفسك أو\nأنزلته في كتابك، أو علمته أحداً من\nخَلقِك، أو استَأثرتَ به في عِلم الغيب\nعندَك أن تجعل القرآن العظيم\nنورَ صدري، و ربيعَ قلبي،\nو جلاء حُزني و ذهابَ همي.")}
                    </Text>
                  </View>

                  {/* Bottom Paragraph (Footnote) */}
                  <View className="w-full items-center">
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl' }}>
                      <View style={{ transform: [{ translateY: -4 }] }}>
                        <Text className="font-GESSTextBold text-[#255458] text-[14px]">(١) </Text>
                      </View>
                      <Text className="font-GESSTextMedium text-[#255458] text-[20px]" style={{ lineHeight: 27, marginLeft: 4 }}>وتقول المرأة: اللهم إني </Text>
                      <Text className="font-GESSTextBold text-[#255458] text-[20px]" style={{ lineHeight: 27 }}>أمَتُكَ</Text>
                    </View>
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl', marginTop: -4 }}>
                      <Text className="font-GESSTextBold text-[#255458] text-[20px]" style={{ lineHeight: 27 }}>بنت عَبدِك ابنُ أمَتِك</Text>
                      <Text className="font-GESSTextMedium text-[#255458] text-[20px]" style={{ lineHeight: 27 }}>.. إلى آخره.</Text>
                    </View>
                  </View>
                </View>
              ) : page.id === 13 ? (
                <View style={{ width: 303, height: 524, justifyContent: 'space-between', alignItems: 'center' }}>
                  {page.richTextAr.map((paragraph: any[], pIdx: number) => (
                    <Text key={pIdx} className="text-center" style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}>
                      {paragraph.map((span: any, sIdx: number) => (
                        <Text key={sIdx} className={span.className} style={span.style}>
                          {renderTextWithAyahMarkers(span.text)}
                        </Text>
                      ))}
                    </Text>
                  ))}
                </View>
              ) : (
                page.richTextAr.map((paragraph: any[], pIdx: number) => (
                  <Text key={pIdx} className="text-center mb-4" style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}>
                    {paragraph.map((span: any, sIdx: number) => (
                      <Text key={sIdx} className={span.className} style={span.style}>
                        {renderTextWithAyahMarkers(span.text)}
                      </Text>
                    ))}
                  </Text>
                ))
              )}
            </View>
          ) : page.imageSource ? (
            <View className="w-full items-center justify-center">
              <Image
                source={page.imageSource}
                style={{
                  width: page.id === 7 ? 256 :
                         page.id === 14 ? 282 :
                         page.id === 16 ? 256 :
                         page.id === 19 ? 312 :
                         page.id === 20 ? 302 :
                         page.id === 21 ? 295 :
                         page.id === 1 ? 300 :
                         page.id === 2 ? 331 : // scaled up from 301
                         page.id === 3 ? 299 :
                         page.id === 4 ? 305 :
                         page.id === 5 ? 335 : // scaled up from 305
                         page.id === 6 ? 298 :
                         page.id === 8 ? 303 :
                         page.id === 9 ? 304 :
                         page.id === 10 ? 310 :
                         page.id === 11 ? 310 :
                         page.id === 12 ? 306 :
                         page.id === 15 ? 299 :
                         page.id === 17 ? 306 :
                         page.id === 18 ? 309 : 300,
                  height: page.id === 7 ? 195 :
                          page.id === 14 ? 400 :
                          page.id === 16 ? 196 :
                          page.id === 19 ? 193 :
                          page.id === 20 ? 247 :
                          page.id === 21 ? 294 :
                          page.id === 1 ? 402 :
                          page.id === 2 ? 490 : // scaled up from 446
                          page.id === 3 ? 94 :
                          page.id === 4 ? 398 :
                          page.id === 5 ? 433 : // scaled up from 394
                          page.id === 6 ? 241 :
                          page.id === 8 ? 393 :
                          page.id === 9 ? 145 :
                          page.id === 10 ? 95 :
                          page.id === 11 ? 393 :
                          page.id === 12 ? 287 :
                          page.id === 15 ? 444 :
                          page.id === 17 ? 445 :
                          page.id === 18 ? 193 : 300,
                }}
                contentFit="contain"
              />
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
      {
        (page.titleAr || page.repeatAr || page.richTitleAr) ? (
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
        ) : null
      }

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
    </View >
  );
}
