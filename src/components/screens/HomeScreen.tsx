import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CATEGORIES_DATA } from '../../data/mockProducts';
import { Product } from '../../types';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, navigateTo, selectedLocation, addToCart } = useMarketplace();
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    showToast(`🛒 ${language === 'hi' ? 'कार्ट में जोड़ा गया!' : language === 'mr' ? 'कार्टमध्ये जोडले!' : 'Added to Cart!'}`);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    navigateTo({ name: 'cart' });
  };

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
      {/* Toast Feedback Notification */}
      {!!toastMsg && (
        <View style={styles.toastContainer}>
          <Ionicons name="checkmark-circle" size={16} color="#4ADE80" />
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 1. TOP 4 FAST SERVICES / HIGHLIGHTS */}
        <View style={styles.quickServicesGrid}>
          <TouchableOpacity
            style={[styles.quickServiceCard, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}
            onPress={() => navigateTo({ name: 'category', categoryId: 'onion_seedlings' })}
            activeOpacity={0.78}
          >
            <View style={[styles.quickServiceIconBox, { backgroundColor: '#DCFCE7' }]}>
              <Text style={{ fontSize: 20 }}>🧅</Text>
            </View>
            <Text style={styles.quickServiceTitle}>
              {language === 'hi' ? 'कांदा / प्याज पौध' : language === 'mr' ? 'कांदा रोपे' : 'Onion Seedlings'}
            </Text>
            <Text style={styles.quickServiceSub}>
              {language === 'hi' ? 'ताजा नर्सरी' : 'Nursery Ready'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickServiceCard, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}
            onPress={() => navigateTo({ name: 'category', categoryId: 'fodder_maize' })}
            activeOpacity={0.78}
          >
            <View style={[styles.quickServiceIconBox, { backgroundColor: '#FDE68A' }]}>
              <Text style={{ fontSize: 20 }}>🌽</Text>
            </View>
            <Text style={styles.quickServiceTitle}>
              {language === 'hi' ? 'मक्का व हरा चारा' : language === 'mr' ? 'मका चारा' : 'Maize Fodder'}
            </Text>
            <Text style={styles.quickServiceSub}>
              {language === 'hi' ? 'पौष्टिक वैरण' : 'Green Silage'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickServiceCard, { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }]}
            onPress={() => navigateTo({ name: 'sell' })}
            activeOpacity={0.78}
          >
            <View style={[styles.quickServiceIconBox, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="add-circle" size={22} color="#2563EB" />
            </View>
            <Text style={styles.quickServiceTitle}>
              {language === 'hi' ? 'सामान बेचें' : language === 'mr' ? 'शेतमाल विका' : 'Sell Free'}
            </Text>
            <Text style={styles.quickServiceSub}>
              {language === 'hi' ? '0% कमीशन' : '0% Commission'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickServiceCard, { backgroundColor: '#FAF5FF', borderColor: '#E9D5FF' }]}
            onPress={() => navigateTo({ name: 'safety_guide' })}
            activeOpacity={0.78}
          >
            <View style={[styles.quickServiceIconBox, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="shield-checkmark" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.quickServiceTitle}>
              {language === 'hi' ? 'सुरक्षित व्यापार' : language === 'mr' ? 'सुरक्षित खरेदी' : 'Safe Trading'}
            </Text>
            <Text style={styles.quickServiceSub}>
              {language === 'hi' ? 'सीधा संपर्क' : 'Direct Call'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. 10 AGRICULTURAL MAIN CATEGORIES */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionIconBadgeGreen}>
                <Ionicons name="grid" size={15} color="#15803D" />
              </View>
              <Text style={styles.sectionHeading}>{t('allCategories')}</Text>
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

          {/* Compact Space-Efficient 2-Column Category Grid */}
          <View style={styles.categoriesGrid}>
            {CATEGORIES_DATA.map(cat => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCardCompact}
                onPress={() => navigateTo({ name: 'category', categoryId: cat.id })}
                activeOpacity={0.72}
              >
                <View style={styles.catImgWrapper}>
                  <Image source={{ uri: cat.image }} style={styles.catThumbnail} />
                  <View style={styles.catEmojiBadge}>
                    <Text style={{ fontSize: 10 }}>{cat.emoji}</Text>
                  </View>
                </View>
                <View style={styles.catTextWrapper}>
                  <Text style={styles.categoryCardName} numberOfLines={2}>
                    {getCategoryName(cat)}
                  </Text>
                  <View style={styles.catCountBadge}>
                    <Text style={styles.categoryCardCount}>
                      {cat.count} {language === 'hi' ? 'उपलब्ध' : language === 'mr' ? 'उपलब्ध' : 'Items'}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={11} color="#CBD5E1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 3. POPULAR FARM PRODUCTS */}
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

                  {/* Compact Add to Cart Button */}
                  <TouchableOpacity
                    style={styles.cartActionBtnFull}
                    onPress={() => handleAddToCart(prod)}
                    activeOpacity={0.78}
                  >
                    <Ionicons name="cart-outline" size={13} color="#FFFFFF" />
                    <Text style={styles.cartActionBtnTextFull}>{t('addToCart')}</Text>
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
  quickServicesGrid: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  quickServiceCard: {
    flex: 1,
    borderRadius: 12,
    padding: 7,
    alignItems: 'center',
    borderWidth: 1,
  },
  quickServiceIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  quickServiceTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    lineHeight: 13,
  },
  quickServiceSub: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 1,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 9,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 2,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 2,
  },
  viewAllText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#16A34A',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 6,
  },
  categoryCardCompact: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1.5,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  catImgWrapper: {
    width: 34,
    height: 34,
    borderRadius: 8,
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  catThumbnail: {
    width: 34,
    height: 34,
    borderRadius: 8,
  },
  catEmojiBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 1.5,
    paddingVertical: 0,
    elevation: 1.5,
    borderWidth: 0.8,
    borderColor: '#E5E7EB',
  },
  catTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryCardName: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 13,
  },
  catCountBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 1.5,
  },
  categoryCardCount: {
    fontSize: 8.5,
    color: '#15803D',
    fontWeight: '700',
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
  cartActionBtnFull: {
    backgroundColor: '#16A34A',
    paddingVertical: 5.5,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  cartActionBtnTextFull: {
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
