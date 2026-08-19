import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from '../common/ProductCard';
import { Ionicons } from '@expo/vector-icons';

export const SavedScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, savedProductIds, navigateTo, goBack } = useMarketplace();

  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  const chunkInPairs = (arr: any[]) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{t('saved')} ({savedProducts.length})</Text>
          <Text style={styles.headerSub}>
            {language === 'hi' ? 'जल्दी संपर्क के लिए सेव किए गए उत्पाद' : 'Saved for quick farmer inquiry'}
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {savedProducts.length > 0 ? (
          chunkInPairs(savedProducts).map((pair, idx) => (
            <View key={idx} style={styles.gridRow}>
              {pair.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="heart-outline" size={32} color="#EF4444" />
            </View>
            <Text style={styles.emptyTitle}>{t('noSavedItems')}</Text>
            <Text style={styles.emptySub}>{t('noSavedItemsSub')}</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigateTo({ name: 'home' })}
            >
              <Text style={styles.exploreBtnText}>
                {language === 'hi' ? 'सामान खोजें' : 'Explore Marketplace'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    backgroundColor: '#F3F4F6',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  headerSub: {
    fontSize: 11,
    color: '#6B7280',
  },
  gridRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  emptyBox: {
    padding: 50,
    alignItems: 'center',
  },
  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F2937',
  },
  emptySub: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 250,
  },
  exploreBtn: {
    marginTop: 16,
    backgroundColor: '#16A34A',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
