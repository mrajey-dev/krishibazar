import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons } from '@expo/vector-icons';

export const MyListingsScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, myProductIds, deleteProduct, navigateTo, goBack } = useMarketplace();

  const myListings = products.filter(p => myProductIds.includes(p.id));

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={18} color="#374151" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{t('myAds')} ({myListings.length})</Text>
            <Text style={styles.headerSub}>
              {language === 'hi' ? 'आपके द्वारा पोस्ट किए गए उत्पाद' : 'Your posted listings'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigateTo({ name: 'sell' })}
        >
          <Ionicons name="add" size={16} color="#000000" />
          <Text style={styles.postBtnText}>{t('sell')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {myListings.length > 0 ? (
          <View style={{ padding: 12 }}>
            {myListings.map(prod => (
              <View key={prod.id} style={styles.itemCard}>
                <Image source={{ uri: prod.images[0] }} style={styles.itemImg} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {language === 'hi' ? prod.titleHi : prod.title}
                  </Text>
                  <Text style={styles.itemPrice}>
                    ₹{prod.price.toLocaleString()} / {language === 'hi' ? prod.unitHi : prod.unit}
                  </Text>
                  <Text style={styles.itemStock}>{prod.quantityAvailable}</Text>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.viewBtn}
                      onPress={() => navigateTo({ name: 'product_detail', productId: prod.id })}
                    >
                      <Ionicons name="eye-outline" size={13} color="#15803D" />
                      <Text style={styles.viewBtnText}>{language === 'hi' ? 'पेज देखें' : 'View Page'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.delBtn}
                      onPress={() => deleteProduct(prod.id)}
                    >
                      <Ionicons name="trash-outline" size={13} color="#DC2626" />
                      <Text style={styles.delBtnText}>{language === 'hi' ? 'हटाएं' : 'Delete'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="cube-outline" size={32} color="#16A34A" />
            </View>
            <Text style={styles.emptyTitle}>{t('noListingsYet')}</Text>
            <Text style={styles.emptySub}>{t('noListingsYetSub')}</Text>
            <TouchableOpacity
              style={styles.sellBtn}
              onPress={() => navigateTo({ name: 'sell' })}
            >
              <Text style={styles.sellBtnText}>+ {t('postAdTitle')}</Text>
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
  headerSub: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '600',
  },
  postBtn: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  postBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  itemImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#16A34A',
    marginTop: 2,
  },
  itemStock: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 1,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    paddingVertical: 5,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  viewBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  delBtn: {
    paddingHorizontal: 12,
    backgroundColor: '#FEE2E2',
    paddingVertical: 5,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  delBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyBox: {
    padding: 50,
    alignItems: 'center',
  },
  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#DCFCE7',
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
    maxWidth: 260,
  },
  sellBtn: {
    marginTop: 16,
    backgroundColor: '#16A34A',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sellBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
