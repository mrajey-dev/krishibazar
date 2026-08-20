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
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.75}>
            <Ionicons name="arrow-back" size={18} color="#1E293B" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={{ fontSize: 16 }}>{selectedCategory === 'all' ? '🌾' : (categoryMeta?.emoji || '🌾')}</Text>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {selectedCategory === 'all'
                  ? (language === 'hi' ? 'सभी श्रेणियां' : language === 'mr' ? 'सर्व वर्गवारी' : 'All Categories')
                  : (language === 'mr' && categoryMeta?.nameMr ? categoryMeta.nameMr : language === 'hi' ? categoryMeta?.nameHi : categoryMeta?.nameEn)}
              </Text>
            </View>
            <View style={styles.headerCountBadge}>
              <Text style={styles.headerCountText}>
                {filtered.length} {language === 'hi' ? 'सामान उपलब्ध' : language === 'mr' ? 'शेतमाल उपलब्ध' : 'items available'}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowFilterDrawer(true)}
          style={[styles.filterBtn, (onlyOrganic || onlyVerified || sortBy !== 'newest') && styles.filterBtnActive]}
          activeOpacity={0.75}
        >
          <Ionicons
            name="options"
            size={14}
            color={onlyOrganic || onlyVerified || sortBy !== 'newest' ? '#15803D' : '#334155'}
          />
          <Text style={[styles.filterBtnText, (onlyOrganic || onlyVerified || sortBy !== 'newest') && { color: '#15803D' }]}>
            {t('filterBy')}
          </Text>
          {(onlyOrganic || onlyVerified || sortBy !== 'newest') && (
            <View style={styles.filterActiveDot} />
          )}
        </TouchableOpacity>
      </View>

      {/* Professional Horizontal Category Carousel */}
      <View style={styles.catTabsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catTabsContent}
        >
          {/* 'All' Category Tab */}
          <TouchableOpacity
            onPress={() => {
              setSelectedCategory('all');
              setSelectedSubCategory('all');
            }}
            style={[styles.catTabPill, selectedCategory === 'all' && styles.catTabPillActive]}
            activeOpacity={0.78}
          >
            <View style={[styles.catTabIconBox, selectedCategory === 'all' && styles.catTabIconBoxActive]}>
              <Text style={{ fontSize: 13 }}>🌟</Text>
            </View>
            <Text style={[styles.catTabLabel, selectedCategory === 'all' && styles.catTabLabelActive]}>
              {language === 'hi' ? 'सभी' : language === 'mr' ? 'सर्व' : 'All'}
            </Text>
            <View style={[styles.catTabCountBadge, selectedCategory === 'all' && styles.catTabCountBadgeActive]}>
              <Text style={[styles.catTabCountText, selectedCategory === 'all' && styles.catTabCountTextActive]}>
                {products.length}
              </Text>
            </View>
          </TouchableOpacity>

          {/* All 29 Category Tabs */}
          {CATEGORIES_DATA.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubCategory('all');
                }}
                style={[
                  styles.catTabPill,
                  isSelected && styles.catTabPillActive,
                ]}
                activeOpacity={0.78}
              >
                <View
                  style={[
                    styles.catTabIconBox,
                    { backgroundColor: isSelected ? '#DCFCE7' : (cat.bgColor || '#F1F5F9') },
                  ]}
                >
                  <Text style={{ fontSize: 13 }}>{cat.emoji}</Text>
                </View>
                <Text
                  style={[
                    styles.catTabLabel,
                    isSelected && styles.catTabLabelActive,
                  ]}
                >
                  {language === 'mr' && cat.nameMr ? cat.nameMr : language === 'hi' ? cat.nameHi : cat.nameEn}
                </Text>
                <View style={[styles.catTabCountBadge, isSelected && styles.catTabCountBadgeActive]}>
                  <Text style={[styles.catTabCountText, isSelected && styles.catTabCountTextActive]}>
                    {cat.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Selected Category Info Banner */}
      {selectedCategory !== 'all' && categoryMeta && (
        <View style={[styles.catHeroStrip, { backgroundColor: categoryMeta.bgColor || '#F0FDF4', borderColor: `${categoryMeta.color}35` || '#BBF7D0' }]}>
          <View style={styles.catHeroIconSquare}>
            <Text style={{ fontSize: 20 }}>{categoryMeta.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.catHeroTitle} numberOfLines={1}>
              {language === 'mr' && categoryMeta.nameMr ? categoryMeta.nameMr : language === 'hi' ? categoryMeta.nameHi : categoryMeta.nameEn}
            </Text>
            <Text style={styles.catHeroDesc} numberOfLines={1}>
              {language === 'mr' && categoryMeta.descriptionMr ? categoryMeta.descriptionMr : language === 'hi' ? categoryMeta.descriptionHi : categoryMeta.descriptionEn}
            </Text>
          </View>
          <View style={styles.catHeroBadge}>
            <Ionicons name="checkmark-circle" size={11} color="#15803D" />
            <Text style={styles.catHeroBadgeText}>{filtered.length} {language === 'hi' ? 'उपलब्ध' : 'Active'}</Text>
          </View>
        </View>
      )}

      {/* Subcategory Pills */}
      {subCategories.length > 2 && (
        <View style={styles.subCatWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subCatContent}
          >
            {subCategories.map(sub => {
              const isSubActive = selectedSubCategory === sub;
              return (
                <TouchableOpacity
                  key={sub}
                  onPress={() => setSelectedSubCategory(sub)}
                  style={[styles.subTabPill, isSubActive && styles.subTabPillActive]}
                  activeOpacity={0.75}
                >
                  {isSubActive && <Ionicons name="checkmark-circle" size={12} color="#15803D" style={{ marginRight: 3 }} />}
                  <Text style={[styles.subTabPillText, isSubActive && styles.subTabPillTextActive]}>
                    {sub === 'all' ? (language === 'hi' ? 'सभी प्रकार' : language === 'mr' ? 'सर्व प्रकार' : 'All Types') : sub}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
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
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  backBtn: {
    backgroundColor: '#F1F5F9',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerTitleBox: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerCountBadge: {
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  headerCountText: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '600',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterBtnActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  filterBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  filterActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginLeft: 1,
  },
  catTabsWrapper: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  catTabsContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  catTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 4,
    paddingRight: 10,
    paddingVertical: 4.5,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catTabPillActive: {
    backgroundColor: '#15803D',
    borderColor: '#15803D',
    elevation: 2,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  catTabIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catTabIconBoxActive: {
    backgroundColor: '#DCFCE7',
  },
  catTabLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  catTabLabelActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  catTabCountBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
    marginLeft: 2,
  },
  catTabCountBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  catTabCountText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#475569',
  },
  catTabCountTextActive: {
    color: '#FFFFFF',
  },
  catHeroStrip: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
  },
  catHeroIconSquare: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catHeroTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  catHeroDesc: {
    fontSize: 10.5,
    color: '#475569',
    marginTop: 1,
  },
  catHeroBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 3.5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 0.8,
    borderColor: '#BBF7D0',
  },
  catHeroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  subCatWrapper: {
    backgroundColor: '#F8FAF5',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  subCatContent: {
    paddingHorizontal: 12,
    gap: 6,
  },
  subTabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 4.5,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subTabPillActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
  },
  subTabPillText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  subTabPillTextActive: {
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
