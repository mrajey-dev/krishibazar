import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { MANDI_RATES_TICKER } from '../../data/mockProducts';

export const MandiTicker: React.FC = () => {
  const { language } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {language === 'hi' ? 'मंडी भाव' : 'MANDI'}
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {MANDI_RATES_TICKER.map((item, idx) => (
          <View key={idx} style={styles.tickerItem}>
            <Text style={styles.cropText}>
              {language === 'hi' ? item.cropHi : item.cropEn} ({language === 'hi' ? item.mandiHi : item.mandiEn}):
            </Text>
            <Text style={styles.priceText}>{item.price}</Text>
            <Text style={styles.trendText}>{item.trend}</Text>
            <Text style={styles.dotSeparator}>•</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14532D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  badge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    color: '#000000',
    fontSize: 9.5,
    fontWeight: '800',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    gap: 4,
  },
  cropText: {
    color: '#DCFCE7',
    fontSize: 11,
    fontWeight: '700',
  },
  priceText: {
    color: '#FDE047',
    fontSize: 11,
    fontWeight: '800',
  },
  trendText: {
    color: '#86EFAC',
    fontSize: 10,
    fontWeight: '600',
  },
  dotSeparator: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginLeft: 6,
  },
});
