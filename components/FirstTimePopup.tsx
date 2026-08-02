import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { ImageStyle, Modal, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useLayoutScale } from '../hooks/useLayoutScale';

export type DismissMode = '1day' | '1week' | 'permanent';

interface Props {
  visible: boolean;
  onDismiss: (mode?: DismissMode) => void;
}

// Boxes traced from the Figma popup frame (node 2468:6575), in card-local
// coordinates — card origin (39, 200.8) on the 402×874 baseline.
const CARD = { w: 324, h: 506, r: 52 };
const L = {
  inner: { x: 9, y: 10, w: 306, h: 486 },
  cancel: { x: 34.17, y: 36, w: 33, h: 33 },
  title: { x: 122.94, y: 77.9, w: 77.33, h: 24.94 },
  underline: { x: 124, y: 110, w: 76, h: 1.5 },
  body: { x: 61.88, y: 133.49, w: 199.89, h: 119.66 },
  times: { x: 49.44, y: 260.13, w: 201.57, h: 56.49 },
  sun: { x: 258.24, y: 264.29, w: 17.7, h: 18.46 },
  moon: { x: 259.46, y: 294.62, w: 15.53, h: 16.8 },
  hideLabel: { x: 110.19, y: 350.85, w: 101.6, h: 15.64 },
  footerText: { x: 46.85, y: 435.52, w: 209.32, h: 15.97 },
  footerIcon: { x: 263.82, y: 436.48, w: 13.73, h: 13.77 },
};
const PILL = { y: 380.8, w: 76, h: 38, r: 13 };
// All three pills render identically (outlined) until one is tapped; the tapped
// one fills with the accent yellow and swaps to the dark-on-yellow label.
const PILL_FILL = '#E0F57F';
const PILLS: {
  mode: DismissMode;
  x: number;
  label: any;
  labelSelected: any;
  labelBox: { x: number; y: number; w: number; h: number };
}[] = [
  { mode: 'permanent', x: 38.17, label: require('@/assets/images/popup/pill-forever.svg'), labelSelected: require('@/assets/images/popup/pill-forever-dark.svg'), labelBox: { x: 63.46, y: 390.03, w: 25.71, h: 17.02 } },
  { mode: '1week', x: 123.17, label: require('@/assets/images/popup/pill-week.svg'), labelSelected: require('@/assets/images/popup/pill-week-dark.svg'), labelBox: { x: 142.83, y: 390.03, w: 36.51, h: 19.44 } },
  { mode: '1day', x: 208.17, label: require('@/assets/images/popup/pill-day.svg'), labelSelected: require('@/assets/images/popup/pill-day-dark.svg'), labelBox: { x: 235.44, y: 396.94, w: 22.77, h: 12.67 } },
];
// Touch targets extend this far beyond the visible control on every side.
const TOUCH_PAD = 10;
// How long the selected pill stays yellow before the popup closes.
const SELECT_FEEDBACK_MS = 220;

export default function FirstTimePopup({ visible, onDismiss }: Props) {
  const { s } = useLayoutScale();
  const [selected, setSelected] = useState<DismissMode | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the highlight whenever the popup is shown again.
  useEffect(() => {
    if (visible) setSelected(null);
  }, [visible]);

  useEffect(() => () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
  }, []);

  const handlePillPress = (mode: DismissMode) => {
    if (selected) return; // ignore repeat taps while the confirmation shows
    setSelected(mode);
    dismissTimer.current = setTimeout(() => onDismiss(mode), SELECT_FEEDBACK_MS);
  };

  const rel = (b: { x: number; y: number; w: number; h: number }): ImageStyle => ({
    position: 'absolute',
    left: b.x * s,
    top: b.y * s,
    width: b.w * s,
    height: b.h * s,
  });
  // A touchable box padded around a visual box, so the touch area is
  // comfortably larger than the artwork (hitSlop is unreliable near parent
  // bounds in release builds).
  const touch = (b: { x: number; y: number; w: number; h: number }): ViewStyle => ({
    position: 'absolute',
    left: (b.x - TOUCH_PAD) * s,
    top: (b.y - TOUCH_PAD) * s,
    width: (b.w + TOUCH_PAD * 2) * s,
    height: (b.h + TOUCH_PAD * 2) * s,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Full-screen backdrop */}
      <View className="flex-1 justify-center items-center bg-[rgba(17,16,15,0.85)]">
        {/* Card */}
        <View
          style={{
            width: CARD.w * s,
            height: CARD.h * s,
            borderRadius: CARD.r * s,
            marginTop: 33.6 * s, // Figma places the card center 16.8 below screen center
            backgroundColor: '#113152',
            shadowColor: 'rgba(16,38,60,0.95)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          {/* Inner tinted overlay — hairline edge baked from the Figma soft-light
              stroke (renders as #3E658C over the navy composite) */}
          <View
            pointerEvents="none"
            style={{
              ...rel(L.inner),
              borderRadius: CARD.r * s,
              backgroundColor: 'rgba(21,73,128,0.3)',
              borderWidth: Math.max(1 * s, 0.5),
              borderColor: '#3E658C',
            }}
          />

          {/* Title + underline */}
          <Image source={require('@/assets/images/popup/title-note.svg')} style={rel(L.title)} contentFit="contain" />
          <View style={{ ...rel(L.underline), backgroundColor: '#E0F57F' }} />

          {/* Body + reading times */}
          <Image source={require('@/assets/images/popup/body-text.svg')} style={rel(L.body)} contentFit="contain" />
          <Image source={require('@/assets/images/popup/times-text.svg')} style={rel(L.times)} contentFit="contain" />
          <Image source={require('@/assets/images/popup/icon-sun.svg')} style={rel(L.sun)} contentFit="contain" />
          <Image source={require('@/assets/images/popup/icon-moon.svg')} style={rel(L.moon)} contentFit="contain" />

          {/* Hide-for label */}
          <Image source={require('@/assets/images/popup/label-hide.svg')} style={rel(L.hideLabel)} contentFit="contain" />

          {/* Dismiss pills */}
          {PILLS.map((p) => {
            const isSelected = selected === p.mode;
            return (
            <TouchableOpacity
              key={p.mode}
              onPress={() => handlePillPress(p.mode)}
              activeOpacity={0.7}
              style={touch({ x: p.x, y: PILL.y, w: PILL.w, h: PILL.h })}
            >
              <View
                style={{
                  width: PILL.w * s,
                  height: PILL.h * s,
                  borderRadius: PILL.r * s,
                  ...(isSelected
                    ? { backgroundColor: PILL_FILL }
                    : { borderWidth: 0.65 * s, borderColor: '#CDCCC9', opacity: 0.9 }),
                }}
              />
              <Image
                source={isSelected ? p.labelSelected : p.label}
                style={{
                  position: 'absolute',
                  left: (p.labelBox.x - p.x + TOUCH_PAD) * s,
                  top: (p.labelBox.y - PILL.y + TOUCH_PAD) * s,
                  width: p.labelBox.w * s,
                  height: p.labelBox.h * s,
                }}
                contentFit="contain"
              />
            </TouchableOpacity>
            );
          })}

          {/* Footer hint */}
          <Image source={require('@/assets/images/popup/footer-text.svg')} style={rel(L.footerText)} contentFit="contain" />
          <Image source={require('@/assets/images/popup/icon-settings-small.svg')} style={rel(L.footerIcon)} contentFit="contain" />

          {/* Close — rendered last so nothing overlaps its touch area */}
          <TouchableOpacity onPress={() => onDismiss()} activeOpacity={0.6} style={touch(L.cancel)}>
            <Image
              source={require('@/assets/images/popup/icon-cancel-circle.svg')}
              style={{ width: L.cancel.w * s, height: L.cancel.h * s }}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
