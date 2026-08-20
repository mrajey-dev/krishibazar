import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { navigateTo, isProductSaved, toggleSaveProduct, openContactModal } = useMarketplace();

  const isSaved = isProductSaved(product.id);
  const displayTitle = language === 'mr' ? (product.titleMr || product.titleHi) : language === 'hi' ? product.titleHi : product.title;
  const displayUnit = language === 'mr' ? (product.unitMr || product.unitHi) : language === 'hi' ? product.unitHi : product.unit;

  const getConditionText = () => {
    if (product.isUrgent) return language === 'mr' ? 'तातडीचे' : language === 'hi' ? 'जरूरी' : 'URGENT';
    if (product.organicCertified) return language === 'mr' ? '🌿 सेंद्रिय' : language === 'hi' ? '🌿 जैविक' : '🌿 Organic';
    if (product.conditionLabelEn) return language === 'hi' ? product.conditionLabelHi : language === 'mr' && product.conditionLabelMr ? product.conditionLabelMr : product.conditionLabelEn;
    return language === 'mr' ? 'खात्रीशीर' : 'Verified';
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateTo({ name: 'product_detail', productId: product.id })}
      activeOpacity={0.88}
    >
      {/* 1. Product Image & Overlays */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Condition / Quality Tag */}
        <View style={[
          styles.tagPill,
          product.isUrgent ? { backgroundColor: '#EF4444' } : { backgroundColor: '#15803D' }
        ]}>
          <Text style={styles.tagText} numberOfLines={1}>
            {getConditionText()}
          </Text>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#EAB308" />
          <Text style={styles.ratingText}>{product.seller.rating || 4.8}</Text>
        </View>

        {/* Floating Heart / Wishlist Button */}
        <TouchableOpacity
          style={[styles.heartBtn, isSaved && styles.heartBtnSaved]}
          onPress={(e) => {
            e?.stopPropagation?.();
            toggleSaveProduct(product.id);
          }}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={14}
            color={isSaved ? '#EF4444' : '#475569'}
          />
        </TouchableOpacity>
      </View>

      {/* 2. Product Information Content */}
      <View style={styles.cardBody}>
        {/* Product Name */}
        <Text style={styles.productTitle} numberOfLines={2}>
          {displayTitle}
        </Text>

        {/* Price & Unit */}
        <View style={styles.priceRow}>
          <Text style={styles.priceCurrency}>₹{product.price.toLocaleString()}</Text>
          <Text style={styles.priceUnit}>/{displayUnit}</Text>
        </View>

        {/* Seller & Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-sharp" size={11} color="#16A34A" />
          <Text style={styles.locationText} numberOfLines={1}>
            {product.location.district || product.location.village} {product.location.distanceKm ? `• ${product.location.distanceKm} km` : ''}
          </Text>
        </View>

        {/* 3. Direct Contact Button */}
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={(e) => {
            e?.stopPropagation?.();
            openContactModal(product);
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={12} color="#FFFFFF" />
          <Text style={styles.contactBtnText}>
            {t('callFarmer')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#15803D',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  imageContainer: {
    height: 104,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  tagPill: {
    position: 'absolute',
    top: 5,
    left: 5,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    maxWidth: 90,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  ratingBadge: {
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
  ratingText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#854D0E',
  },
  heartBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  heartBtnSaved: {
    backgroundColor: '#FEE2E2',
  },
  cardBody: {
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
    marginBottom: 2,
  },
  priceCurrency: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#15803D',
  },
  priceUnit: {
    fontSize: 9.5,
    color: '#64748B',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 9.5,
    color: '#475569',
    fontWeight: '600',
    flex: 1,
  },
  contactBtn: {
    backgroundColor: '#16A34A',
    paddingVertical: 5.5,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  contactBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});
