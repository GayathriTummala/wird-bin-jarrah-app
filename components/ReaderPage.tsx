import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';

const renderTextWithAyahMarkers = (text?: string) => {
  if (!text) return null;
  const parts = text.split(/(۝[٠-٩0-9]+)/g);

  return parts.map((part, index) => {
    if (part.startsWith('۝')) {
      const digits = part.slice(1);
      const digitCount = digits.length;
      // Scale circle size based on digit count
      const circleSize = digitCount <= 1 ? 28 : digitCount === 2 ? 32 : 40;
      const fontSize = digitCount <= 1 ? 12 : digitCount === 2 ? 11 : 10;
      return (
        <View key={index} style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: 1.5,
          borderColor: '#EAC385',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 4,
          transform: [{ translateY: 4 }]
        }}>
          <Text style={{
            color: '#255458',
            fontSize: fontSize,
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
      {/* Centering Wrapper — content centers within the cream card with a small
          bottom padding so content sits at the *optical* center (slightly above
          mathematical center), compensating for the visual weight of the
          (ثلالثاً) label + page footer that sit at the bottom. */}
      <View className="flex-1 justify-center items-center w-full pb-[30px]">

        {/* Content Text */}
        <View className="w-full items-center">
          {page.topTextAr && (
            page.id === 14 ? (
              // Figma spec: width 303px, height 70px, fontSize 20, lineHeight 99.935%, bold, color #20261E
              <View
                style={{
                  width: 303,
                  height: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                }}
              >
                <Text
                  style={{
                    color: '#20261E',
                    textAlign: 'center',
                    fontFamily: 'GESSTextBold',
                    fontSize: 20,
                    fontWeight: '700',
                    lineHeight: 35,
                    writingDirection: 'rtl',
                    fontVariant: ['no-contextual'],
                    includeFontPadding: false,
                  }}
                >
                  {"أعوذ بالله السميع العليم\nمن الشيطان الرجيم"}
                </Text>
              </View>
            ) : (
              <Text
                className="mb-6 px-10 items-center justify-center text-wird-charcoal text-[20px] leading-normal text-center font-GESSTextBold font-bold"
                style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
              >
                {page.topTextAr}
              </Text>
            )
          )}
          {page.id === 22 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 23 ? (
            <View className="w-full items-center justify-center">
              {/*
                Figma: 284×136px container.
                - Para 1 (bismillah header): 1 line = 33px with vector on top of "الرحمن"
                - Para 2 (main dua): 3 lines = 99px
                Total content height: 35 + 99 = 132px.
              */}
              <View style={{ width: 330, alignItems: 'center', justifyContent: 'center' }}>
                {/* Para 1 — bismillah with vector on top of "الرحمن" */}
                <View className="mb-5" style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Text
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                    style={{ writingDirection: 'rtl' }}
                  >
                    بسم الله{" "}
                  </Text>
                  <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('@/assets/images/page27-vector.svg')}
                      style={{ position: 'absolute', top: 9, left: 15, width: 1.5, height: 7, zIndex: 10 }}
                      contentFit="contain"
                    />
                    <Text
                      className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                      style={{ writingDirection: 'rtl' }}
                    >
                      الرحمن
                    </Text>
                  </View>
                  <Text
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {" "}الرحيم
                  </Text>
                </View>

                {/* Para 2 — main dua */}
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', marginTop: 4 }}
                >
                  {page.textAr.split('\n\n')[1]}
                </Text>
              </View>
            </View>
          ) : page.id === 24 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 25 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 26 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320,justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 27 ? (
            <View className="w-full items-center justify-center">
              {/*
                Figma: 284×253px container.
                - Lines 1-7: ~231px
                - Line 8: 1 line = 33px with vector on top of "رحمن."
                Total content: 231 + 35 = 264px.
              */}
              <View style={{ width: 320, alignItems: 'center', justifyContent: 'center' }}>
                {/* Lines 1-7 */}
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n').slice(0, 7).join('\n')}
                </Text>

                {/* Line 8 with vector on top of "رحمن." */}
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <Text
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                    style={{ writingDirection: 'rtl' }}
                  >
                    النهار، إلا طارقـًا يطرق بخير يا{" "}
                  </Text>
                  <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('@/assets/images/page27-vector.svg')}
                      style={{ position: 'absolute', top: 8, left: 18, width: 1.5, height: 6, zIndex: 10 }}
                      contentFit="contain"
                    />
                    <Text
                      className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                      style={{ writingDirection: 'rtl' }}
                    >
                      رحمن.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : page.id === 28 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 29 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 318, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 30 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 31 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 310, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {/* Inline vector on top of "أحصى" — split the flowing text and
                      render that word as an inline View (same technique as the
                      ۝ ayah markers) so natural wrapping is preserved. */}
                  {(() => {
                    const target = 'أحصى';
                    const [before, after] = page.textAr.split(target);
                    return (
                      <>
                        {before}
                        <View style={{ position: 'relative', transform: [{ translateY: 5 }] }}>
                          <Image
                            source={require('@/assets/images/page27-vector.svg')}
                            style={{ position: 'absolute', top: 1, left: 2, width: 1.5, height: 6, zIndex: 10 }}
                            contentFit="contain"
                          />
                          <Text
                            className="font-GESSTextMedium text-wird-charcoal text-[22.5px]"
                            style={{ writingDirection: 'rtl', includeFontPadding: false, lineHeight: 20 }}
                          >
                            {target}
                          </Text>
                        </View>
                        {after}
                      </>
                    );
                  })()}
                </Text>
              </View>
            </View>
          ) : page.id === 32 ? (
            <View className="w-full items-center justify-center">
              {/* marginBottom shifts the centered content upward (by mb/2),
                  leaving breathing room above the (ثلالثاً) label below. */}
              <View style={{ width: 320, marginBottom: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.id === 33 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n')[0]}
                </Text>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n').slice(1).join('\n')}
                </Text>
              </View>
            </View>
          ) : page.id === 34 ? (
            <View className="w-full items-center justify-center mb-6">
              <View style={{ width: 350, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className={`font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center ${idx === 0 ? 'mb-5' : ''}`}
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 35 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 350, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 36 ? (
            <View className="w-full items-center justify-center mb-8">
              <View style={{ width: 350, height: 411, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 37 ? (
            <View className="w-full items-center justify-center mb-8">
              <View style={{ width: 330, height: 409, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => {
                  // 4th paragraph (idx 3): overlay a damma (ُ) at a fixed position on
                  // top — not tied to any word. Adjust top/left to place it.
                  if (idx === 3) {
                    return (
                      <View key={idx} style={{ position: 'relative', width: '100%' }}>
                        <Text
                          className="font-GESSTextMedium "
                          style={{ position: 'absolute', top: -12, left: 109, fontSize: 10, lineHeight: 18, zIndex: 10, includeFontPadding: false }}
                        >
                          {'و'}
                        </Text>
                        <Text
                          className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                          style={{ writingDirection: 'rtl' }}
                        >
                          {paragraph}
                        </Text>
                      </View>
                    );
                  }
                  return (
                    <Text
                      key={idx}
                      className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                      style={{ writingDirection: 'rtl' }}
                    >
                      {paragraph}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : page.id === 38 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 330, height: 396, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('.\n').map((paragraph: string, idx: number) => (
                  <Text
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {idx === 0 ? paragraph + '.' : paragraph}
                  </Text>
                ))}
              </View>
            </View>
          ) : page.id === 39 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
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
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl' }}
                >
                  {page.textAr}
                </Text>
              </View>
            </View>
          ) : page.richTextAr ? (
            <View className="w-full items-center">
              {page.id === 40 ? (
                <View style={{ width: 330, height: 375, justifyContent: 'space-between', alignItems: 'center', marginBottom:40 }}>
                  {/* Top Paragraph Container */}
                  <View className="w-full items-center -mt-6">
                    {/* Line 1: Main text with custom underline and superscript */}
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl', marginBottom: -2 }}>
                      <Text className="font-GESSTextMedium text-wird-charcoal text-[22.5px]" style={{ lineHeight: 35, marginLeft: 4 }}>اللهم إني </Text>
                      <View className="relative">
                        <Text className="font-GESSTextBold text-[#255458] text-[22.5px]" style={{ lineHeight: 35 }}>عَبدُكَ ابنُ عَبدِكَ</Text>
                        <View style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5, backgroundColor: '#255458' }} />
                      </View>
                      <View style={{ transform: [{ translateY: -6 }], marginRight: 4 }}>
                        <Text className="font-GESSTextBold text-[#255458] text-[14px]" style={{ lineHeight: 22 }}>(١)</Text>
                      </View>
                    </View>

                    {/* Lines 2-9: Exact line breaks */}
                    <Text className="text-center font-GESSTextMedium text-wird-charcoal text-[22.5px]" style={{ writingDirection: 'rtl', lineHeight: 35 }}>
                      {renderTextWithAyahMarkers("ابنُ أمَتِك ناصيتي بيدِك ماض فيَّ حُكمُك عدل في قضاؤك، أسألك بكل اسم هو لك سمَّيتَ به نفسك أو أنزلته في كتابك، أو علمته أحداً من خَلقِك، أو استَأثرتَ به في عِلم الغيب عندَك أن تجعل القرآن العظيم\nنورَ صدري، و ربيعَ قلبي،\nو جلاء حُزني و ذهابَ همي.")}
                    </Text>
                  </View>

                  {/* Bottom Paragraph (Footnote) */}
                  <View className="w-full items-center pt-14">
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl' }}>
                      <View style={{ transform: [{ translateY: -4 }] }}>
                        <Text className="font-GESSTextBold text-[#255458] text-[14px]">(١) </Text>
                      </View>
                      <Text className="font-GESSTextMedium text-[#255458] text-[22.5px]" style={{ lineHeight: 35, marginLeft: 4 }}>وتقول المرأة: اللهم إني </Text>
                      <Text className="font-GESSTextBold text-[#255458] text-[22.5px]" style={{ lineHeight: 35 }}>أمَتُكَ</Text>
                    </View>
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl', marginTop: -4 }}>
                      <Text className="font-GESSTextBold text-[#255458] text-[22.5px]" style={{ lineHeight: 35 }}>بنت عَبدِك ابنُ أمَتِك</Text>
                      <Text className="font-GESSTextMedium text-[#255458] text-[22.5px]" style={{ lineHeight: 35 }}>.. إلى آخره.</Text>
                    </View>
                  </View>
                </View>
              ) : page.id === 13 ? (
                // ─── PAGE 13 — FIXED ────────────────────────────────────────────────────
                // Key fixes vs old implementation:
                //  1. Dropped the fragile onLayout-based underline overlay.
                //     textDecorationLine on the inline <Text> span is reliable on RN iOS/Android.
                //  2. Each of the three content blocks is a separate <Text> with explicit
                //     marginBottom so the inter-paragraph gaps match Figma exactly.
                //  3. Removed the two useState hooks (amsLayout / containerLayout) that were
                //     only used by this page — they are no longer needed anywhere.
                <View
                  style={{
                    width: 345,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 0,
                    marginTop: 16,
                  }}
                >
                  {/* ── Header: بسم الله ── */}
                  <Text
                    className="text-wird-charcoal text-[22.5px] font-GESSTextBold font-bold text-center"
                    style={{
                      writingDirection: 'rtl',
                      fontVariant: ['no-contextual'],
                      lineHeight: 31,
                      marginBottom: 8,
                      includeFontPadding: false,
                    }}
                  >
                    {page.richTextAr[0][0].text.trim()}
                  </Text>

                  {/* ── Paragraph 1 ──
                      The first line is: "أمسينا بالله الذي ليس شيء"
                      We need "أمسينا" underlined (1px line) while staying inline.
                      Strategy: split body text at first \n. Render line-1 as a
                      flex row-reverse so أمسينا (with borderBottom) sits next to
                      the first-line text. Remaining lines render as normal centred text. */}
                  {(() => {
                    const bodyText: string = page.richTextAr[1][1].text;
                    const firstNewline = bodyText.indexOf('\n');
                    // Text on same line as أمسينا, e.g. " بالله الذي ليس شيء"
                    const firstLineText = firstNewline !== -1 ? bodyText.slice(0, firstNewline) : bodyText;
                    // Remaining wrapped lines
                    const restText = firstNewline !== -1 ? bodyText.slice(firstNewline + 1) : '';

                    return (
                      <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
                        {/* Line 1: row-reverse keeps RTL order — أمسينا on right, rest of line on left */}
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'flex-end', justifyContent: 'center' }}>
                          {/* "أمسينا" with exact underline */}
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: '#255458',
                              paddingBottom: 1,
                            }}
                          >
                            <Text
                              className={page.richTextAr[1][0].className}
                              style={{
                                color: '#255458',
                                fontSize: 22.5,
                                lineHeight: 31,
                                includeFontPadding: false,
                                fontVariant: ['no-contextual'],
                              }}
                            >
                              {page.richTextAr[1][0].text}
                            </Text>
                          </View>
                          {/* Rest of first line — no underline */}
                          <Text
                            className={page.richTextAr[1][1].className}
                            style={{
                              ...page.richTextAr[1][1].style,
                              fontSize: 22.5,
                              lineHeight: 31,
                              includeFontPadding: false,
                              fontVariant: ['no-contextual'],
                            }}
                          >
                            {firstLineText}
                          </Text>
                        </View>

                        {/* Remaining wrapped lines */}
                        {restText ? (
                          <Text
                            className="text-center"
                            style={{
                              writingDirection: 'rtl',
                              fontVariant: ['no-contextual'],
                              lineHeight: 31,
                              includeFontPadding: false,
                            }}
                          >
                            <Text
                              className={page.richTextAr[1][1].className}
                              style={{
                                ...page.richTextAr[1][1].style,
                                includeFontPadding: false,
                              }}
                            >
                              {renderTextWithAyahMarkers(restText)}
                            </Text>
                          </Text>
                        ) : null}
                      </View>
                    );
                  })()}

                  {/* ── Paragraph 2: أعوذ بالله... with vector on top of "وفـَّى" ── */}
                  {(() => {
                    const p2 = page.richTextAr[2][0];
                    const lines: string[] = p2.text.split('\n');
                    // lines[0]: "أعوذ بالله مما استعاذ منه موسى و"
                    // lines[1]: "عيسى و إبراهيم الذي وفـَّى من شر ما"  ← vector on "وفـَّى"
                    // lines[2]: "خلق و ذرأ و برأ و من شر إبليس و"
                    // lines[3]: "جنوده ومن شر ما يتقى"
                    // Split line 2 around the target word so we can overlay the vector.
                    const words = lines[1].split(' ');
                    const wIdx = words.findIndex((w) => w.includes('وف') && w.includes('ى'));
                    const beforeWord = words.slice(0, wIdx).join(' ') + ' ';
                    const targetWord = words[wIdx];
                    const afterWord = ' ' + words.slice(wIdx + 1).join(' ');

                    // Split line 4 around its last word "يتقى" for a second vector.
                    const words4 = lines[3].split(' ');
                    const targetWord4 = words4[words4.length - 1]; // "يتقى"
                    const beforeWord4 = words4.slice(0, -1).join(' ') + ' ';

                    const lineStyle: any = {
                      writingDirection: 'rtl',
                      fontVariant: ['no-contextual'],
                      lineHeight: 31,
                      includeFontPadding: false,
                    };

                    return (
                      <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
                        {/* Line 1 */}
                        <Text className={`${p2.className} text-center`} style={lineStyle}>
                          {lines[0]}
                        </Text>

                        {/* Line 2 — vector on top of "وفـَّى" */}
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          <Text className={p2.className} style={lineStyle}>{beforeWord}</Text>
                          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                              source={require('@/assets/images/page27-vector.svg')}
                              style={{ position: 'absolute', top: 6, left: 3, width: 1.5, height: 6, zIndex: 10 }}
                              contentFit="contain"
                            />
                            <Text className={p2.className} style={lineStyle}>{targetWord}</Text>
                          </View>
                          <Text className={p2.className} style={lineStyle}>{afterWord}</Text>
                        </View>

                        {/* Line 3 */}
                        <Text className={`${p2.className} text-center`} style={lineStyle}>
                          {lines[2]}
                        </Text>

                        {/* Line 4 — vector on top of "يتقى" */}
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          <Text className={p2.className} style={lineStyle}>{beforeWord4}</Text>
                          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                              source={require('@/assets/images/page27-vector.svg')}
                              style={{ position: 'absolute', top: 6, left: 3, width: 1.5, height: 6, zIndex: 10 }}
                              contentFit="contain"
                            />
                            <Text className={p2.className} style={lineStyle}>{targetWord4}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })()}

                  {/* ── Footnote: (في الصباح يقال أصبحنا) ── */}
                  <Text
                    className="text-center"
                    style={{
                      writingDirection: 'rtl',
                      lineHeight: 33,
                      includeFontPadding: false,
                    }}
                  >
                    {page.richTextAr[3].map((span: any, sIdx: number) => (
                      <Text
                        key={`fn-${sIdx}`}
                        className={span.className}
                        style={span.style}
                      >
                        {span.text}
                      </Text>
                    ))}
                  </Text>
                </View>
                // ─── END PAGE 13 ─────────────────────────────────────────────────────────
              ) : page.id === 3 ? (
                // Page 2: Al-Baqarah 1-5 — Bold Bismillah line + ayah text with numbered circle markers
                <View style={{ width: 303, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                  {page.richTextAr.map((paragraph: any[], pIdx: number) => (
                    <Text
                      key={pIdx}
                      className="text-center"
                      style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                    >
                      {paragraph.map((span: any, sIdx: number) => (
                        <Text key={sIdx} className={span.className} style={span.style}>
                          {span.hasAyahMarkers
                            ? renderTextWithAyahMarkers(span.text)
                            : span.text}
                        </Text>
                      ))}
                    </Text>
                  ))}
                </View>
              ) : page.id === 6 ? (
                // Page 5: Al-Baqarah 285 — Quran text starting with ﴿ and numbered circle marker ۝٢٨٥
                <View style={{ width: 303, justifyContent: 'center', alignItems: 'center' }}>
                  {page.richTextAr.map((paragraph: any[], pIdx: number) => (
                    <Text
                      key={pIdx}
                      className="text-center"
                      style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                    >
                      {paragraph.map((span: any, sIdx: number) => (
                        <Text key={sIdx} className={span.className} style={span.style}>
                          {span.hasAyahMarkers
                            ? renderTextWithAyahMarkers(span.text)
                            : span.text}
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
                              page.id === 1 ? 400 :
                                page.id === 2 ? 400 : // scaled up from 446
                                  page.id === 3 ? 450 :
                                    page.id === 4 ? 400 :
                                      page.id === 5 ? 400 : // scaled up from 394
                                        page.id === 6 ? 400 :
                                          page.id === 8 ? 400 :
                                            page.id === 9 ? 400 :
                                              page.id === 10 ? 400 :
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
              className="text-wird-charcoal text-[20px] leading-[35px] text-center font-GESSTextMedium"
              style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
            >
              {renderTextWithAyahMarkers(page.textAr)}
            </Text>
          )}
        </View>
      </View>

      {/* Bottom block — labels + page footer anchored to bottom of cream card
          so they don't affect the content's vertical centering above. */}
      <View className="absolute bottom-0 left-[26px] right-[26px]">
        {/* Title and Repeat labels */}
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
      </View>
    </View >
  );
}