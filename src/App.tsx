import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { LanguageProvider } from './context/LanguageContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Header } from './components/common/Header';
import { MandiTicker } from './components/common/MandiTicker';
import { BottomNav } from './components/common/BottomNav';
import { ContactModal } from './components/common/ContactModal';

// Screens
import { HomeScreen } from './components/screens/HomeScreen';
import { ProductDetailScreen } from './components/screens/ProductDetailScreen';
import { CategoryScreen } from './components/screens/CategoryScreen';
import { SellProductScreen } from './components/screens/SellProductScreen';
import { SellerProfileScreen } from './components/screens/SellerProfileScreen';
import { SavedScreen } from './components/screens/SavedScreen';
import { MyListingsScreen } from './components/screens/MyListingsScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { SafetyGuideScreen } from './components/screens/SafetyGuideScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen } = useMarketplace();

  const renderScreen = () => {
    switch (currentScreen.name) {
      case 'home':
        return <HomeScreen />;
      case 'product_detail':
        return <ProductDetailScreen productId={currentScreen.productId} />;
      case 'category':
        return (
          <CategoryScreen
            categoryId={currentScreen.categoryId}
            initialSubCategory={currentScreen.subCategory}
          />
        );
      case 'sell':
        return <SellProductScreen />;
      case 'seller_profile':
        return <SellerProfileScreen sellerId={currentScreen.sellerId} />;
      case 'saved':
        return <SavedScreen />;
      case 'my_listings':
        return <MyListingsScreen />;
      case 'search':
        return <SearchScreen initialQuery={currentScreen.initialQuery} />;
      case 'safety_guide':
        return <SafetyGuideScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isDetailOrSubScreen = 
    currentScreen.name === 'product_detail' || 
    currentScreen.name === 'seller_profile' || 
    currentScreen.name === 'sell' ||
    currentScreen.name === 'search' ||
    currentScreen.name === 'saved' ||
    currentScreen.name === 'my_listings' ||
    currentScreen.name === 'safety_guide' ||
    currentScreen.name === 'category';

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#15803D" />

      {/* Main Header & Mandi Ticker on Home */}
      {!isDetailOrSubScreen && (
        <View>
          <Header />
          <MandiTicker />
        </View>
      )}

      {/* Active Screen View */}
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>

      {/* Bottom Nav on non-detail screens */}
      {currentScreen.name !== 'product_detail' && <BottomNav />}

      {/* Global Direct Contact Modal */}
      <ContactModal />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#15803D',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
});

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MarketplaceProvider>
        <MainAppContent />
      </MarketplaceProvider>
    </LanguageProvider>
  );
};

export default App;
