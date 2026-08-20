import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const { currentScreen, navigateTo, cartCount, orders } = useMarketplace();
  const { isAuthenticated, currentUser } = useAuth();

  const activeTab = currentScreen.name;

  const handleProfilePress = () => {
    if (isAuthenticated) {
      navigateTo({ name: 'account' });
    } else {
      navigateTo({ name: 'login' });
    }
  };

  return (
    <View style={styles.navBar}>
      {/* 1. Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'home' })}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'home' ? 'home' : 'home-outline'}
          size={24}
          color={activeTab === 'home' ? '#16A34A' : '#6B7280'}
        />
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>
          {t('home')}
        </Text>
      </TouchableOpacity>

      {/* 2. Search Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'search' })}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'search' ? 'search' : 'search-outline'}
          size={24}
          color={activeTab === 'search' ? '#16A34A' : '#6B7280'}
        />
        <Text style={[styles.tabLabel, activeTab === 'search' && styles.tabLabelActive]}>
          {t('search')}
        </Text>
      </TouchableOpacity>

      {/* 3. Orders Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'orders' })}
        activeOpacity={0.7}
      >
        <View style={{ position: 'relative' }}>
          <Ionicons
            name={activeTab === 'orders' ? 'receipt' : 'receipt-outline'}
            size={24}
            color={activeTab === 'orders' ? '#16A34A' : '#6B7280'}
          />
          {orders.length > 0 && <View style={styles.ordersDot} />}
        </View>
        <Text style={[styles.tabLabel, activeTab === 'orders' && styles.tabLabelActive]}>
          {t('orders')}
        </Text>
      </TouchableOpacity>

      {/* 4. Cart Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => navigateTo({ name: 'cart' })}
        activeOpacity={0.7}
      >
        <View style={{ position: 'relative' }}>
          <Ionicons
            name={activeTab === 'cart' ? 'cart' : 'cart-outline'}
            size={24}
            color={activeTab === 'cart' ? '#16A34A' : '#6B7280'}
          />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
        <Text style={[styles.tabLabel, activeTab === 'cart' && styles.tabLabelActive]}>
          {t('cart')}
        </Text>
      </TouchableOpacity>

      {/* 5. Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={handleProfilePress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'account' || activeTab === 'login' ? 'person' : 'person-outline'}
          size={24}
          color={activeTab === 'account' || activeTab === 'login' ? '#16A34A' : '#6B7280'}
        />
        <Text style={[styles.tabLabel, (activeTab === 'account' || activeTab === 'login') && styles.tabLabelActive]}>
          {isAuthenticated ? (currentUser?.name.split(' ')[0] || t('profile')) : t('profile')}
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
    paddingHorizontal: 6,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabLabel: {
    fontSize: 10.5,
    marginTop: 2,
    fontWeight: '600',
    color: '#6B7280',
  },
  tabLabelActive: {
    color: '#16A34A',
    fontWeight: '800',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#DC2626',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  ordersDot: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
