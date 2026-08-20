export type ProductCategory = 
  | 'all'
  | 'plants_seedlings'
  | 'fodder_maize'
  | 'onion_seedlings'
  | 'chilli_seedlings'
  | 'cabbage_seedlings'
  | 'tomato_seedlings'
  | 'seeds'
  | 'fertilizers'
  | 'animal_feed'
  | 'farming_equipment'
  | 'crop_protection'
  | 'nursery_plants'
  | 'other_agri'
  | 'machinery'
  | 'pesticides'
  | 'crops'
  | 'livestock'
  | 'irrigation';

export interface CategoryInfo {
  id: ProductCategory;
  nameEn: string;
  nameHi: string;
  nameMr?: string;
  iconName: string;
  emoji: string;
  image: string;
  color: string;
  bgColor: string;
  count: number;
  descriptionEn: string;
  descriptionHi: string;
  descriptionMr?: string;
}

export interface SellerInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  whatsapp: string;
  village: string;
  district: string;
  state: string;
  mandiDistance: string;
  distanceKm?: number;
  rating: number;
  totalDeals: number;
  memberSince: string;
  isVerified: boolean;
  farmType: string;
  bio: string;
}

export interface ProductSpec {
  labelEn: string;
  labelHi: string;
  labelMr?: string;
  valueEn: string;
  valueHi: string;
  valueMr?: string;
  icon?: string;
}

export interface Product {
  id: string;
  title: string;
  titleHi: string;
  titleMr?: string;
  category: ProductCategory;
  subCategory: string;
  subCategoryHi: string;
  subCategoryMr?: string;
  price: number;
  unit: string;
  unitHi: string;
  unitMr?: string;
  isNegotiable: boolean;
  condition: 'new' | 'used' | 'certified_seed' | 'organic_produce';
  conditionLabelEn: string;
  conditionLabelHi: string;
  conditionLabelMr?: string;
  quantityAvailable: string;
  quantityAvailableHi: string;
  quantityAvailableMr?: string;
  minOrderQuantity?: string;
  harvestYearOrMfg: string;
  images: string[];
  description: string;
  descriptionHi: string;
  descriptionMr?: string;
  specs: ProductSpec[];
  seller: SellerInfo;
  location: {
    village: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
    landmark?: string;
    distanceKm?: number;
  };
  tags: string[];
  isFeatured?: boolean;
  isUrgent?: boolean;
  isPopular?: boolean;
  viewsCount: number;
  postedDate: string;
  organicCertified?: boolean;
  germinationRate?: string;
  warranty?: string;
  usageInstructionsEn?: string;
  usageInstructionsHi?: string;
  usageInstructionsMr?: string;
}

export interface FilterState {
  category: ProductCategory;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  state?: string;
  district?: string;
  taluka?: string;
  condition?: string;
  organicOnly?: boolean;
  verifiedOnly?: boolean;
  searchQuery?: string;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'newest' | 'distance';
}

export interface FarmerUser {
  id: string;
  name: string;
  phone: string;
  kisanId: string;
  state: string;
  district: string;
  taluka?: string;
  village: string;
  avatar?: string;
  isVerified: boolean;
  farmType: string;
  landSize?: string;
  memberSince: string;
  totalDeals: number;
  rating: number;
  pin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: 'confirmed' | 'connected_with_seller' | 'delivered' | 'cancelled';
  orderDate: string;
  sellerPhone: string;
  sellerName: string;
  deliveryMethod: 'pickup_at_mandi' | 'direct_farm_visit' | 'seller_delivery';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'mandi_rate' | 'order' | 'deal' | 'alert';
  icon: string;
}

export type ScreenType = 
  | { name: 'home' }
  | { name: 'category'; categoryId: ProductCategory; subCategory?: string }
  | { name: 'product_detail'; productId: string }
  | { name: 'sell' }
  | { name: 'seller_profile'; sellerId: string }
  | { name: 'saved' }
  | { name: 'my_listings' }
  | { name: 'search'; initialQuery?: string }
  | { name: 'safety_guide' }
  | { name: 'login'; redirectScreen?: ScreenType }
  | { name: 'account' }
  | { name: 'cart' }
  | { name: 'orders' };

export type Language = 'en' | 'hi' | 'mr';


