import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Linking, Share, Dimensions } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from '../common/ProductCard';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ProductDetailScreenProps {
  productId: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ productId }) => {
  const { language, t } = useLanguage();
  const {
    getProductById,
    getProductsByCategory,
    goBack,
    navigateTo,
    isProductSaved,
    toggleSaveProduct,
    openContactModal
  } = useMarketplace();

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const product = getProductById(productId);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          {language === 'hi' ? 'सामान नहीं मिला' : 'Product Not Found'}
        </Text>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <Text style={styles.backBtnText}>{t('backToHome')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { seller } = product;
  const isSaved = isProductSaved(product.id);
  const displayTitle = language === 'hi' ? product.titleHi : product.title;
  const displayUnit = language === 'hi' ? product.unitHi : product.unit;
  const displayDesc = language === 'hi' ? product.descriptionHi : product.description;
  const displayCondition = language === 'hi' ? product.conditionLabelHi : product.conditionLabelEn;
  const displayStock = language === 'hi' ? product.quantityAvailableHi : product.quantityAvailable;

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    Share.share({
      message: `${displayTitle} on KrishiBazar for ₹${product.price}/${displayUnit}. Contact farmer ${seller.name} at ${seller.phone}`,
      title: displayTitle,
    }).catch(() => {});
  };

  const handleCall = () => {
    Linking.openURL(`tel:${seller.phone.replace(/[^0-9+]/g, '')}`).catch(() => {});
  };

  const handleWhatsApp = () => {
    const msg = language === 'hi'
      ? `नमस्ते ${seller.name} जी, मैंने कृषि बाज़ार पर आपकी लिस्टिंग "${displayTitle}" (मूल्य: ₹${product.price.toLocaleString()} / ${displayUnit}) देखी। क्या यह उपलब्ध है?`
      : `Hello ${seller.name}, I am interested in your listing "${displayTitle}" on KrishiBazar (₹${product.price.toLocaleString()} / ${displayUnit}).`;

    const url = `https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url).catch(() => {});
  };

  const chunkInPairs = (arr: any[]) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroImgBox}>
          <Image
            source={{ uri: product.images[activeImgIdx] || product.images[0] }}
            style={styles.heroImg}
            resizeMode="cover"
          />

          {/* Floating Top Nav */}
          <View style={styles.topNavRow}>
            <TouchableOpacity style={styles.circleBtn} onPress={goBack} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={20} color="#111827" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity style={styles.circleBtn} onPress={handleShare} activeOpacity={0.8}>
                <Ionicons name="share-social-outline" size={18} color="#111827" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.circleBtn, isSaved && { backgroundColor: '#FEE2E2' }]}
                onPress={() => toggleSaveProduct(product.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isSaved ? 'heart' : 'heart-outline'}
                  size={18}
                  color={isSaved ? '#EF4444' : '#111827'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbRow}>
            {product.images.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setActiveImgIdx(idx)}
                style={[styles.thumbBox, activeImgIdx === idx && styles.thumbBoxActive]}
              >
                <Image source={{ uri: img }} style={styles.thumbImg} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Body Content */}
        <View style={styles.bodyContent}>
          {/* Price & Nego Row */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceVal}>₹{product.price.toLocaleString()}</Text>
              <Text style={styles.priceUnit}>per {displayUnit}</Text>
            </View>
            {product.isNegotiable ? (
              <View style={styles.negoBadge}>
                <Text style={styles.negoText}>✨ {t('negotiable')}</Text>
              </View>
            ) : (
              <View style={styles.fixedBadge}>
                <Text style={styles.fixedText}>{t('fixedPrice')}</Text>
              </View>
            )}
          </View>

          {/* Title */}
          <Text style={styles.titleText}>{displayTitle}</Text>

          {/* Metadata Chips */}
          <View style={styles.metaRow}>
            <View style={[styles.metaChip, { backgroundColor: '#DCFCE7' }]}>
              <Text style={[styles.metaChipText, { color: '#15803D' }]}>🏷️ {displayCondition}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>📦 {displayStock}</Text>
            </View>
            <View style={styles.metaChip}>
              <Text style={styles.metaChipText}>📅 {product.harvestYearOrMfg}</Text>
            </View>
            {product.organicCertified && (
              <View style={[styles.metaChip, { backgroundColor: '#D1FAE5' }]}>
                <Text style={[styles.metaChipText, { color: '#065F46' }]}>🌱 100% Organic</Text>
              </View>
            )}
          </View>

          {/* Location & Mandi Distance */}
          <View style={styles.locationCard}>
            <Ionicons name="location-sharp" size={18} color="#16A34A" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.locVillageText}>
                {product.location.village}, {product.location.tehsil ? `${product.location.tehsil}, ` : ''}{product.location.district}, {product.location.state}
              </Text>
              <Text style={styles.mandiDistText}>📍 {seller.mandiDistance}</Text>
            </View>
          </View>

          {/* Specifications Table */}
          {product.specs && product.specs.length > 0 && (
            <View style={styles.specsCard}>
              <View style={styles.specsHeaderRow}>
                <MaterialCommunityIcons name="clipboard-text-outline" size={16} color="#16A34A" />
                <Text style={styles.specsTitle}>{t('specifications')}</Text>
              </View>
              <View style={styles.specsGrid}>
                {product.specs.map((spec, idx) => (
                  <View key={idx} style={styles.specItem}>
                    <Text style={styles.specLabel}>
                      {language === 'hi' ? spec.labelHi : spec.labelEn}
                    </Text>
                    <Text style={styles.specVal}>
                      {language === 'hi' ? spec.valueHi : spec.valueEn}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          <View style={styles.descSection}>
            <Text style={styles.descHeading}>
              {language === 'hi' ? 'विवरण एवं किसान की सलाह' : 'Description & Farmer Advice'}
            </Text>
            <Text style={styles.descBody}>{displayDesc}</Text>
          </View>

          {/* Farmer Card */}
          <View style={styles.sellerCard}>
            <View style={styles.sellerHeader}>
              <Image source={{ uri: seller.avatar }} style={styles.sellerAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sellerName}>{seller.name}</Text>
                <View style={styles.verifiedTag}>
                  <MaterialIcons name="verified" size={13} color="#15803D" />
                  <Text style={styles.verifiedTagText}>{t('verifiedFarmer')}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.sellerBio}>{seller.bio}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statCol}>
                <Text style={styles.statVal}>{seller.rating} ★</Text>
                <Text style={styles.statLbl}>{t('rating')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statCol}>
                <Text style={styles.statVal}>{seller.totalDeals}+</Text>
                <Text style={styles.statLbl}>{t('dealsCount')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statCol}>
                <Text style={styles.statVal}>{seller.memberSince}</Text>
                <Text style={styles.statLbl}>{t('memberSince')}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.viewProfileBtn}
              onPress={() => navigateTo({ name: 'seller_profile', sellerId: seller.id })}
              activeOpacity={0.85}
            >
              <Text style={styles.viewProfileText}>{t('viewSellerProfile')}</Text>
              <Ionicons name="chevron-forward" size={14} color="#15803D" />
            </TouchableOpacity>
          </View>

          {/* Offline Safety Reminder */}
          <View style={styles.safetyCard}>
            <Ionicons name="warning-outline" size={18} color="#D97706" style={{ marginTop: 2 }} />
            <Text style={styles.safetyCardText}>
              <Text style={{ fontWeight: '800' }}>{t('safetyNoticeTitle')}: </Text>
              {t('safetyNotice2')} {t('safetyNotice4')}
            </Text>
          </View>

          {/* Similar Products */}
          {relatedProducts.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.relatedTitle}>✨ {t('relatedProducts')}</Text>
              {chunkInPairs(relatedProducts).map((pair, idx) => (
                <View key={idx} style={{ flexDirection: 'row' }}>
                  {pair.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky Bottom Direct Contact Actions */}
      <View style={styles.stickyDock}>
        <TouchableOpacity style={styles.dockCallBtn} onPress={handleCall} activeOpacity={0.85}>
          <Ionicons name="call" size={17} color="#FFFFFF" />
          <Text style={styles.dockBtnText}>{t('callFarmer')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dockWhatsappBtn} onPress={handleWhatsApp} activeOpacity={0.85}>
          <FontAwesome name="whatsapp" size={19} color="#FFFFFF" />
          <Text style={styles.dockBtnText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dockInfoBtn}
          onPress={() => openContactModal(product)}
          activeOpacity={0.8}
        >
          <Ionicons name="information-circle-outline" size={22} color="#374151" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  notFoundContainer: {
    padding: 40,
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  backBtn: {
    marginTop: 12,
    backgroundColor: '#16A34A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  heroImgBox: {
    height: 250,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  topNavRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  thumbRow: {
    backgroundColor: '#F8FAF5',
    padding: 8,
    flexDirection: 'row',
  },
  thumbBox: {
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  thumbBoxActive: {
    borderColor: '#16A34A',
    borderWidth: 2,
  },
  thumbImg: {
    width: 48,
    height: 48,
  },
  bodyContent: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  priceVal: {
    fontSize: 24,
    fontWeight: '800',
    color: '#15803D',
  },
  priceUnit: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  negoBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  negoText: {
    color: '#92400E',
    fontSize: 11,
    fontWeight: '800',
  },
  fixedBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fixedText: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '700',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 22,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  metaChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  metaChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
  locationCard: {
    backgroundColor: '#F8FAF5',
    borderWidth: 1,
    borderColor: '#E2E8D8',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  locVillageText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111827',
  },
  mandiDistText: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 2,
  },
  specsCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  specsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  specsTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  specLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  specVal: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },
  descSection: {
    marginBottom: 14,
  },
  descHeading: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  descBody: {
    fontSize: 12.5,
    color: '#374151',
    lineHeight: 18,
  },
  sellerCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sellerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
  },
  verifiedTagText: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '700',
  },
  sellerBio: {
    fontSize: 11.5,
    color: '#374151',
    marginTop: 8,
    lineHeight: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 10,
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#15803D',
  },
  statLbl: {
    fontSize: 9.5,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  viewProfileBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 7,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  viewProfileText: {
    color: '#15803D',
    fontSize: 11.5,
    fontWeight: '700',
  },
  safetyCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  safetyCardText: {
    fontSize: 11,
    color: '#78350F',
    flex: 1,
    lineHeight: 15,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  stickyDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dockCallBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dockWhatsappBtn: {
    flex: 1,
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dockInfoBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dockBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
