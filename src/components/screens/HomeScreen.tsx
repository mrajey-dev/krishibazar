import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { CATEGORIES_DATA, MOCK_SELLERS } from '../../data/mockProducts';
import { ProductCard } from '../common/ProductCard';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { ProductCategory } from '../../types';

export const HomeScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, navigateTo, selectedLocation } = useMarketplace();

  const getCategoryIcon = (id: ProductCategory) => {
    switch (id) {
      case 'seeds': return <MaterialCommunityIcons name="sprout" size={24} color="#15803D" />;
      case 'machinery': return <MaterialCommunityIcons name="tractor" size={24} color="#EA580C" />;
      case 'fertilizers': return <MaterialCommunityIcons name="leaf" size={24} color="#059669" />;
      case 'pesticides': return <MaterialCommunityIcons name="shield-check" size={24} color="#0284C7" />;
      case 'crops': return <MaterialCommunityIcons name="barley" size={24} color="#D97706" />;
      case 'livestock': return <MaterialCommunityIcons name="cow" size={24} color="#7C3AED" />;
      default: return <Ionicons name="grid" size={24} color="#16A34A" />;
    }
  };

  const filteredProducts = products.filter(p => {
    if (selectedLocation.district !== 'All Districts') {
      return p.location.district.toLowerCase() === selectedLocation.district.toLowerCase();
    }
    return true;
  });

  const urgentDeals = filteredProducts.filter(p => p.isUrgent || p.isFeatured).slice(0, 4);
  const seedProducts = filteredProducts.filter(p => p.category === 'seeds').slice(0, 4);
  const machineryProducts = filteredProducts.filter(p => p.category === 'machinery').slice(0, 4);
  const fertilizerProducts = filteredProducts.filter(p => p.category === 'fertilizers' || p.category === 'pesticides').slice(0, 4);

  // Helper to chunk products in pairs for 2-column grid
  const chunkInPairs = (arr: any[]) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Direct Contact & Zero Online Payment Banner */}
      <View style={styles.trustBanner}>
        <View style={styles.trustIconBox}>
          <Ionicons name="shield-checkmark" size={16} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.trustTitle}>{t('directContactOnly')}</Text>
          <Text style={styles.trustSub}>{t('directContactSub')}</Text>
        </View>
      </View>

      {/* Categories Horizontal Slider */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleGroup}>
          <Ionicons name="sparkles" size={16} color="#16A34A" />
          <Text style={styles.sectionTitle}>{t('allCategories')}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigateTo({ name: 'category', categoryId: 'all' })}
          style={styles.viewAllBtn}
        >
          <Text style={styles.viewAllText}>{t('viewAll')}</Text>
          <Ionicons name="chevron-forward" size={14} color="#16A34A" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATEGORIES_DATA.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={styles.catChip}
            onPress={() => navigateTo({ name: 'category', categoryId: cat.id })}
            activeOpacity={0.8}
          >
            <View style={[styles.catIconContainer, { backgroundColor: cat.bgColor }]}>
              {getCategoryIcon(cat.id)}
            </View>
            <Text style={styles.catTitle}>
              {language === 'hi' ? cat.nameHi : cat.nameEn}
            </Text>
            <Text style={styles.catCount}>
              {cat.id === 'all' ? `${products.length} items` : `${products.filter(p => p.category === cat.id).length} items`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section 1: Urgent Farmer Harvest Deals */}
      {urgentDeals.length > 0 && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleGroup}>
              <Ionicons name="time" size={16} color="#DC2626" />
              <Text style={[styles.sectionTitle, { color: '#DC2626' }]}>{t('featuredDeals')}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigateTo({ name: 'category', categoryId: 'crops' })}
              style={styles.viewAllBtn}
            >
              <Text style={styles.viewAllText}>{t('viewAll')}</Text>
              <Ionicons name="chevron-forward" size={14} color="#16A34A" />
            </TouchableOpacity>
          </View>

          {chunkInPairs(urgentDeals).map((pair, idx) => (
            <View key={idx} style={styles.gridRow}>
              {pair.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Section 2: Certified Seeds */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleGroup}>
            <MaterialCommunityIcons name="sprout" size={18} color="#15803D" />
            <Text style={styles.sectionTitle}>{t('topSeeds')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigateTo({ name: 'category', categoryId: 'seeds' })}
            style={styles.viewAllBtn}
          >
            <Text style={styles.viewAllText}>{t('viewAll')}</Text>
            <Ionicons name="chevron-forward" size={14} color="#16A34A" />
          </TouchableOpacity>
        </View>

        {chunkInPairs(seedProducts).map((pair, idx) => (
          <View key={idx} style={styles.gridRow}>
            {pair.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </View>
        ))}
      </View>

      {/* Section 3: Machinery & Equipment */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleGroup}>
            <MaterialCommunityIcons name="tractor" size={18} color="#EA580C" />
            <Text style={styles.sectionTitle}>{t('machineryImplements')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigateTo({ name: 'category', categoryId: 'machinery' })}
            style={styles.viewAllBtn}
          >
            <Text style={styles.viewAllText}>{t('viewAll')}</Text>
            <Ionicons name="chevron-forward" size={14} color="#16A34A" />
          </TouchableOpacity>
        </View>

        {chunkInPairs(machineryProducts).map((pair, idx) => (
          <View key={idx} style={styles.gridRow}>
            {pair.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </View>
        ))}
      </View>

      {/* Section 4: Organic Fertilizers */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleGroup}>
            <MaterialCommunityIcons name="leaf" size={18} color="#059669" />
            <Text style={styles.sectionTitle}>{t('organicFertilizers')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigateTo({ name: 'category', categoryId: 'fertilizers' })}
            style={styles.viewAllBtn}
          >
            <Text style={styles.viewAllText}>{t('viewAll')}</Text>
            <Ionicons name="chevron-forward" size={14} color="#16A34A" />
          </TouchableOpacity>
        </View>

        {chunkInPairs(fertilizerProducts).map((pair, idx) => (
          <View key={idx} style={styles.gridRow}>
            {pair.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </View>
        ))}
      </View>

      {/* Verified Local Farmers Card */}
      <View style={styles.verifiedFarmersCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <Ionicons name="people" size={18} color="#86EFAC" />
          <Text style={styles.verifiedFarmersTitle}>
            {language === 'hi' ? 'सत्यापित स्थानीय किसान' : 'Verified Local Farmers'}
          </Text>
        </View>
        <Text style={styles.verifiedFarmersSub}>
          {language === 'hi'
            ? 'सीधे प्रगतिशील किसान भाइयों से बिना बिचौलिए के बात करें।'
            : 'Connect directly with certified seed producers and progressive farm owners.'}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
          {Object.values(MOCK_SELLERS).map(seller => (
            <TouchableOpacity
              key={seller.id}
              style={styles.sellerMiniCard}
              onPress={() => navigateTo({ name: 'seller_profile', sellerId: seller.id })}
              activeOpacity={0.85}
            >
              <Image source={{ uri: seller.avatar }} style={styles.sellerMiniAvatar} />
              <Text style={styles.sellerMiniName} numberOfLines={1}>{seller.name}</Text>
              <Text style={styles.sellerMiniRating}>{seller.rating} ★ ({seller.totalDeals})</Text>
              <Text style={styles.sellerMiniLoc} numberOfLines={1}>📍 {seller.district}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Safety Guide Tile */}
      <TouchableOpacity
        style={styles.safetyTile}
        onPress={() => navigateTo({ name: 'safety_guide' })}
        activeOpacity={0.85}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
          <View style={styles.safetyTileIcon}>
            <Ionicons name="shield-checkmark" size={18} color="#D97706" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.safetyTileTitle}>{t('safetyGuide')}</Text>
            <Text style={styles.safetyTileSub}>
              {language === 'hi' ? 'सामान जांच, मंडी डिलीवरी व सुरक्षित सौदे के नियम' : 'Inspection, Mandi pickup & offline trading rules'}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  trustBanner: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  trustIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  trustTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#78350F',
  },
  trustSub: {
    fontSize: 10,
    color: '#92400E',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 8,
  },
  sectionTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#16A34A',
  },
  catScroll: {
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  catChip: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginRight: 8,
    width: 82,
    elevation: 1,
  },
  catIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  catTitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 13,
  },
  catCount: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 2,
  },
  sectionContainer: {
    marginTop: 4,
  },
  gridRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  verifiedFarmersCard: {
    backgroundColor: '#15803D',
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 14,
    padding: 14,
  },
  verifiedFarmersTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  verifiedFarmersSub: {
    fontSize: 11,
    color: '#DCFCE7',
  },
  sellerMiniCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 8,
    marginRight: 8,
    width: 110,
    alignItems: 'center',
  },
  sellerMiniAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    marginBottom: 4,
  },
  sellerMiniName: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  sellerMiniRating: {
    fontSize: 9.5,
    color: '#DCFCE7',
  },
  sellerMiniLoc: {
    fontSize: 9.5,
    color: '#FDE047',
    marginTop: 2,
  },
  safetyTile: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 12,
    marginTop: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safetyTileIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyTileTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1F2937',
  },
  safetyTileSub: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 2,
  },
});
