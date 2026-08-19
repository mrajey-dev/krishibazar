import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons } from '@expo/vector-icons';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { navigateTo, isProductSaved, toggleSaveProduct, openContactModal } = useMarketplace();

  const isSaved = isProductSaved(product.id);
  const displayTitle = language === 'mr' ? (product.titleMr || product.titleHi) : language === 'hi' ? product.titleHi : product.title;
  const displayUnit = language === 'mr' ? (product.unitMr || product.unitHi) : language === 'hi' ? product.unitHi : product.unit;

  const getUrgentText = () => (language === 'mr' ? 'तातडीचे' : language === 'hi' ? 'जरूरी' : 'URGENT');
  const getOrganicText = () => (language === 'mr' ? 'सेंद्रिय' : language === 'hi' ? 'जैविक' : 'ORGANIC');
  const getCertifiedText = () => (language === 'mr' ? 'प्रमाणित' : language === 'hi' ? 'प्रमाणित' : 'CERTIFIED');
  const getNegoText = () => (language === 'mr' ? 'वाटाघाटी' : language === 'hi' ? 'मोलभाव' : 'Nego.');
  const getCallText = () => (language === 'mr' ? 'कॉल' : language === 'hi' ? 'कॉल' : 'Call');

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateTo({ name: 'product_detail', productId: product.id })}
      activeOpacity={0.88}
    >
      {/* Image & Badges */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Tag Pill */}
        {product.isUrgent && (
          <View style={[styles.tagPill, { backgroundColor: '#EF4444' }]}>
            <Text style={styles.tagText}>{getUrgentText()}</Text>
          </View>
        )}
        {!product.isUrgent && product.organicCertified && (
          <View style={[styles.tagPill, { backgroundColor: '#059669' }]}>
            <Text style={styles.tagText}>{getOrganicText()}</Text>
          </View>
        )}
        {!product.isUrgent && !product.organicCertified && product.condition === 'certified_seed' && (
          <View style={[styles.tagPill, { backgroundColor: '#2563EB' }]}>
            <Text style={styles.tagText}>{getCertifiedText()}</Text>
          </View>
        )}

        {/* Floating Heart Button */}
        <TouchableOpacity
          style={[styles.heartBtn, isSaved && styles.heartBtnSaved]}
          onPress={() => toggleSaveProduct(product.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={16}
            color={isSaved ? '#EF4444' : '#4B5563'}
          />
        </TouchableOpacity>
      </View>

      {/* Card Content */}
      <View style={styles.cardBody}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {displayTitle}
        </Text>

        {/* Price & Unit */}
        <View style={styles.priceRow}>
          <Text style={styles.priceCurrency}>₹{product.price.toLocaleString()}</Text>
          <Text style={styles.priceUnit}>/{displayUnit}</Text>
          {product.isNegotiable && (
            <View style={styles.negoBadge}>
              <Text style={styles.negoText}>{getNegoText()}</Text>
            </View>
          )}
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location" size={11} color="#16A34A" />
          <Text style={styles.locationText} numberOfLines={1}>
            {product.location.village}, {product.location.district}
          </Text>
        </View>

        {/* Seller Info & Call Mini Button */}
        <View style={styles.sellerRow}>
          <View style={styles.sellerInfo}>
            <Image source={{ uri: product.seller.avatar }} style={styles.sellerAvatar} />
            <Text style={styles.sellerName} numberOfLines={1}>
              {product.seller.name}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.callMiniBtn}
            onPress={() => openContactModal(product)}
            activeOpacity={0.8}
          >
            <Ionicons name="call" size={10} color="#15803D" />
            <Text style={styles.callMiniText}>{getCallText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  imageContainer: {
    height: 125,
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  tagPill: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  heartBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBtnSaved: {
    backgroundColor: '#FEE2E2',
  },
  cardBody: {
    padding: 8,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 16,
    height: 32,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
    gap: 3,
  },
  priceCurrency: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
  },
  priceUnit: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  negoBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 'auto',
  },
  negoText: {
    color: '#92400E',
    fontSize: 8.5,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 10,
    color: '#6B7280',
    flex: 1,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 6,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginRight: 4,
  },
  sellerAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  sellerName: {
    fontSize: 9.5,
    color: '#4B5563',
    fontWeight: '600',
    flex: 1,
  },
  callMiniBtn: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  callMiniText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#15803D',
  },
});
