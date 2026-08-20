import React, { createContext, useContext, useState } from 'react';
import { Product, ProductCategory, ScreenType, SellerInfo, CartItem, OrderItem, NotificationItem } from '../types';
import { MOCK_PRODUCTS, MOCK_SELLERS } from '../data/mockProducts';

interface MarketplaceContextType {
  products: Product[];
  savedProductIds: string[];
  myProductIds: string[];
  cartItems: CartItem[];
  orders: OrderItem[];
  notifications: NotificationItem[];
  currentScreen: ScreenType;
  screenHistory: ScreenType[];
  contactModalProduct: Product | null;
  selectedLocation: { state: string; district: string; taluka?: string };
  searchQuery: string;
  cartCount: number;
  unreadNotificationsCount: number;
  
  navigateTo: (screen: ScreenType) => void;
  goBack: () => void;
  toggleSaveProduct: (id: string) => void;
  isProductSaved: (id: string) => boolean;
  addProduct: (productData: Omit<Product, 'id' | 'viewsCount' | 'postedDate'>) => Product;
  deleteProduct: (id: string) => void;
  openContactModal: (product: Product) => void;
  closeContactModal: () => void;
  setSelectedLocation: (loc: { state: string; district: string; taluka?: string }) => void;
  setSearchQuery: (q: string) => void;
  getProductById: (id: string) => Product | undefined;
  getSellerById: (id: string) => SellerInfo | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
  getProductsByCategory: (cat: ProductCategory) => Product[];

  // Cart & Orders & Notifications
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (deliveryMethod: 'pickup_at_mandi' | 'direct_farm_visit' | 'seller_delivery') => OrderItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Live Mandi Rate Update',
    message: 'Nashik APMC Onion rates rose to ₹2,850/Quintal (+₹150 today).',
    time: '10 min ago',
    isRead: false,
    type: 'mandi_rate',
    icon: 'trending-up'
  },
  {
    id: 'notif_2',
    title: 'New Onion Seedlings Nearby',
    message: 'Dr. Anand Shinde posted 85 Crates Fursungi Onion seedlings (1.8 km away).',
    time: '1 hour ago',
    isRead: false,
    type: 'deal',
    icon: 'sprout'
  },
  {
    id: 'notif_3',
    title: 'Direct Farmer Deal Verified',
    message: 'Your inquiry for Mahindra Tractor has been shared directly with seller Birender Hooda.',
    time: 'Yesterday',
    isRead: true,
    type: 'order',
    icon: 'checkmark-circle'
  }
];

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [savedProductIds, setSavedProductIds] = useState<string[]>(['prod_onion_01', 'prod_seeds_01']);
  const [myProductIds, setMyProductIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 2, selectedAt: 'Just now' }
  ]);
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'ord_101',
      product: MOCK_PRODUCTS[2] || MOCK_PRODUCTS[0], // Maize fodder
      quantity: 5,
      totalPrice: 1400,
      status: 'confirmed',
      orderDate: '19 Aug 2026',
      sellerPhone: '+91 98765 43210',
      sellerName: 'Sardar Gurpreet Singh',
      deliveryMethod: 'direct_farm_visit'
    }
  ]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>([{ name: 'home' }]);
  const [contactModalProduct, setContactModalProduct] = useState<Product | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ state: string; district: string; taluka?: string }>({
    state: 'All India',
    district: 'All Districts',
    taluka: 'All Talukas'
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentScreen = screenHistory[screenHistory.length - 1] || { name: 'home' };

  const navigateTo = (screen: ScreenType) => {
    setScreenHistory(prev => [...prev, screen]);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      setScreenHistory(prev => prev.slice(0, prev.length - 1));
    }
  };

  const toggleSaveProduct = (id: string) => {
    setSavedProductIds(prev => {
      const exists = prev.includes(id);
      return exists ? prev.filter(item => item !== id) : [...prev, id];
    });
  };

  const isProductSaved = (id: string): boolean => {
    return savedProductIds.includes(id);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'viewsCount' | 'postedDate'>): Product => {
    const newId = `user_prod_${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      viewsCount: 1,
      postedDate: 'Just now'
    };

    setProducts(prev => [newProduct, ...prev]);
    setMyProductIds(prev => [newId, ...prev]);
    return newProduct;
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setMyProductIds(prev => prev.filter(itemId => itemId !== id));
  };

  const openContactModal = (product: Product) => {
    setContactModalProduct(product);
  };

  const closeContactModal = () => {
    setContactModalProduct(null);
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id);
  };

  const getSellerById = (id: string): SellerInfo | undefined => {
    if (MOCK_SELLERS[id]) return MOCK_SELLERS[id];
    const match = products.find(p => p.seller.id === id);
    return match?.seller;
  };

  const getProductsBySeller = (sellerId: string): Product[] => {
    return products.filter(p => p.seller.id === sellerId);
  };

  const getProductsByCategory = (cat: ProductCategory): Product[] => {
    if (cat === 'all') return products;
    return products.filter(p => p.category === cat);
  };

  // Cart Handlers
  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.product.id === product.id);
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedAt: 'Just now' }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (deliveryMethod: 'pickup_at_mandi' | 'direct_farm_visit' | 'seller_delivery'): OrderItem[] => {
    const newOrders: OrderItem[] = cartItems.map(item => ({
      id: `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      product: item.product,
      quantity: item.quantity,
      totalPrice: item.product.price * item.quantity,
      status: 'confirmed',
      orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      sellerPhone: item.product.seller.phone,
      sellerName: item.product.seller.name,
      deliveryMethod
    }));

    setOrders(prev => [...newOrders, ...prev]);
    clearCart();
    return newOrders;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        savedProductIds,
        myProductIds,
        cartItems,
        orders,
        notifications,
        currentScreen,
        screenHistory,
        contactModalProduct,
        selectedLocation,
        searchQuery,
        cartCount,
        unreadNotificationsCount,
        navigateTo,
        goBack,
        toggleSaveProduct,
        isProductSaved,
        addProduct,
        deleteProduct,
        openContactModal,
        closeContactModal,
        setSelectedLocation,
        setSearchQuery,
        getProductById,
        getSellerById,
        getProductsBySeller,
        getProductsByCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = (): MarketplaceContextType => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
