import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Module-level dictionary to persist counts across screen unmounts during the session
const globalCounts: Record<string, number> = {};

interface CounterProps {
  pageId: string | number;
  onComplete?: () => void;
}

export default function Counter({ pageId, onComplete }: CounterProps) {
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
    <View
      className="w-full flex-row items-center justify-between"
      style={{
        paddingHorizontal: 32,
      }}
    >
      {/* 3 Radio Icons */}
      <View style={{ flexDirection: 'row', gap: 24 }}>
        {[1, 2, 3].map((circleIndex) => (
          <TouchableOpacity
            key={circleIndex}
            activeOpacity={0.8}
            onPress={handlePress}
          >
            <Image
              source={
                count >= circleIndex
                  ? require('@/assets/images/Ellipse 101.png')
                  : require('@/assets/images/Ellipse 105.png')
              }
              style={{ width: 33, height: 33 }}
              contentFit="contain"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Thalathan Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={{ width: 145, height: 52, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          className='!h-[52px]'
          source={require('@/assets/images/Rectangle 97.png')}
          style={{ position: 'absolute', width: 145, height: 58 }}
          contentFit="contain"
        />
        <Text
          className="leading-normal"
          style={{
            color: '#255458',
            fontFamily: 'GESSTextMedium',
            fontSize: 28,
            textAlign: 'center'

          }}
        >
          ثــلاثــاً
        </Text>
      </TouchableOpacity>
    </View >
  );
}
