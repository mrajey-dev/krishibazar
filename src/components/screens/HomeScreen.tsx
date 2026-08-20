import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CATEGORIES_DATA } from '../../data/mockProducts';
import { Product } from '../../types';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, navigateTo, selectedLocation, openContactModal } = useMarketplace();
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Filter products by selected state, district, and taluka
  const matchedProducts = products.filter(p => {
    if (selectedLocation.state && selectedLocation.state !== 'All India') {
      if (p.location.state.toLowerCase() !== selectedLocation.state.toLowerCase()) {
        return false;
      }
    }
    if (selectedLocation.district && selectedLocation.district !== 'All Districts') {
      if (p.location.district.toLowerCase() !== selectedLocation.district.toLowerCase()) {
        return false;
      }
    }
    if (selectedLocation.taluka && selectedLocation.taluka !== 'All Talukas') {
      const talukaName = selectedLocation.taluka.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '');
      const matchTehsil = p.location.tehsil.toLowerCase().includes(talukaName);
      const matchVillage = p.location.village.toLowerCase().includes(talukaName);
      const matchMandi = (p.seller.mandiDistance || '').toLowerCase().includes(talukaName);
      const matchDist = p.location.district.toLowerCase().includes(talukaName);
      if (!matchTehsil && !matchVillage && !matchMandi && !matchDist) {
        return false;
      }
    }
    return true;
  });

  // If specific taluka has 0 direct listings, fallback to district/state products
  const filteredProducts = matchedProducts.length > 0 ? matchedProducts : products.filter(p => {
    if (selectedLocation.district && selectedLocation.district !== 'All Districts') {
      return p.location.district.toLowerCase() === selectedLocation.district.toLowerCase();
    }
    return true;
  });

  // Popular Products (seedlings, seeds, fodder, equipment)
  const popularProducts = (filteredProducts.length > 0 ? filteredProducts : products).filter(p => p.isPopular || p.isFeatured).slice(0, 6);

  const getCategoryName = (cat: typeof CATEGORIES_DATA[0]) => {
    if (language === 'mr' && cat.nameMr) return cat.nameMr;
    if (language === 'hi') return cat.nameHi;
    return cat.nameEn;
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 1. AGRICULTURAL MAIN CATEGORIES (EXPANDABLE) */}
        <View style={styles.categoriesSectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionIconBadgeGreen}>
                  <Ionicons name="grid" size={15} color="#15803D" />
                </View>
                <Text style={styles.sectionHeading}>{t('allCategories')}</Text>
                <View style={styles.catCountTotalBadge}>
                  <Text style={styles.catCountTotalText}>
                    {showAllCategories ? `${CATEGORIES_DATA.length} Total` : `8 of ${CATEGORIES_DATA.length}`}
                  </Text>
                </View>
              </View>
              <Text style={styles.sectionSubHeading}>
                {language === 'hi'
                  ? 'ताजा पौध, प्रमाणित बीज, चारा व खाद'
                  : language === 'mr'
                  ? 'ताजी रोपे, प्रमाणित बियाणे, चारा व खते'
                  : 'Verified seedlings, seeds, fodder & inputs'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowAllCategories(prev => !prev)}
              style={[styles.viewAllBtn, showAllCategories && styles.viewLessBtn]}
              activeOpacity={0.7}
            >
              <Text style={[styles.viewAllText, showAllCategories && styles.viewLessText]}>
                {showAllCategories
                  ? (language === 'hi' ? 'कम देखें' : language === 'mr' ? 'कमी दाखवा' : 'See Less')
                  : (language === 'hi' ? 'सभी देखें' : language === 'mr' ? 'सर्व पहा' : 'See All')}
              </Text>
              <Ionicons
                name={showAllCategories ? 'chevron-up' : 'chevron-down'}
                size={13}
                color={showAllCategories ? '#475569' : '#16A34A'}
              />
            </TouchableOpacity>
          </View>

          {/* Categories Grid (4 Columns, 8 initially or All on Expand) */}
          <View style={styles.categoriesGrid4Col}>
            {(showAllCategories ? CATEGORIES_DATA : CATEGORIES_DATA.slice(0, 8)).map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard4Col}
                onPress={() => navigateTo({ name: 'category', categoryId: cat.id })}
                activeOpacity={0.75}
              >
                <View
                  style={[
                    styles.catIconBox4Col,
                    {
                      backgroundColor: cat.bgColor || '#F0FDF4',
                      borderColor: cat.color ? `${cat.color}40` : '#DCFCE7',
                    },
                  ]}
                >
                  <Image source={{ uri: cat.image }} style={styles.catThumbnail4Col} />
                  <View style={styles.catEmojiBadgeFloat}>
                    <Text style={{ fontSize: 11 }}>{cat.emoji}</Text>
                  </View>
                </View>
                <Text style={styles.categoryCardName4Col} numberOfLines={2}>
                  {getCategoryName(cat)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Dedicated "See All / See Less" Expandable Action Button */}
          <TouchableOpacity
            style={[styles.seeAllCategoriesBar, showAllCategories && styles.seeLessCategoriesBar]}
            onPress={() => setShowAllCategories(prev => !prev)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={showAllCategories ? 'chevron-up-circle' : 'apps'}
              size={15}
              color={showAllCategories ? '#475569' : '#15803D'}
            />
            <Text style={[styles.seeAllCategoriesBarText, showAllCategories && styles.seeLessCategoriesBarText]}>
              {showAllCategories
                ? (language === 'hi'
                    ? 'कम श्रेणियां दिखाएं (See Less)'
                    : language === 'mr'
                    ? 'कमी वर्गवारी दाखवा (See Less)'
                    : 'See Less Categories')
                : (language === 'hi'
                    ? `सभी ${CATEGORIES_DATA.length} श्रेणियां देखें (See All)`
                    : language === 'mr'
                    ? `सर्व ${CATEGORIES_DATA.length} वर्गवारी पहा (See All)`
                    : `See All ${CATEGORIES_DATA.length} Categories`)}
            </Text>
            <Ionicons
              name={showAllCategories ? 'chevron-up' : 'chevron-down'}
              size={14}
              color={showAllCategories ? '#475569' : '#15803D'}
            />
          </TouchableOpacity>
        </View>

        {/* 2. POPULAR FARM PRODUCTS */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={styles.sectionTitleRow}>
                <View style={styles.sectionIconBadgeOrange}>
                  <Ionicons name="flame" size={16} color="#EA580C" />
                </View>
                <Text style={styles.sectionHeading}>{t('popularProducts')}</Text>
              </View>
              <Text style={styles.sectionSubHeading}>{t('popularProductsSub')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigateTo({ name: 'category', categoryId: 'all' })}
              style={styles.viewAllBtn}
              activeOpacity={0.7}
            >
              <Text style={styles.viewAllText}>{t('viewAll')}</Text>
              <Ionicons name="chevron-forward" size={13} color="#16A34A" />
            </TouchableOpacity>
          </View>

          {/* Popular Products 2-Column Grid */}
          <View style={styles.productsGrid}>
            {popularProducts.map(prod => (
              <View key={prod.id} style={styles.productCard}>
                <TouchableOpacity
                  onPress={() => navigateTo({ name: 'product_detail', productId: prod.id })}
                  activeOpacity={0.88}
                >
                  <View style={styles.productImgBox}>
                    <Image source={{ uri: prod.images[0] }} style={styles.productImg} />
                    {prod.conditionLabelEn && (
                      <View style={styles.conditionTag}>
                        <Text style={styles.conditionTagText} numberOfLines={1}>
                          {language === 'hi' ? prod.conditionLabelHi : prod.conditionLabelEn}
                        </Text>
                      </View>
                    )}
                    {/* Rating Pill */}
                    <View style={styles.prodRatingBadge}>
                      <Ionicons name="star" size={10} color="#EAB308" />
                      <Text style={styles.prodRatingText}>{prod.seller.rating || 4.8}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={styles.productCardContent}>
                  {/* Product Title */}
                  <TouchableOpacity
                    onPress={() => navigateTo({ name: 'product_detail', productId: prod.id })}
                  >
                    <Text style={styles.productTitle} numberOfLines={2}>
                      {language === 'hi' ? prod.titleHi : prod.title}
                    </Text>
                  </TouchableOpacity>

                  {/* Price & Unit */}
                  <View style={styles.productPriceRow}>
                    <Text style={styles.productPrice}>₹{prod.price.toLocaleString()}</Text>
                    <Text style={styles.productUnit}>
                      /{language === 'hi' ? prod.unitHi : prod.unit}
                    </Text>
                  </View>

                  {/* Seller Location */}
                  <View style={styles.prodLocationRow}>
                    <Ionicons name="location-sharp" size={11} color="#16A34A" />
                    <Text style={styles.sellerDistText} numberOfLines={1}>
                      {prod.location.district || prod.location.village} {prod.location.distanceKm ? `• ${prod.location.distanceKm} km` : ''}
                    </Text>
                  </View>

                  {/* Direct Contact Button */}
                  <TouchableOpacity
                    style={styles.contactActionBtnFull}
                    onPress={() => openContactModal(prod)}
                    activeOpacity={0.78}
                  >
                    <Ionicons name="call" size={12} color="#FFFFFF" />
                    <Text style={styles.contactActionBtnTextFull}>{t('callFarmer')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 4. 100% DIRECT TRADE GUARANTEE BANNER */}
        <View style={styles.trustBanner}>
          <View style={styles.trustIconCircle}>
            <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trustBannerTitle}>
              {t('directContactOnly')}
            </Text>
            <Text style={styles.trustBannerSub}>
              {t('directContactSub')}
            </Text>
          </View>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  container: {
    flex: 1,
  },
  toastContainer: {
    position: 'absolute',
    top: 12,
    alignSelf: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 24,
    zIndex: 99,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  categoriesSectionCard: {
    marginTop: 10,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8EDEB',
    elevation: 2,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  catCountTotalBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  catCountTotalText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
  },
  sectionIconBadgeGreen: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconBadgeOrange: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFEDD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.2,
  },
  sectionSubHeading: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 2,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: '#DCFCE7',
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  viewLessBtn: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  viewLessText: {
    color: '#475569',
  },
  categoriesGrid4Col: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    rowGap: 14,
    columnGap: '2.6%',
  },
  categoryCard4Col: {
    width: '23%',
    alignItems: 'center',
  },
  catIconBox4Col: {
    width: 56,
    height: 56,
    borderRadius: 16,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginBottom: 5,
  },
  catThumbnail4Col: {
    width: 50,
    height: 50,
    borderRadius: 13,
  },
  catEmojiBadgeFloat: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 2.5,
    paddingVertical: 0.5,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  categoryCardName4Col: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    lineHeight: 13,
    height: 26,
  },
  seeAllCategoriesBar: {
    marginTop: 12,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 10,
    paddingVertical: 8.5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  seeAllCategoriesBarText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#15803D',
  },
  seeLessCategoriesBar: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  seeLessCategoriesBarText: {
    color: '#475569',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  productImgBox: {
    width: '100%',
    height: 104,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  productImg: {
    width: '100%',
    height: '100%',
  },
  conditionTag: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#15803D',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    maxWidth: 90,
  },
  conditionTagText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  prodRatingBadge: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderWidth: 0.8,
    borderColor: '#FEF08A',
    elevation: 1,
  },
  prodRatingText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#854D0E',
  },
  productCardContent: {
    padding: 7,
  },
  productTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 14.5,
    height: 29,
    marginBottom: 2,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#15803D',
  },
  productUnit: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '600',
  },
  prodLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 6,
  },
  sellerDistText: {
    fontSize: 9.5,
    color: '#475569',
    fontWeight: '600',
    flex: 1,
  },
  contactActionBtnFull: {
    backgroundColor: '#16A34A',
    paddingVertical: 5.5,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  contactActionBtnTextFull: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  trustBanner: {
    backgroundColor: '#DCFCE7',
    marginHorizontal: 14,
    marginTop: 15,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  trustIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#15803D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustBannerTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#14532D',
  },
  trustBannerSub: {
    fontSize: 10,
    color: '#166534',
    marginTop: 1,
    lineHeight: 13,
  },
});
