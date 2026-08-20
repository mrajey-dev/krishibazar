import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform, Alert } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const CartScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { cartItems, updateCartQuantity, removeFromCart, clearCart, placeOrder, navigateTo, goBack, openContactModal } = useMarketplace();
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup_at_mandi' | 'direct_farm_visit' | 'seller_delivery'>('direct_farm_visit');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    placeOrder(deliveryMethod);
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successCard}>
          <View style={styles.successIconBox}>
            <Ionicons name="checkmark-circle" size={54} color="#15803D" />
          </View>
          <Text style={styles.successTitle}>
            {language === 'hi' ? 'ऑर्डर सफलतापूर्वक दर्ज हुआ!' : language === 'mr' ? 'ऑर्डर यशस्वीरित्या नोंदवला गेला!' : 'Order Placed Successfully!'}
          </Text>
          <Text style={styles.successSub}>
            {language === 'hi'
              ? 'किसान विक्रेता को आपका संदेश भेज दिया गया है। 0% कमीशन पर सीधे संपर्क करें।'
              : 'Your booking has been registered. You can directly talk with the farmer with 0% fee.'}
          </Text>

          <TouchableOpacity
            style={styles.viewOrdersBtn}
            onPress={() => {
              setOrderSuccess(false);
              navigateTo({ name: 'orders' });
            }}
            activeOpacity={0.85}
          >
            <Ionicons name="receipt-outline" size={18} color="#FFFFFF" />
            <Text style={styles.viewOrdersBtnText}>{language === 'hi' ? 'ऑर्डर्स देखें' : 'View Orders / Deals'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueShopBtn}
            onPress={() => {
              setOrderSuccess(false);
              navigateTo({ name: 'home' });
            }}
            activeOpacity={0.85}
          >
            <Text style={styles.continueShopBtnText}>{t('backToHome')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{t('cart')} ({cartItems.length})</Text>
            <Text style={styles.headerSub}>
              {language === 'hi' ? 'सीधे किसान से 0% कमीशन पर खरीदारी' : 'Direct Farmer Purchase • 0% Fee'}
            </Text>
          </View>
        </View>

        {cartItems.length > 0 && (
          <TouchableOpacity onPress={clearCart} style={styles.clearCartBtn}>
            <Text style={styles.clearCartText}>{t('clearAll')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {cartItems.length > 0 ? (
          <View style={{ padding: 14 }}>
            {/* Cart Items List */}
            {cartItems.map(item => (
              <View key={item.product.id} style={styles.itemCard}>
                <Image source={{ uri: item.product.images[0] }} style={styles.itemImg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {language === 'hi' ? item.product.titleHi : language === 'mr' && item.product.titleMr ? item.product.titleMr : item.product.title}
                  </Text>
                  
                  <View style={styles.priceRow}>
                    <Text style={styles.itemPrice}>
                      ₹{item.product.price.toLocaleString()}
                    </Text>
                    <Text style={styles.itemUnit}>
                      / {language === 'hi' ? item.product.unitHi : language === 'mr' && item.product.unitMr ? item.product.unitMr : item.product.unit}
                    </Text>
                  </View>

                  <Text style={styles.sellerLocationText}>
                    📍 {item.product.seller.name} • {item.product.seller.district}
                  </Text>

                  {/* Quantity Actions */}
                  <View style={styles.actionsRow}>
                    <View style={styles.qtyControlBox}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Ionicons name="remove" size={16} color="#374151" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Ionicons name="add" size={16} color="#374151" />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.callFarmerMiniBtn}
                      onPress={() => openContactModal(item.product)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="call" size={13} color="#15803D" />
                      <Text style={styles.callFarmerMiniText}>{t('callFarmer')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => removeFromCart(item.product.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#DC2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* Delivery / Inspection Method Selection */}
            <View style={styles.deliverySection}>
              <Text style={styles.sectionHeading}>
                {language === 'hi' ? 'माल प्राप्त करने का तरीका चुनें' : language === 'mr' ? 'माल मिळवण्याची पद्धत निवडा' : 'Select Delivery / Inspection Method'}
              </Text>

              <TouchableOpacity
                style={[styles.deliveryOption, deliveryMethod === 'direct_farm_visit' && styles.deliveryOptionActive]}
                onPress={() => setDeliveryMethod('direct_farm_visit')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={deliveryMethod === 'direct_farm_visit' ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={deliveryMethod === 'direct_farm_visit' ? '#15803D' : '#9CA3AF'}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryOptionTitle}>🌾 {t('directFarmerPickup')}</Text>
                  <Text style={styles.deliveryOptionSub}>
                    {language === 'hi' ? 'खेत पर जाकर माल देखकर सीधे किसान को नकद या UPI भुगतान करें।' : 'Inspect crops/seedlings on farm and pay directly.'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deliveryOption, deliveryMethod === 'pickup_at_mandi' && styles.deliveryOptionActive]}
                onPress={() => setDeliveryMethod('pickup_at_mandi')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={deliveryMethod === 'pickup_at_mandi' ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={deliveryMethod === 'pickup_at_mandi' ? '#15803D' : '#9CA3AF'}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryOptionTitle}>📍 {t('mandiPickup')}</Text>
                  <Text style={styles.deliveryOptionSub}>
                    {language === 'hi' ? 'नजदीकी कृषि उपज मंडी में किसान से मिलें।' : 'Meet the farmer at the local APMC yard.'}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deliveryOption, deliveryMethod === 'seller_delivery' && styles.deliveryOptionActive]}
                onPress={() => setDeliveryMethod('seller_delivery')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={deliveryMethod === 'seller_delivery' ? 'radio-button-on' : 'radio-button-off'}
                  size={18}
                  color={deliveryMethod === 'seller_delivery' ? '#15803D' : '#9CA3AF'}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryOptionTitle}>🚚 {t('sellerDelivery')}</Text>
                  <Text style={styles.deliveryOptionSub}>
                    {language === 'hi' ? 'ट्रैक्टर ट्रॉली या पिकअप वाहन से सीधे आपके पते पर।' : 'Seller arranges local tractor or tempo delivery.'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Bill Summary */}
            <View style={styles.billCard}>
              <Text style={styles.sectionHeading}>{language === 'hi' ? 'मूल्य विवरण' : 'Price Summary'}</Text>
              
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>{language === 'hi' ? 'सामान का मूल्य' : 'Produce Estimated Subtotal'}</Text>
                <Text style={styles.billVal}>₹{subtotal.toLocaleString()}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>{language === 'hi' ? 'कृषि बाज़ार सेवा शुल्क' : 'Platform Fee'}</Text>
                <Text style={[styles.billVal, { color: '#15803D', fontWeight: '800' }]}>₹0 (FREE • 0%)</Text>
              </View>

              <View style={styles.billDivider} />

              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>{t('totalAmount')}</Text>
                <Text style={styles.totalVal}>₹{subtotal.toLocaleString()}</Text>
              </View>
            </View>

            {/* Checkout Action Button */}
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={handleCheckout}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.checkoutBtnText}>{t('checkout')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="cart-outline" size={48} color="#15803D" />
            </View>
            <Text style={styles.emptyTitle}>{t('emptyCart')}</Text>
            <Text style={styles.emptySub}>{t('emptyCartSub')}</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigateTo({ name: 'home' })}
              activeOpacity={0.85}
            >
              <Text style={styles.exploreBtnText}>🌾 {language === 'hi' ? 'शेतमाल व पौध देखें' : 'Explore Agricultural Produce'}</Text>
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
    backgroundColor: '#15803D',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  headerSub: {
    color: '#DCFCE7',
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 1,
  },
  clearCartBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  clearCartText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    elevation: 2,
  },
  itemImg: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    marginTop: 3,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15803D',
  },
  itemUnit: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  sellerLocationText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  qtyControlBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
    paddingHorizontal: 6,
  },
  callFarmerMiniBtn: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  callFarmerMiniText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '700',
  },
  deleteBtn: {
    padding: 6,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  deliverySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    marginBottom: 8,
  },
  deliveryOptionActive: {
    borderColor: '#15803D',
    backgroundColor: '#F0FDF4',
  },
  deliveryOptionTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  deliveryOptionSub: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 14,
  },
  billCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  billLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
  billVal: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#111827',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  totalVal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#15803D',
  },
  checkoutBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  emptySub: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    marginBottom: 20,
  },
  exploreBtn: {
    backgroundColor: '#15803D',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13.5,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#F8FAF5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    elevation: 6,
  },
  successIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  successSub: {
    fontSize: 12.5,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 22,
  },
  viewOrdersBtn: {
    backgroundColor: '#16A34A',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  viewOrdersBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  continueShopBtn: {
    paddingVertical: 10,
  },
  continueShopBtnText: {
    color: '#15803D',
    fontWeight: '700',
    fontSize: 13,
  },
});
