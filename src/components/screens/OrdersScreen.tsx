import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const OrdersScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { orders, navigateTo, goBack, openContactModal } = useMarketplace();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{t('orders')} ({orders.length})</Text>
            <Text style={styles.headerSub}>
              {language === 'hi' ? 'आपके द्वारा बुक किए गए शेतमाल व सीधे सौदे' : 'Your Bookings & Farmer Deals'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigateTo({ name: 'home' })}
          activeOpacity={0.8}
        >
          <Ionicons name="storefront" size={14} color="#000000" />
          <Text style={styles.postBtnText}>{language === 'hi' ? 'खरीदें' : 'Browse'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {orders.length > 0 ? (
          <View style={{ padding: 14 }}>
            {orders.map(order => (
              <View key={order.id} style={styles.orderCard}>
                {/* Top Status Strip */}
                <View style={styles.orderHeaderRow}>
                  <View style={styles.statusPill}>
                    <Ionicons name="checkmark-circle" size={13} color="#15803D" />
                    <Text style={styles.statusText}>
                      {language === 'hi' ? 'सत्यापित बुकिंग' : 'Confirmed Deal'}
                    </Text>
                  </View>
                  <Text style={styles.orderDate}>📅 {order.orderDate}</Text>
                </View>

                {/* Product Detail */}
                <View style={styles.orderBody}>
                  <Image source={{ uri: order.product.images[0] }} style={styles.productImg} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.productTitle} numberOfLines={2}>
                      {language === 'hi' ? order.product.titleHi : order.product.title}
                    </Text>
                    <Text style={styles.orderPrice}>
                      ₹{order.totalPrice.toLocaleString()} • Qty: {order.quantity} {order.product.unit}
                    </Text>
                    <Text style={styles.sellerName}>
                      👤 {order.sellerName} (📍 {order.product.location.district})
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    style={styles.callBtn}
                    onPress={() => openContactModal(order.product)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="call" size={14} color="#FFFFFF" />
                    <Text style={styles.callBtnText}>{t('callFarmer')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.viewDetailBtn}
                    onPress={() => navigateTo({ name: 'product_detail', productId: order.product.id })}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="eye-outline" size={14} color="#15803D" />
                    <Text style={styles.viewDetailBtnText}>{language === 'hi' ? 'विवरण' : 'View Item'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="receipt-outline" size={44} color="#15803D" />
            </View>
            <Text style={styles.emptyTitle}>{language === 'hi' ? 'अभी कोई ऑर्डर नहीं है' : 'No Orders Yet'}</Text>
            <Text style={styles.emptySub}>
              {language === 'hi' ? 'प्याज पौध, चारा या खाद बुक करने पर यहां दिखाई देगा।' : 'Booked seedlings, fodder, and crops will appear here.'}
            </Text>
            <TouchableOpacity
              style={styles.shopNowBtn}
              onPress={() => navigateTo({ name: 'home' })}
            >
              <Text style={styles.shopNowBtnText}>🌾 {t('backToHome')}</Text>
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
  postBtn: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postBtnText: {
    color: '#000000',
    fontSize: 11.5,
    fontWeight: '800',
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    elevation: 2,
  },
  orderHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    color: '#15803D',
    fontSize: 10.5,
    fontWeight: '800',
  },
  orderDate: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  orderBody: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 10,
  },
  productImg: {
    width: 68,
    height: 68,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 18,
  },
  orderPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803D',
    marginTop: 3,
  },
  sellerName: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  callBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  viewDetailBtn: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  viewDetailBtnText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '700',
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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  emptySub: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 18,
  },
  shopNowBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  shopNowBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
