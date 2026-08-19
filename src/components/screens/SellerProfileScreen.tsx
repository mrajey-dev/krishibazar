import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from '../common/ProductCard';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

interface SellerProfileScreenProps {
  sellerId: string;
}

export const SellerProfileScreen: React.FC<SellerProfileScreenProps> = ({ sellerId }) => {
  const { language, t } = useLanguage();
  const { getSellerById, getProductsBySeller, goBack } = useMarketplace();

  const seller = getSellerById(sellerId);
  const sellerProducts = getProductsBySeller(sellerId);

  if (!seller) {
    return (
      <View style={{ padding: 40, alignItems: 'center' }}>
        <Text>{language === 'hi' ? 'किसान नहीं मिले' : 'Farmer Not Found'}</Text>
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${seller.phone.replace(/[^0-9+]/g, '')}`).catch(() => {});
  };

  const handleWhatsApp = () => {
    const msg = language === 'hi'
      ? `नमस्ते ${seller.name} जी, मैंने कृषि बाज़ार पर आपकी प्रोफाइल देखी।`
      : `Hello ${seller.name}, I saw your profile on KrishiBazar.`;
    Linking.openURL(`https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`).catch(() => {});
  };

  const chunkInPairs = (arr: any[]) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{language === 'hi' ? 'किसान प्रोफाइल' : 'Farmer Profile'}</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image source={{ uri: seller.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{seller.name}</Text>
        <Text style={styles.loc}>📍 {seller.village}, {seller.district}, {seller.state}</Text>
        <Text style={styles.farmType}>{seller.farmType}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCol}>
          <Text style={styles.statVal}>{seller.rating} ★</Text>
          <Text style={styles.statLbl}>{t('rating')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statVal}>{seller.totalDeals}+</Text>
          <Text style={styles.statLbl}>{t('dealsCount')}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statCol}>
          <Text style={styles.statVal}>{seller.memberSince}</Text>
          <Text style={styles.statLbl}>{t('memberSince')}</Text>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{language === 'hi' ? 'किसान के बारे में' : 'About Farmer'}</Text>
        <Text style={styles.bioText}>{seller.bio}</Text>
        <Text style={styles.mandiText}>📍 {seller.mandiDistance}</Text>
      </View>

      {/* Contact Buttons */}
      <View style={styles.contactRow}>
        <TouchableOpacity style={styles.callBtn} onPress={handleCall} activeOpacity={0.85}>
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <Text style={styles.btnText}>{t('callFarmer')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp} activeOpacity={0.85}>
          <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
          <Text style={styles.btnText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Products */}
      <View style={{ marginTop: 8 }}>
        <Text style={styles.listingsTitle}>
          📦 {t('otherListingsByFarmer')} ({sellerProducts.length})
        </Text>
        {chunkInPairs(sellerProducts).map((pair, idx) => (
          <View key={idx} style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
            {pair.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </View>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
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
    gap: 10,
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
  banner: {
    backgroundColor: '#15803D',
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  loc: {
    fontSize: 11.5,
    color: '#DCFCE7',
    marginTop: 2,
  },
  farmType: {
    fontSize: 10.5,
    color: '#BBF7D0',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
  },
  statLbl: {
    fontSize: 10,
    color: '#6B7280',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 17,
  },
  mandiText: {
    fontSize: 11,
    color: '#15803D',
    fontWeight: '700',
    marginTop: 6,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  whatsappBtn: {
    flex: 1,
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  listingsTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    marginHorizontal: 14,
    marginVertical: 8,
  },
});
