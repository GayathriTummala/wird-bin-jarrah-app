import { Settings, XCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export type DismissMode = '1day' | '1week' | 'permanent';

interface Props {
  visible: boolean;
  onDismiss: (mode?: DismissMode) => void;
}

const DISMISS_OPTIONS: { mode: DismissMode; label: string }[] = [
  { mode: '1day', label: 'يوم' },
  { mode: '1week', label: 'أسبوع' },
  { mode: 'permanent', label: 'أبداً' },
];

export default function FirstTimePopup({ visible, onDismiss }: Props) {
  const [selected, setSelected] = useState<DismissMode | null>(null);

  const handleSelect = (mode: DismissMode) => {
    setSelected(mode);
    setTimeout(() => {
      setSelected(null);
      onDismiss(mode);
    }, 350);
  };

  const getPillStyle = (mode: DismissMode) => {
    const isSelected = selected === mode;
    if (isSelected) {
      return { container: 'bg-[#EAC385] border-[#EAC385]', text: 'text-[#20261E] font-bold' };
    }
    if (mode === 'permanent') {
      return { container: 'bg-[#FFFBF1] border-[#FFFBF1]', text: 'text-[#255458] font-bold' };
    }
    return { container: 'bg-transparent border-[#FFFBF1]/30', text: 'text-[#FFFBF1]' };
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Full-screen backdrop */}
      <View className="flex-1 justify-center items-center px-10 bg-[rgba(17,16,15,0.85)]">
        {/* ── Outer Card (Figma: Rectangle 99) ── */}
        <View
          className="w-full max-w-[324px] rounded-[52px] bg-[#255458]"
          style={{
            shadowColor: '#163A3D',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          {/* ── Inner tinted overlay (Figma: Rectangle 100) ── */}
          <View
            className="m-[9px] rounded-[52px] bg-[#255458] pt-[52px] pb-[32px] px-5 items-center"
            style={{ borderWidth: 1, borderColor: 'rgba(255,251,241,0.15)' }}
          >
            {/* X / Cancel button — top-left of inner card */}
            <TouchableOpacity
              onPress={() => onDismiss()}
              style={{ position: 'absolute', top: 20, left: 20, zIndex: 50 }}
              activeOpacity={0.7}
            >
              <XCircle size={33} color="#FFFBF1" strokeWidth={1.5} />
            </TouchableOpacity>

            {/* ── "ملاحظة" Badge (Figma: Rectangle 98) ── */}
            <View className="bg-[#FFFBF1] rounded-[13px] w-[178px] h-[45px] justify-center items-center mb-7 self-center">
              <Text className="font-GESSTextMedium text-[32px] text-[#255458] text-center -top-[2px]">
                ملاحظة
              </Text>
            </View>

            {/* ── Body Text Section ── */}
            <View className="items-center">
              <Text className="font-GESSTextMedium text-[22px] text-[#FFFBF1] mb-3 text-center" style={{ writingDirection: 'rtl' }}>
                هــذا الـورد المختصــر
              </Text>

              <Text className="font-GESSTextMedium text-[13px] text-[#FFFBF1] mb-6 text-center" style={{ writingDirection: 'rtl' }}>
                من كلام الله تعالى و كلام سيد البشر
              </Text>

              <Text className="font-GESSTextMedium text-[22px] text-[#FFFBF1] mb-[10px] text-center" style={{ writingDirection: 'rtl' }}>
                يُقـرأ مرتين في اليـوم
              </Text>

              <Text className="font-GESSTextMedium text-center mb-[6px]" style={{ writingDirection: 'rtl' }}>
                <Text className="text-[22px] text-[#FFFBF1]">صبــاحاً </Text>
                <Text className="text-[13px] text-[#FFFBF1]"> (من بعد أذان الفجر)</Text>
              </Text>

              <Text className="font-GESSTextMedium text-center" style={{ writingDirection: 'rtl' }}>
                <Text className="text-[22px] text-[#FFFBF1]">مســاءً </Text>
                <Text className="text-[13px] text-[#FFFBF1]"> (من بعد أذان العصر)</Text>
              </Text>
            </View>

            {/* ── Dismiss Options Section (moved inside the tinted overlay) ── */}
            <View className="w-full mt-8">
              {/* Label */}
              <Text className="font-GESSTextMedium text-[12px] text-[rgba(255,251,241,0.45)] text-center mb-2.5">
                إخفاء هذا التنبيه لـ
              </Text>

              {/* Horizontal pills */}
              <View className="flex-row-reverse gap-2">
                {DISMISS_OPTIONS.map(({ mode, label }) => {
                  const style = getPillStyle(mode);
                  return (
                    <TouchableOpacity
                      key={mode}
                      onPress={() => handleSelect(mode)}
                      disabled={selected !== null}
                      activeOpacity={0.75}
                      className={`flex-1 py-3 rounded-2xl items-center border ${style.container}`}
                    >
                      <Text className={`text-base font-GESSTextMedium ${style.text}`}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Settings hint */}
              <View className="flex-row-reverse items-center justify-center mt-3.5 gap-1.5">
                <Settings size={12} color="rgba(255,251,241,0.40)" />
                <Text className="font-GESSTextMedium text-[11px] text-[rgba(255,251,241,0.40)]">
                  يمكنك إعادة التفعيل من شاشة الضبط
                </Text>
              </View>
            </View>

          </View>
        </View>
      </View>
    </Modal>
  );
}
