import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { ProductCategory } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CATEGORIES_DATA } from '../../data/mockProducts';
import { ProductCard } from '../common/ProductCard';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface CategoryScreenProps {
  categoryId: ProductCategory;
  initialSubCategory?: string;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ categoryId, initialSubCategory }) => {
  const { language, t } = useLanguage();
  const { products, goBack, selectedLocation } = useMarketplace();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(categoryId);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSubCategory || 'all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high'>('newest');
  const [onlyOrganic, setOnlyOrganic] = useState<boolean>(false);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  const activeCatProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const subCategories = ['all', ...Array.from(new Set(activeCatProducts.map(p => p.subCategory)))];

  let filtered = activeCatProducts.filter(p => {
    if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
    if (onlyOrganic && !p.organicCertified) return false;
    if (onlyVerified && !p.seller.isVerified) return false;
    if (selectedLocation.state && selectedLocation.state !== 'All India') {
      if (p.location.state.toLowerCase() !== selectedLocation.state.toLowerCase()) return false;
    }
    if (selectedLocation.district && selectedLocation.district !== 'All Districts') {
      if (p.location.district.toLowerCase() !== selectedLocation.district.toLowerCase()) return false;
    }
    if (selectedLocation.taluka && selectedLocation.taluka !== 'All Talukas') {
      const talukaQuery = selectedLocation.taluka.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
      const matchTehsil = p.location.tehsil.toLowerCase().includes(talukaQuery);
      const matchVillage = p.location.village.toLowerCase().includes(talukaQuery);
      const matchMandi = (p.seller.mandiDistance || '').toLowerCase().includes(talukaQuery);
      if (!matchTehsil && !matchVillage && !matchMandi) {
        // If not found in taluka, allow district match if available
        if (p.location.district.toLowerCase() !== selectedLocation.district.toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  });

  if (sortBy === 'price_low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => (b.isUrgent ? 1 : 0) - (a.isUrgent ? 1 : 0));
  }

  const categoryMeta = CATEGORIES_DATA.find(c => c.id === selectedCategory);

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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={18} color="#374151" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>
              {language === 'mr' && categoryMeta?.nameMr ? categoryMeta.nameMr : language === 'hi' ? categoryMeta?.nameHi : categoryMeta?.nameEn}
            </Text>
            <Text style={styles.headerCount}>
              {filtered.length} {language === 'hi' ? 'सामान उपलब्ध' : language === 'mr' ? 'वस्तू उपलब्ध' : 'items available'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowFilterDrawer(true)}
          style={[styles.filterBtn, (onlyOrganic || onlyVerified || sortBy !== 'newest') && styles.filterBtnActive]}
        >
          <Ionicons name="options-outline" size={14} color={onlyOrganic || onlyVerified || sortBy !== 'newest' ? '#15803D' : '#374151'} />
          <Text style={[styles.filterBtnText, (onlyOrganic || onlyVerified || sortBy !== 'newest') && { color: '#15803D' }]}>
            {t('filterBy')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Category Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catTabs}>
        {CATEGORIES_DATA.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => {
              setSelectedCategory(cat.id);
              setSelectedSubCategory('all');
            }}
            style={[styles.catTab, selectedCategory === cat.id && styles.catTabActive]}
          >
            <Text style={[styles.catTabText, selectedCategory === cat.id && styles.catTabTextActive]}>
              {language === 'mr' && cat.nameMr ? cat.nameMr : language === 'hi' ? cat.nameHi : cat.nameEn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Subcategory Pills */}
      {subCategories.length > 2 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subCatTabs}>
          {subCategories.map(sub => (
            <TouchableOpacity
              key={sub}
              onPress={() => setSelectedSubCategory(sub)}
              style={[styles.subTab, selectedSubCategory === sub && styles.subTabActive]}
            >
              <Text style={[styles.subTabText, selectedSubCategory === sub && styles.subTabTextActive]}>
                {sub === 'all' ? (language === 'hi' ? 'सभी किस्में' : 'All Types') : sub}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Product List Grid */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {filtered.length > 0 ? (
          chunkInPairs(filtered).map((pair, idx) => (
            <View key={idx} style={styles.gridRow}>
              {pair.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>🌾</Text>
            <Text style={styles.emptyTitle}>
              {language === 'hi' ? 'कोई सामान नहीं मिला' : 'No items match your filter'}
            </Text>
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSelectedSubCategory('all');
                setOnlyOrganic(false);
                setOnlyVerified(false);
                setSortBy('newest');
              }}
            >
              <Text style={styles.resetBtnText}>{t('clearAll')}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Filter Modal Sheet */}
      <Modal
        visible={showFilterDrawer}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterDrawer(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalDragBar} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>{t('filterBy')}</Text>
              <TouchableOpacity onPress={() => { setSortBy('newest'); setOnlyOrganic(false); setOnlyVerified(false); }}>
                <Text style={styles.clearText}>{t('clearAll')}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.filterSectionLabel}>{t('sortBy')}</Text>
            {[
              { id: 'newest', label: t('newestFirst') },
              { id: 'price_low', label: t('priceLowToHigh') },
              { id: 'price_high', label: t('priceHighToLow') },
            ].map(item => (
              <TouchableOpacity
                key={item.id}
                style={[styles.sortItem, sortBy === item.id && styles.sortItemActive]}
                onPress={() => setSortBy(item.id as any)}
              >
                <Text style={[styles.sortItemText, sortBy === item.id && styles.sortItemTextActive]}>
                  {item.label}
                </Text>
                {sortBy === item.id && <Ionicons name="checkmark" size={16} color="#15803D" />}
              </TouchableOpacity>
            ))}

            <Text style={[styles.filterSectionLabel, { marginTop: 14 }]}>
              {language === 'hi' ? 'विशेष विशेषताएं' : 'Special Filters'}
            </Text>

            <TouchableOpacity
              style={[styles.checkItem, onlyOrganic && styles.checkItemActive]}
              onPress={() => setOnlyOrganic(!onlyOrganic)}
            >
              <Text style={styles.checkItemText}>🌱 {t('onlyOrganic')}</Text>
              {onlyOrganic && <Ionicons name="checkmark" size={16} color="#059669" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.checkItem, onlyVerified && styles.checkItemActive]}
              onPress={() => setOnlyVerified(!onlyVerified)}
            >
              <Text style={styles.checkItemText}>🛡️ {t('onlyVerified')}</Text>
              {onlyVerified && <Ionicons name="checkmark" size={16} color="#15803D" />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => setShowFilterDrawer(false)}
            >
              <Text style={styles.applyBtnText}>{t('applyFilters')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
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
  headerCount: {
    fontSize: 11,
    color: '#6B7280',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  filterBtnActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  filterBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#374151',
  },
  catTabs: {
    backgroundColor: '#F8FAF5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8D8',
  },
  catTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 6,
  },
  catTabActive: {
    backgroundColor: '#16A34A',
    borderColor: '#16A34A',
  },
  catTabText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#374151',
  },
  catTabTextActive: {
    color: '#FFFFFF',
  },
  subCatTabs: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  subTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    marginRight: 6,
  },
  subTabActive: {
    backgroundColor: '#DCFCE7',
  },
  subTabText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '600',
  },
  subTabTextActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  gridRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  emptyContainer: {
    padding: 50,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  resetBtn: {
    marginTop: 12,
    backgroundColor: '#16A34A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalDragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  filterSectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  sortItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
  },
  sortItemActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  sortItemText: {
    fontSize: 12.5,
    color: '#374151',
  },
  sortItemTextActive: {
    color: '#15803D',
    fontWeight: '700',
  },
  checkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
  },
  checkItemActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  checkItemText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#111827',
  },
  applyBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
