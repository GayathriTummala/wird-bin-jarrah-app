import { Image } from 'expo-image';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// Module-level dictionary to persist counts across screen unmounts during the session
const globalCounts: Record<string, number> = {};

interface CounterProps {
  pageId: string | number;
  /** Design-baseline scale factor */
  s: number;
  /** Horizontal centering offset for the 402-unit design column */
  colX: number;
  onComplete?: () => void;
}

// Figma boxes local to the counter band (frame y 778.8 → 874, band height 95.2).
// Circles: 28px visuals at x 33/89/145. State PNGs are on a normalized 36×40
// canvas with the circle center at (18,18). Official Figma states: navy = not
// yet clicked ("set original"), light grey = clicked. RTL: rightmost first.
const CIRCLES_X = [145, 89, 33];
const CIRCLE = { y: 11, size: 28, imgW: 36, imgH: 40 };
const BUTTON = { x: 224, y: 0, w: 145, h: 52, r: 18 };
const BUTTON_LABEL = { x: 266.71, y: 11.65, w: 59.3, h: 22.62 };

export const COUNTER_BAND_H = 95.2;

export default function Counter({ pageId, s, colX, onComplete }: CounterProps) {
  const [count, setCount] = React.useState(globalCounts[pageId] || 0);

  // Sync state if the page changes
  React.useEffect(() => {
    setCount(globalCounts[pageId] || 0);
  }, [pageId]);

  const handlePress = () => {
    if (count === 3) {
      globalCounts[pageId] = 0;
      setCount(0);
      if (onComplete) onComplete();
    } else {
      globalCounts[pageId] = count + 1;
      setCount(count + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 3 tap circles — 48pt touch targets around the 28px visuals */}
      {CIRCLES_X.map((cx, i) => (
        <TouchableOpacity
          key={cx}
          activeOpacity={0.8}
          onPress={handlePress}
          style={{
            position: 'absolute',
            left: colX + (cx + CIRCLE.size / 2 - 24) * s,
            top: (CIRCLE.y + CIRCLE.size / 2 - 24) * s,
            width: 48 * s,
            height: 48 * s,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={
              count >= i + 1
                ? require('@/assets/images/reader/circle-on.png')
                : require('@/assets/images/reader/circle-off.png')
            }
            style={{
              width: CIRCLE.imgW * s,
              height: CIRCLE.imgH * s,
              // canvas center is (18,20), circle center (18,18) — nudge down to align
              transform: [{ translateY: 2 * s }],
            }}
            contentFit="contain"
          />
        </TouchableOpacity>
      ))}

      {/* ثلاثاً button — light-blue ring over navy body per Figma */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={{
          position: 'absolute',
          left: colX + (BUTTON.x - 10) * s,
          top: (BUTTON.y - 8) * s,
          width: (BUTTON.w + 20) * s,
          height: (BUTTON.h + 16) * s,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: BUTTON.w * s,
            height: BUTTON.h * s,
            borderRadius: BUTTON.r * s,
            backgroundColor: '#7BB1EA',
            shadowColor: '#10263C',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            style={{
              position: 'absolute',
              left: 1 * s,
              top: 0,
              width: (BUTTON.w - 2) * s,
              height: (BUTTON.h - 2) * s,
              borderRadius: BUTTON.r * s,
              backgroundColor: '#154980',
            }}
          />
          <Image
            source={require('@/assets/images/reader/label-thalatha.svg')}
            style={{
              position: 'absolute',
              left: (BUTTON_LABEL.x - BUTTON.x) * s,
              top: (BUTTON_LABEL.y - BUTTON.y) * s,
              width: BUTTON_LABEL.w * s,
              height: BUTTON_LABEL.h * s,
            }}
            contentFit="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
