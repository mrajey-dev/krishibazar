import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const { currentScreen, navigateTo, savedProductIds, myProductIds } = useMarketplace();

  const activeTab = currentScreen.name;

  return (
    <View style={styles.navBar}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'home' })}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={22}
          color={activeTab === 'home' ? '#16A34A' : '#6B7280'}
        />
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>
          {t('home')}
        </Text>
      </TouchableOpacity>

      {/* Categories Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'category', categoryId: 'all' })}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'category' ? 'grid' : 'grid-outline'}
          size={22}
          color={activeTab === 'category' ? '#16A34A' : '#6B7280'}
        />
        <Text style={[styles.tabLabel, activeTab === 'category' && styles.tabLabelActive]}>
          {t('allCategories')}
        </Text>
      </TouchableOpacity>

      {/* Sell Floating Action Button */}
      <TouchableOpacity
        style={styles.sellBtn}
        onPress={() => navigateTo({ name: 'sell' })}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Saved / Favorites Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'saved' })}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'saved' ? 'heart' : 'heart-outline'}
          size={22}
          color={activeTab === 'saved' ? '#16A34A' : '#6B7280'}
        />
        {savedProductIds.length > 0 && <View style={styles.badgeDot} />}
        <Text style={[styles.tabLabel, activeTab === 'saved' && styles.tabLabelActive]}>
          {t('saved')}
        </Text>
      </TouchableOpacity>

      {/* My Ads / Listings Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'my_listings' })}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'my_listings' ? 'person' : 'person-outline'}
          size={22}
          color={activeTab === 'my_listings' ? '#16A34A' : '#6B7280'}
        />
        {myProductIds.length > 0 && <View style={styles.badgeDot} />}
        <Text style={[styles.tabLabel, activeTab === 'my_listings' && styles.tabLabelActive]}>
          {t('myAds')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabLabelActive: {
    color: '#16A34A',
    fontWeight: '800',
  },
  sellBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  badgeDot: {
    position: 'absolute',
    top: 4,
    right: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
