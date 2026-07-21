import { CARD, PageAsset, WirdPage } from '@/constants/pages';
import { Image } from 'expo-image';
import React from 'react';
import { ImageStyle, View } from 'react-native';

/**
 * One reader page: pure vector layers positioned at their Figma coordinates,
 * converted from the 402×874 design frame into card-local space and scaled
 * uniformly by `s`. No text rendering — pixel parity with the design.
 */
export default function ReaderPage({ page, s }: { page: WirdPage; s: number }) {
  const place = (a: PageAsset): ImageStyle => ({
    position: 'absolute',
    left: (a.box.x - CARD.x) * s,
    top: (a.box.y - CARD.y) * s,
    width: a.box.w * s,
    height: a.box.h * s,
  });

  return (
    <View style={{ flex: 1 }}>
      <Image source={page.content.source} style={place(page.content)} contentFit="contain" />
      {page.extras?.map((extra, i) => (
        <Image key={i} source={extra.source} style={place(extra)} contentFit="contain" />
      ))}
      {page.repeat && <Image source={page.repeat.source} style={place(page.repeat)} contentFit="contain" />}
      {page.title && <Image source={page.title.source} style={place(page.title)} contentFit="contain" />}
      <Image source={page.pageNo.source} style={place(page.pageNo)} contentFit="contain" />
    </View>
  );
}
