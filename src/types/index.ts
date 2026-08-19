export type ProductCategory = 
  | 'all'
  | 'seeds'
  | 'machinery'
  | 'fertilizers'
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
  };
  tags: string[];
  isFeatured?: boolean;
  isUrgent?: boolean;
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
  condition?: string;
  organicOnly?: boolean;
  verifiedOnly?: boolean;
  searchQuery?: string;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'newest' | 'distance';
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
  | { name: 'safety_guide' };

export type Language = 'en' | 'hi' | 'mr';
