import React from 'react';
import { Text, TextProps } from 'react-native';

/**
 * Passthrough wrapper around <Text>. Reader text is now scaled as a whole page
 * by <FitToCard> (a uniform transform), so individual text no longer scales
 * itself. Kept as a thin wrapper so existing usages don't need to change.
 */
type ScaledTextProps = TextProps & { className?: string };

export default function ScaledText({ className, style, ...props }: ScaledTextProps) {
  return <Text className={className} style={style} {...props} />;
}
