/**
 * Web fallback: replaces react-native-pager-view with a simple
 * state-driven single-page view. Metro picks this on web.
 * Supports layoutDirection="rtl" via onPageSelected prop.
 */
import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

interface PagerViewProps {
  style?: object;
  initialPage?: number;
  onPageSelected?: (e: { nativeEvent: { position: number } }) => void;
  layoutDirection?: 'ltr' | 'rtl';
  children: React.ReactNode;
}

const PagerViewCompat = forwardRef<any, PagerViewProps>(
  ({ style, initialPage = 0, onPageSelected, layoutDirection = 'ltr', children }, ref) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const pages = React.Children.toArray(children);

    useImperativeHandle(ref, () => ({
      setPage: (page: number) => changePage(page),
    }));

    const changePage = (page: number) => {
      const clamped = Math.max(0, Math.min(page, pages.length - 1));
      setCurrentPage(clamped);
      onPageSelected?.({ nativeEvent: { position: clamped } });
    };

    return (
      <View style={[{ flex: 1, overflow: 'hidden' }, style]}>
        {pages[currentPage]}
      </View>
    );
  }
);

export default PagerViewCompat;
