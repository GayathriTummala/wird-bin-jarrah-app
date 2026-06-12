import FitToCard from '@/components/FitToCard';
import ScaledText from '@/components/ScaledText';
import { useFontScale } from '@/contexts/FontScaleContext';
import { Image } from 'expo-image';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    return <ScaledText key={index}>{part}</ScaledText>;
  });
};

export default function ReaderPage({ page, index, totalPages }: { page: any, index: number, totalPages: number }) {
  const { increase, decrease, canIncrease, canDecrease } = useFontScale();
  return (
    <View className="flex-1">
      {/* Centering Wrapper — content centers within the cream card with a small
          bottom padding so content sits at the *optical* center (slightly above
          mathematical center), compensating for the visual weight of the
          (ثلالثاً) label + page footer that sit at the bottom. */}
      <FitToCard disabled={!!page.imageSource} maxScale={page.id === 13 ? 1.15 : 1} pad={page.id === 13 ? 4 : 14} offsetTop={(page.id === 22 || page.id === 23) ? 30 : page.id === 32 ? 20 : page.id === 40 ? 60 :(page.id === 34 || page.id === 35 || page.id === 38 || page.id === 39) ? 10 : (page.id >= 24 && page.id <= 31) ? 40 : 0}>
        {/* Content Text — sized to its natural content so FitToCard can scale it */}
        <View className="items-center">
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
                <ScaledText
                  style={{
                    color: '#20261E',
                    textAlign: 'center',
                    fontFamily: 'GESSTextBold',
                    fontSize: 22.5,
                    fontWeight: '700',
                    lineHeight: 35,
                    writingDirection: 'rtl',
                    fontVariant: ['no-contextual'],
                    includeFontPadding: false,
                  }}
                >
                  {"أعوذ بالله السميع العليم\nمن الشيطان الرجيم"}
                </ScaledText>
              </View>
            ) : (
              <ScaledText
                className="mb-6 px-10 items-center justify-center text-wird-charcoal text-[22.5px] leading-normal text-center font-GESSTextBold font-bold"
                style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
              >
                {page.topTextAr}
              </ScaledText>
            )
          )}
          {page.id === 22 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </ScaledText>
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
              <View style={{ width: 320, alignItems: 'center', justifyContent: 'center' }}>
                {/* Para 1 — bismillah with vector on top of "الرحمن" */}
                <View className="mb-5" style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <ScaledText
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                    style={{ writingDirection: 'rtl' }}
                  >
                    بسم الله{" "}
                  </ScaledText>
                  <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('@/assets/images/page27-vector.svg')}
                      style={{ position: 'absolute', top: 9, left: 15, width: 1.5, height: 7, zIndex: 10 }}
                      contentFit="contain"
                    />
                    <ScaledText
                      className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                      style={{ writingDirection: 'rtl' }}
                    >
                      الرحمن
                    </ScaledText>
                  </View>
                  <ScaledText
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {" "}الرحيم
                  </ScaledText>
                </View>

                {/* Para 2 — main dua */}
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', marginTop: 4 }}
                >
                  {page.textAr.split('\n\n')[1]}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 24 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <ScaledText
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </ScaledText>
                ))}
              </View>
            </View>
          ) : page.id === 25 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 310, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 26 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 310,justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </ScaledText>
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
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n').slice(0, 7).join('\n')}
                </ScaledText>

                {/* Line 8 with vector on top of "رحمن." */}
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <ScaledText
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                    style={{ writingDirection: 'rtl' }}
                  >
                    النهار، إلا طارقـًا يطرق بخير يا{" "}
                  </ScaledText>
                  <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      source={require('@/assets/images/page27-vector.svg')}
                      style={{ position: 'absolute', top: 8, left: 18, width: 1.5, height: 6, zIndex: 10 }}
                      contentFit="contain"
                    />
                    <ScaledText
                      className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px]"
                      style={{ writingDirection: 'rtl' }}
                    >
                      رحمن.
                    </ScaledText>
                  </View>
                </View>
              </View>
            </View>
          ) : page.id === 28 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 29 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 318, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 30 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 31 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 310, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
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
                          <ScaledText
                            className="font-GESSTextMedium text-wird-charcoal text-[22.5px]"
                            style={{ writingDirection: 'rtl', includeFontPadding: false, lineHeight: 20 }}
                          >
                            {target}
                          </ScaledText>
                        </View>
                        {after}
                      </>
                    );
                  })()}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 32 ? (
            <View style={{ width: 320, alignItems: 'center' }}>
              <ScaledText
                className="font-GESSTextMedium text-wird-charcoal text-[22.5px] text-center"
                style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'], lineHeight: 30 }}
              >
                {page.textAr}
              </ScaledText>
            </View>
          ) : page.id === 33 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 320, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n')[0]}
                </ScaledText>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                >
                  {page.textAr.split('\n').slice(1).join('\n')}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 34 ? (
            <View className="w-full items-center justify-center mb-6">
              <View style={{ width: 350, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <ScaledText
                    key={idx}
                    className={`font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center ${idx === 0 ? 'mb-5' : ''}`}
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </ScaledText>
                ))}
              </View>
            </View>
          ) : page.id === 35 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 350, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <ScaledText
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </ScaledText>
                ))}
              </View>
            </View>
          ) : page.id === 36 ? (
            <View className="w-full items-center justify-center mb-8">
              <View style={{ width: 350, height: 411, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('\n\n').map((paragraph: string, idx: number) => (
                  <ScaledText
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {paragraph}
                  </ScaledText>
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
                        <ScaledText
                          className="font-GESSTextMedium "
                          style={{ position: 'absolute', top: -12, left: 109, fontSize: 10, lineHeight: 18, zIndex: 10, includeFontPadding: false }}
                        >
                          {'و'}
                        </ScaledText>
                        <ScaledText
                          className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                          style={{ writingDirection: 'rtl' }}
                        >
                          {paragraph}
                        </ScaledText>
                      </View>
                    );
                  }
                  return (
                    <ScaledText
                      key={idx}
                      className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center mb-5"
                      style={{ writingDirection: 'rtl' }}
                    >
                      {paragraph}
                    </ScaledText>
                  );
                })}
              </View>
            </View>
          ) : page.id === 38 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 330, height: 396, justifyContent: 'space-between', alignItems: 'center' }}>
                {page.textAr.split('.\n').map((paragraph: string, idx: number) => (
                  <ScaledText
                    key={idx}
                    className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                    style={{ writingDirection: 'rtl' }}
                  >
                    {idx === 0 ? paragraph + '.' : paragraph}
                  </ScaledText>
                ))}
              </View>
            </View>
          ) : page.id === 39 ? (
            <View className="w-full items-center justify-center">
              <View style={{ width: 330, justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl' }}
                >
                  {page.textAr}
                </ScaledText>
              </View>
            </View>
          ) : page.id === 41 ? (
            <View className="w-full items-center justify-center">
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ScaledText
                  className="font-GESSTextMedium text-wird-charcoal text-[22.5px] leading-[35px] text-center"
                  style={{ writingDirection: 'rtl' }}
                >
                  {page.textAr}
                </ScaledText>
              </View>
            </View>
          ) : page.richTextAr ? (
            <View className="w-full items-center">
              {page.id === 40 ? (
                <View style={{ width: 330, height: 375, justifyContent: 'space-between', alignItems: 'center', marginBottom:40 }}>
                  {/* Top Paragraph Container */}
                  <View className="w-full items-center">
                    {/* Line 1: Main text with custom underline and superscript */}
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl', marginBottom: -2 }}>
                      <ScaledText className="font-GESSTextMedium text-wird-charcoal text-[22.5px]" style={{ lineHeight: 35, marginLeft: 4 }}>اللهم إني </ScaledText>
                      <View className="relative">
                        <ScaledText className="font-GESSTextBold text-[#255458] text-[22.5px]" style={{ lineHeight: 33 }}>عَبدُكَ ابنُ عَبدِكَ</ScaledText>
                        <View style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1.5, backgroundColor: '#255458' }} />
                      </View>
                      <View style={{ transform: [{ translateY: -6 }], marginRight: 4 }}>
                        <ScaledText className="font-GESSTextBold text-[#255458] text-[14px]" style={{ lineHeight: 22 }}>(١)</ScaledText>
                      </View>
                    </View>

                    {/* Lines 2-9: Exact line breaks */}
                    <ScaledText className="text-center font-GESSTextMedium text-wird-charcoal text-[22.5px]" style={{ writingDirection: 'rtl', lineHeight: 33 }}>
                      {renderTextWithAyahMarkers("ابنُ أمَتِك ناصيتي بيدِك ماض فيَّ حُكمُك عدل في قضاؤك، أسألك بكل اسم هو لك سمَّيتَ به نفسك أو أنزلته في كتابك، أو علمته أحداً من خَلقِك، أو استَأثرتَ به في عِلم الغيب عندَك أن تجعل القرآن العظيم\nنورَ صدري، و ربيعَ قلبي،\nو جلاء حُزني و ذهابَ همي.")}
                    </ScaledText>
                  </View>

                  {/* Bottom Paragraph (Footnote) */}
                  <View className="w-full items-center pt-20">
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl' }}>
                      <View style={{ transform: [{ translateY: -4 }] }}>
                        <ScaledText className="font-GESSTextBold text-[#255458] text-[14px]">(١) </ScaledText>
                      </View>
                      <ScaledText className="font-GESSTextMedium text-[#255458] text-[22.5px]" style={{ lineHeight: 35, marginLeft: 4 }}>وتقول المرأة: اللهم إني </ScaledText>
                      <ScaledText className="font-GESSTextBold text-[#255458] text-[22.5px]" style={{ lineHeight: 33 }}>أمَتُكَ</ScaledText>
                    </View>
                    <View className="flex-row justify-center items-center w-full" style={{ direction: 'rtl', marginTop: -4 }}>
                      <ScaledText className="font-GESSTextBold text-[#255458] text-[22.5px]" style={{ lineHeight: 33 }}>بنت عَبدِك ابنُ أمَتِك</ScaledText>
                      <ScaledText className="font-GESSTextMedium text-[#255458] text-[22.5px]" style={{ lineHeight: 33 }}>.. إلى آخره.</ScaledText>
                    </View>
                  </View>
                </View>
              ) : page.id === 13 ? (
                // ─── PAGE 13 — FIXED ────────────────────────────────────────────────────
                // Key fixes vs old implementation:
                //  1. Dropped the fragile onLayout-based underline overlay.
                //     textDecorationLine on the inline <ScaledText> span is reliable on RN iOS/Android.
                //  2. Each of the three content blocks is a separate <ScaledText> with explicit
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
                  <ScaledText
                    className="text-wird-charcoal text-[22.5px] font-GESSTextBold font-bold text-center"
                    style={{
                      writingDirection: 'rtl',
                      fontVariant: ['no-contextual'],
                      lineHeight: 35,
                      marginBottom: 8,
                      includeFontPadding: false,
                    }}
                  >
                    {page.richTextAr[0][0].text.trim()}
                  </ScaledText>

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
                            <ScaledText
                              className={page.richTextAr[1][0].className}
                              style={{
                                color: '#255458',
                                fontSize: 22.5,
                                lineHeight: 35,
                                includeFontPadding: false,
                                fontVariant: ['no-contextual'],
                              }}
                            >
                              {page.richTextAr[1][0].text}
                            </ScaledText>
                          </View>
                          {/* Rest of first line — no underline */}
                          <ScaledText
                            className={page.richTextAr[1][1].className}
                            style={{
                              ...page.richTextAr[1][1].style,
                              fontSize: 22.5,
                              lineHeight: 35,
                              includeFontPadding: false,
                              fontVariant: ['no-contextual'],
                            }}
                          >
                            {firstLineText}
                          </ScaledText>
                        </View>

                        {/* Remaining wrapped lines */}
                        {restText ? (
                          <ScaledText
                            className="text-center"
                            style={{
                              writingDirection: 'rtl',
                              fontVariant: ['no-contextual'],
                              lineHeight: 35,
                              includeFontPadding: false,
                            }}
                          >
                            <ScaledText
                              className={page.richTextAr[1][1].className}
                              style={{
                                ...page.richTextAr[1][1].style,
                                includeFontPadding: false,
                              }}
                            >
                              {renderTextWithAyahMarkers(restText)}
                            </ScaledText>
                          </ScaledText>
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
                      lineHeight: 35,
                      includeFontPadding: false,
                    };

                    return (
                      <View style={{ width: '100%', alignItems: 'center', marginBottom: 10 }}>
                        {/* Line 1 */}
                        <ScaledText className={`${p2.className} text-center`} style={lineStyle}>
                          {lines[0]}
                        </ScaledText>

                        {/* Line 2 — vector on top of "وفـَّى" */}
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          <ScaledText className={p2.className} style={lineStyle}>{beforeWord}</ScaledText>
                          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                              source={require('@/assets/images/page27-vector.svg')}
                              style={{ position: 'absolute', top: 6, left: 3, width: 1.5, height: 6, zIndex: 10 }}
                              contentFit="contain"
                            />
                            <ScaledText className={p2.className} style={lineStyle}>{targetWord}</ScaledText>
                          </View>
                          <ScaledText className={p2.className} style={lineStyle}>{afterWord}</ScaledText>
                        </View>

                        {/* Line 3 */}
                        <ScaledText className={`${p2.className} text-center`} style={lineStyle}>
                          {lines[2]}
                        </ScaledText>

                        {/* Line 4 — vector on top of "يتقى" */}
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          <ScaledText className={p2.className} style={lineStyle}>{beforeWord4}</ScaledText>
                          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                              source={require('@/assets/images/page27-vector.svg')}
                              style={{ position: 'absolute', top: 6, left: 3, width: 1.5, height: 6, zIndex: 10 }}
                              contentFit="contain"
                            />
                            <ScaledText className={p2.className} style={lineStyle}>{targetWord4}</ScaledText>
                          </View>
                        </View>
                      </View>
                    );
                  })()}

                  {/* ── Footnote: (في الصباح يقال أصبحنا) ── */}
                  <ScaledText
                    className="text-center"
                    style={{
                      writingDirection: 'rtl',
                      lineHeight: 35,
                      includeFontPadding: false,
                    }}
                  >
                    {page.richTextAr[3].map((span: any, sIdx: number) => (
                      <ScaledText
                        key={`fn-${sIdx}`}
                        className={span.className}
                        style={span.style}
                      >
                        {span.text}
                      </ScaledText>
                    ))}
                  </ScaledText>
                </View>
                // ─── END PAGE 13 ─────────────────────────────────────────────────────────
              ) : page.id === 3 ? (
                // Page 2: Al-Baqarah 1-5 — Bold Bismillah line + ayah text with numbered circle markers
                <View style={{ width: 303, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                  {page.richTextAr.map((paragraph: any[], pIdx: number) => (
                    <ScaledText
                      key={pIdx}
                      className="text-center"
                      style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                    >
                      {paragraph.map((span: any, sIdx: number) => (
                        <ScaledText key={sIdx} className={span.className} style={span.style}>
                          {span.hasAyahMarkers
                            ? renderTextWithAyahMarkers(span.text)
                            : span.text}
                        </ScaledText>
                      ))}
                    </ScaledText>
                  ))}
                </View>
              ) : page.id === 6 ? (
                // Page 5: Al-Baqarah 285 — Quran text starting with ﴿ and numbered circle marker ۝٢٨٥
                <View style={{ width: 303, justifyContent: 'center', alignItems: 'center' }}>
                  {page.richTextAr.map((paragraph: any[], pIdx: number) => (
                    <ScaledText
                      key={pIdx}
                      className="text-center"
                      style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
                    >
                      {paragraph.map((span: any, sIdx: number) => (
                        <ScaledText key={sIdx} className={span.className} style={span.style}>
                          {span.hasAyahMarkers
                            ? renderTextWithAyahMarkers(span.text)
                            : span.text}
                        </ScaledText>
                      ))}
                    </ScaledText>
                  ))}
                </View>
              ) : (
                page.richTextAr.map((paragraph: any[], pIdx: number) => (
                  <ScaledText key={pIdx} className="text-center mb-4" style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}>
                    {paragraph.map((span: any, sIdx: number) => (
                      <ScaledText key={sIdx} className={span.className} style={span.style}>
                        {renderTextWithAyahMarkers(span.text)}
                      </ScaledText>
                    ))}
                  </ScaledText>
                ))
              )}
            </View>
          ) : page.imageSource ? (
            <View className="w-full items-center justify-center" style={{ marginTop: page.id === 1 ? 60 : page.id === 6 ? 30 : page.id === 8 ? 30 : page.id === 12 ? 60 : page.id <= 12 ? 50 : page.id === 17 ? 30 : (page.id >= 18 && page.id <= 21) ? 50 : (page.id >= 15 && page.id <= 21) ? 40 : 0 }}>
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
            <ScaledText
              className="text-wird-charcoal text-[22.5px] leading-[35px] text-center font-GESSTextMedium"
              style={{ writingDirection: 'rtl', fontVariant: ['no-contextual'] }}
            >
              {renderTextWithAyahMarkers(page.textAr)}
            </ScaledText>
          )}
        </View>
      </FitToCard>

      {/* Bottom block — labels + page footer, in flow below the fitted content.
          Padding lives here (not on the page root) so the content can use the
          full card width while the footer icons stay inset. */}
      <View className="w-full px-[26px]">
        {/* Title and Repeat labels */}
        {
          (page.titleAr || page.repeatAr || page.richTitleAr) ? (
            <View className="flex-row w-full mt-[10px] mb-[30px] items-center">
              {page.richTitleAr ? (
                <ScaledText className="text-center flex-1" style={{ writingDirection: 'rtl' }}>
                  {page.richTitleAr.map((span: any, idx: number) => (
                    <ScaledText key={idx} className={span.className}>
                      {span.text}
                    </ScaledText>
                  ))}
                </ScaledText>
              ) : page.titleAr && page.repeatAr ? (
                <>
                  <ScaledText className="text-wird-teal text-[22.5px] leading-[29px] font-GESSTextMedium text-left flex-1 font-medium">
                    {page.titleAr}
                  </ScaledText>
                  <ScaledText className="text-wird-dark-teal text-[22.5px] leading-[29px] font-GESSTextBold text-right flex-1 font-bold">
                    {page.repeatAr}
                  </ScaledText>
                </>
              ) : page.repeatAr ? (
                <ScaledText className="text-wird-dark-teal text-[22.5px] leading-[29px] font-GESSTextBold text-right flex-1 font-bold">
                  {page.repeatAr}
                </ScaledText>
              ) : (
                <ScaledText className="text-wird-teal text-[22.5px] leading-[29px] font-GESSTextMedium text-left flex-1 font-medium">
                  {page.titleAr}
                </ScaledText>
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

          {/* Zoom controls (right side) — A−/A+ for reader text size (text pages only) */}
          {!page.imageSource && (
          <View className="absolute right-0" style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 16 }}>
            <TouchableOpacity
              onPress={increase}
              disabled={!canIncrease}
              activeOpacity={0.6}
              hitSlop={{ top: 16, bottom: 16, left: 10, right: 10 }}
            >
              <Text style={{ fontFamily: 'GESSTextMedium', fontSize: 25, lineHeight: 28, color: canIncrease ? '#255458' : 'rgba(37,84,88,0.35)' }}>
                أ+
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={decrease}
              disabled={!canDecrease}
              activeOpacity={0.6}
              hitSlop={{ top: 16, bottom: 16, left: 10, right: 10 }}
            >
              <Text style={{ fontFamily: 'GESSTextMedium', fontSize: 16, lineHeight: 28, color: canDecrease ? '#255458' : 'rgba(37,84,88,0.35)' }}>
                أ-
              </Text>
            </TouchableOpacity>
          </View>
          )}

          {/* Centered Page Text */}
          <View className="flex-1 items-center">
            <ScaledText
              className="text-wird-charcoal font-medium text-sm"
              style={{ textAlign: 'center' }}
            >
              <ScaledText className='font-GESSTextMedium' >صفحة </ScaledText>
              <ScaledText style={{ fontFamily: 'Inter' }}>{index + 1}</ScaledText>
              <ScaledText className='font-GESSTextMedium'> من </ScaledText>
              <ScaledText style={{ fontFamily: 'Inter' }}>{totalPages}</ScaledText>
            </ScaledText>
          </View>
        </View>
      </View>
    </View >
  );
}