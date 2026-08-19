import { CategoryInfo, Product, SellerInfo } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'all',
    nameEn: 'All Categories',
    nameHi: 'सभी श्रेणियां',
    nameMr: 'सर्व श्रेणी',
    iconName: 'LayoutGrid',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    count: 24,
    descriptionEn: 'Browse all agricultural listings from verified farmers',
    descriptionHi: 'सत्यापित किसानों से सभी कृषि लिस्टिंग देखें',
    descriptionMr: 'सत्यापित शेतकऱ्यांकडून सर्व शेतीविषयक उत्पादने पहा'
  },
  {
    id: 'seeds',
    nameEn: 'Seeds & Saplings',
    nameHi: 'बीज एवं पौधे',
    nameMr: 'बियाणे व रोपे',
    iconName: 'Sprout',
    color: '#15803D',
    bgColor: '#DCFCE7',
    count: 6,
    descriptionEn: 'Certified high-yield hybrid & organic seeds for all seasons',
    descriptionHi: 'सभी मौसमों के लिए प्रमाणित उच्च उपज वाले संकर व जैविक बीज',
    descriptionMr: 'सर्व हंगामांसाठी प्रमाणित आणि उच्च उत्पन्न देणारे बियाणे'
  },
  {
    id: 'machinery',
    nameEn: 'Machinery & Tools',
    nameHi: 'मशीनरी व उपकरण',
    nameMr: 'यंत्रसामग्री व अवजारे',
    iconName: 'Tractor',
    color: '#EA580C',
    bgColor: '#FFEDD5',
    count: 6,
    descriptionEn: 'Tractors, rotavators, seed drills, sprayers and implements',
    descriptionHi: 'ट्रैक्टर, रोटावेटर, सीड ड्रिल, स्प्रेयर और कृषि यंत्र',
    descriptionMr: 'ट्रॅक्टर, रोटाव्हेटर, पेरणी यंत्रे, फवारणी यंत्रे व अवजारे'
  },
  {
    id: 'fertilizers',
    nameEn: 'Fertilizers & Compost',
    nameHi: 'खाद एवं उर्वरक',
    nameMr: 'खते व कंपोस्ट',
    iconName: 'Leaf',
    color: '#059669',
    bgColor: '#D1FAE5',
    count: 4,
    descriptionEn: 'Organic vermicompost, bio-nutrients, nano urea & manures',
    descriptionHi: 'जैविक केंचुआ खाद, जैव-पोषक तत्व, नैनो यूरिया व देसी खाद',
    descriptionMr: 'सेंद्रिय गांडूळ खत, बायो-खते, नॅनो युरिया व शेणखत'
  },
  {
    id: 'pesticides',
    nameEn: 'Crop Protection',
    nameHi: 'फसल सुरक्षा',
    nameMr: 'पीक संरक्षण',
    iconName: 'ShieldCheck',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    count: 3,
    descriptionEn: 'Bio-pesticides, neem oils, fungicides & solar insect traps',
    descriptionHi: 'जैव कीटनाशक, नीम तेल, फफूंदनाशक और सोलर कीट ट्रैप',
    descriptionMr: 'जैविक कीटकनाशके, कडुनिंब तेल, बुरशीनाशके व सौर सापळे'
  },
  {
    id: 'crops',
    nameEn: 'Direct Harvest / Crops',
    nameHi: 'सीधी फसल बिक्री',
    nameMr: 'थेट शेतमाल विक्री',
    iconName: 'Wheat',
    color: '#D97706',
    bgColor: '#FEF3C7',
    count: 5,
    descriptionEn: 'Fresh wheat, paddy, pulses, onions, cotton & seasonal grains',
    descriptionHi: 'ताजा गेहूं, धान, दालें, प्याज, कपास एवं मौसमी अनाज',
    descriptionMr: 'धान्य, डाळी, कांदा, सोयाबीन, कापूस व फळे थेट शेतातून'
  },
  {
    id: 'livestock',
    nameEn: 'Dairy & Livestock Tools',
    nameHi: 'पशुपालन व डेयरी',
    iconName: 'Milk',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    count: 3,
    descriptionEn: 'Milking machines, stainless steel cans & cattle supplies',
    descriptionHi: 'मिल्किंग मशीनें, स्टेनलेस स्टील कैन व पशु देखभाल उपकरण'
  }
];

export const MOCK_SELLERS: Record<string, SellerInfo> = {
  'seller_1': {
    id: 'seller_1',
    name: 'Sardar Gurpreet Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    village: 'Khanna Kalan',
    district: 'Ludhiana',
    state: 'Punjab',
    mandiDistance: '4.5 km from Asia Largest Grain Market (Khanna Mandi)',
    rating: 4.9,
    totalDeals: 48,
    memberSince: 'March 2023',
    isVerified: true,
    farmType: 'Certified Seed Grower & Wheat Farmer (35 Acres)',
    bio: 'Practicing agriculture for 22 years. Winner of State Krishi Karman Award. All seeds tested in Punjab Agricultural University laboratory.'
  },
  'seller_2': {
    id: 'seller_2',
    name: 'Rameshwar Patidar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    phone: '+91 94250 88712',
    whatsapp: '919425088712',
    village: 'Pipaliya Mandi',
    district: 'Mandsaur',
    state: 'Madhya Pradesh',
    mandiDistance: '2.8 km from Neemuch/Mandsaur Krishi Upaj Mandi',
    rating: 4.8,
    totalDeals: 36,
    memberSince: 'August 2023',
    isVerified: true,
    farmType: 'Organic Garlic & Seed Producer (18 Acres)',
    bio: '100% chemical-free organic farming since 2018. We produce desi garlic, premium wheat, and authentic vermicompost directly from farm.'
  },
  'seller_3': {
    id: 'seller_3',
    name: 'Chaudhary Birender Hooda',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    phone: '+91 98120 54389',
    whatsapp: '919812054389',
    village: 'Sampla',
    district: 'Rohtak',
    state: 'Haryana',
    mandiDistance: '6.2 km from Rohtak New Grain Mandi',
    rating: 4.7,
    totalDeals: 29,
    memberSince: 'January 2024',
    isVerified: true,
    farmType: 'Agricultural Machinery & Custom Hiring Service',
    bio: 'Providing well-maintained agricultural machinery, tractors, rotavators, and implements. Every machine inspected and serviced before delivery.'
  },
  'seller_4': {
    id: 'seller_4',
    name: 'Dr. Anand Shinde',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    phone: '+91 98224 11209',
    whatsapp: '919822411209',
    village: 'Baramati Rural',
    district: 'Pune',
    state: 'Maharashtra',
    mandiDistance: '5.0 km from Baramati APMC Market',
    rating: 5.0,
    totalDeals: 62,
    memberSince: 'November 2022',
    isVerified: true,
    farmType: 'Bio-Fertilizer & Solar Agrotech Specialist',
    bio: 'M.Sc. Agriculture. Promoting organic soil enhancement, solar water pumps, and zero-chemical pest control across Maharashtra and Karnataka.'
  },
  'seller_5': {
    id: 'seller_5',
    name: 'Gopal Krishnan Reddy',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    phone: '+91 99490 32187',
    whatsapp: '919949032187',
    village: 'Miryalaguda',
    district: 'Nalgonda',
    state: 'Telangana',
    mandiDistance: '3.1 km from Miryalaguda Paddy Mandi',
    rating: 4.9,
    totalDeals: 41,
    memberSince: 'February 2023',
    isVerified: true,
    farmType: 'Paddy Specialist & Dairy Tech Farmer',
    bio: 'Specialized in premium basmati and sona masoori paddy cultivation, plus modern automated dairy farming implements.'
  }
};

export const MOCK_PRODUCTS: Product[] = [
  // SEEDS
  {
    id: 'prod_seeds_01',
    title: 'Sharbati Gold HD-2967 Certified Wheat Seeds (Certified Grade)',
    titleHi: 'शरबती गोल्ड HD-2967 प्रमाणित गेहूं बीज (ग्रेड-ए)',
    category: 'seeds',
    subCategory: 'Wheat Seeds',
    subCategoryHi: 'गेहूं बीज',
    price: 1350,
    unit: 'Bag (40 kg)',
    unitHi: 'बोरी (40 किग्रा)',
    isNegotiable: true,
    condition: 'certified_seed',
    conditionLabelEn: 'PAU Certified Grade-A',
    conditionLabelHi: 'प्रमाणित ग्रेड-ए',
    quantityAvailable: '120 Bags Available',
    quantityAvailableHi: '120 बोरी उपलब्ध',
    minOrderQuantity: '2 Bags',
    harvestYearOrMfg: 'Rabi 2026 Fresh Harvest',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'High-yielding HD-2967 certified Sharbati wheat seed, triple-cleaned and treated with fungicide (Thiram + Bavistin). High resistance to yellow and brown rust. Average yield is 22-26 quintals per acre under timely sown irrigated conditions with bold amber lustrous grains.',
    descriptionHi: 'उच्च उपज देने वाली HD-2967 प्रमाणित शरबती गेहूं बीज, तीन बार ग्रेडिंग और फफूंदनाशक से उपचारित। पीला एवं भूरा रतुआ रोग प्रतिरोधी। समय पर बुवाई करने पर 22 से 26 क्विंटल प्रति एकड़ की शानदार पैदावार।',
    specs: [
      { labelEn: 'Variety', labelHi: 'किस्म', valueEn: 'HD-2967 Sharbati Gold', valueHi: 'HD-2967 शरबती गोल्ड' },
      { labelEn: 'Germination Rate', labelHi: 'अंकुरण क्षमता', valueEn: '96% Lab Verified', valueHi: '96% लैब प्रमाणित' },
      { labelEn: 'Purity Level', labelHi: 'शुद्धता', valueEn: '99.2% Physical Purity', valueHi: '99.2% शुद्ध' },
      { labelEn: 'Maturity Duration', labelHi: 'पकने की अवधि', valueEn: '135 - 142 Days', valueHi: '135 - 142 दिन' },
      { labelEn: 'Seed Treatment', labelHi: 'बीज उपचार', valueEn: 'Treated with Vitavax + Trichoderma', valueHi: 'ट्राइकोडर्मा उपचारित' },
      { labelEn: 'Sowing Season', labelHi: 'बुवाई का समय', valueEn: '1 Nov to 25 Nov (Ideal)', valueHi: '1 से 25 नवंबर' }
    ],
    seller: MOCK_SELLERS['seller_1'],
    location: {
      village: 'Khanna Kalan',
      tehsil: 'Khanna',
      district: 'Ludhiana',
      state: 'Punjab',
      pincode: '141401',
      landmark: 'Near GT Road Toll Plaza'
    },
    tags: ['Wheat Seed', 'HD-2967', 'Sharbati', 'Rabi Season', 'Certified'],
    isFeatured: true,
    isUrgent: false,
    viewsCount: 342,
    postedDate: '2 days ago',
    organicCertified: false,
    germinationRate: '96%',
    usageInstructionsEn: 'Use 40 kg seed per acre for line sowing at 20 cm spacing. Ensure 4-5 irrigations.',
    usageInstructionsHi: 'लाइन बुवाई के लिए 40 किलो प्रति एकड़ बीज का उपयोग करें। 4-5 हल्की सिंचाई करें।'
  },
  {
    id: 'prod_seeds_02',
    title: 'Pusa 1121 Hybrid Basmati Paddy Seeds (Long Grain Export Quality)',
    titleHi: 'पूसा 1121 हाइब्रिड बासमती धान बीज (निर्यात गुणवत्ता)',
    category: 'seeds',
    subCategory: 'Paddy Seeds',
    subCategoryHi: 'धान बीज',
    price: 110,
    unit: 'Kg',
    unitHi: 'किग्रा',
    isNegotiable: true,
    condition: 'certified_seed',
    conditionLabelEn: 'IARI Foundation Seed',
    conditionLabelHi: 'आई.ए.आर.आई फाउंडेशन बीज',
    quantityAvailable: '450 Kg Available',
    quantityAvailableHi: '450 किग्रा उपलब्ध',
    minOrderQuantity: '10 Kg',
    harvestYearOrMfg: 'Kharif 2026 Batch',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Original Pusa 1121 Basmati seeds known for world-record cooked grain elongation (up to 22 mm). Sweet aroma, zero chalkiness, and high export market value. Suitable for direct seeding (DSR) as well as transplanting method.',
    descriptionHi: 'विश्व प्रसिद्ध पूसा 1121 बासमती धान बीज। पकाने पर 22 मिमी तक लंबा दाना, मनमोहक सुगंध और बेहतरीन मंडी भाव। सीधी बुवाई (DSR) और रोपाई दोनों के लिए उपयुक्त।',
    specs: [
      { labelEn: 'Variety', labelHi: 'किस्म', valueEn: 'Pusa Basmati 1121', valueHi: 'पूसा बासमती 1121' },
      { labelEn: 'Germination Rate', labelHi: 'अंकुरण दर', valueEn: '94%', valueHi: '94%' },
      { labelEn: 'Grain Length', labelHi: 'चावल की लंबाई', valueEn: '8.4 mm uncooked (21.5 mm cooked)', valueHi: '8.4 मिमी कच्चा' },
      { labelEn: 'Crop Duration', labelHi: 'फसल अवधि', valueEn: '140 - 145 Days', valueHi: '140 - 145 दिन' },
      { labelEn: 'Yield Potential', labelHi: 'अनुमानित पैदावार', valueEn: '18 - 22 Quintals / Acre', valueHi: '18-22 क्विंटल/एकड़' }
    ],
    seller: MOCK_SELLERS['seller_5'],
    location: {
      village: 'Miryalaguda Rural',
      tehsil: 'Miryalaguda',
      district: 'Nalgonda',
      state: 'Telangana',
      pincode: '508207',
      landmark: 'Near Rice Mill Industrial Estate'
    },
    tags: ['Paddy Seed', 'Basmati', 'Pusa 1121', 'Kharif', 'Export Grain'],
    isFeatured: true,
    isUrgent: false,
    viewsCount: 215,
    postedDate: 'Yesterday',
    germinationRate: '94%'
  },
  {
    id: 'prod_seeds_03',
    title: 'Pioneer 45S46 Hybrid High-Oil Mustard Seeds (सरसों बीज)',
    titleHi: 'पायनियर 45S46 हाइब्रिड सरसों बीज (41.5% तेल मात्रा)',
    category: 'seeds',
    subCategory: 'Mustard Seeds',
    subCategoryHi: 'सरसों बीज',
    price: 950,
    unit: 'Packet (1 kg)',
    unitHi: 'पैकेट (1 किग्रा)',
    isNegotiable: false,
    condition: 'new',
    conditionLabelEn: 'Company Sealed Pack',
    conditionLabelHi: 'कंपनी सीलबंद पैक',
    quantityAvailable: '35 Packets',
    quantityAvailableHi: '35 पैकेट उपलब्ध',
    harvestYearOrMfg: 'October 2025 Pack',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pioneer 45S46 is one of the highest oil yield mustard hybrids in India with 41-42% oil content. Heavy branching, shatter resistant pods, and strong tolerance to White Rust disease.',
    descriptionHi: 'भारत का सबसे लोकप्रिय पायनियर 45S46 हाइब्रिड सरसों बीज। 41-42% तेल की मात्रा, अत्यधिक शाखाएं और फली झड़ने से सुरक्षा।',
    specs: [
      { labelEn: 'Oil Content', labelHi: 'तेल की मात्रा', valueEn: '41.5% Guaranteed', valueHi: '41.5% गारंटी' },
      { labelEn: 'Seed Rate', labelHi: 'बीज दर', valueEn: '1.25 kg per Acre', valueHi: '1.25 किग्रा प्रति एकड़' },
      { labelEn: 'Plant Height', labelHi: 'पौधे की ऊंचाई', valueEn: '160 - 180 cm', valueHi: '160 - 180 सेमी' },
      { labelEn: 'Average Yield', labelHi: 'औसत उपज', valueEn: '12 - 14 Quintals / Acre', valueHi: '12-14 क्विंटल/एकड़' }
    ],
    seller: MOCK_SELLERS['seller_3'],
    location: {
      village: 'Sampla',
      tehsil: 'Rohtak',
      district: 'Rohtak',
      state: 'Haryana',
      pincode: '124501'
    },
    tags: ['Mustard', 'Pioneer 45S46', 'Sarson', 'Oilseed'],
    viewsCount: 180,
    postedDate: '3 days ago'
  },
  {
    id: 'prod_seeds_04',
    title: 'Desi Organic Pusa 372 Chickpea (Desi Chana) Seeds',
    titleHi: 'देसी जैविक पूसा 372 चना बीज (रोग रोधी)',
    category: 'seeds',
    subCategory: 'Pulses Seeds',
    subCategoryHi: 'दलहन बीज',
    price: 85,
    unit: 'Kg',
    unitHi: 'किग्रा',
    isNegotiable: true,
    condition: 'organic_produce',
    conditionLabelEn: 'NPOP Organic Certified',
    conditionLabelHi: 'प्रमाणित जैविक',
    quantityAvailable: '800 Kg',
    quantityAvailableHi: '800 किग्रा उपलब्ध',
    harvestYearOrMfg: '2026 Fresh Harvest',
    images: [
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Medium brown desi gram seeds suitable for unirrigated and rainfed farming. Highly tolerant to wilt disease. Great for both seed multiplication and direct dal preparation.',
    descriptionHi: 'मध्यम भूरे देसी चने के बीज, कम पानी और बारानी खेती के लिए सर्वोत्तम। उकठा रोग के प्रति सहनशील।',
    specs: [
      { labelEn: 'Variety', labelHi: 'किस्म', valueEn: 'Pusa 372 Desi Gram', valueHi: 'पूसा 372 देसी चना' },
      { labelEn: 'Germination', labelHi: 'अंकुरण', valueEn: '92%', valueHi: '92%' },
      { labelEn: 'Organic Status', labelHi: 'जैविक स्थिति', valueEn: '100% Chemical Free', valueHi: '100% रसायन मुक्त' }
    ],
    seller: MOCK_SELLERS['seller_2'],
    location: {
      village: 'Pipaliya Mandi',
      tehsil: 'Malhargarh',
      district: 'Mandsaur',
      state: 'Madhya Pradesh',
      pincode: '458664'
    },
    tags: ['Chana Seed', 'Chickpea', 'Organic Seed', 'Pulses'],
    viewsCount: 144,
    postedDate: '5 days ago',
    organicCertified: true
  },

  // MACHINERY & INSTRUMENTS
  {
    id: 'prod_mach_01',
    title: 'Mahindra 575 DI Power Plus 47 HP Tractor (2022 Model, Pristine Condition)',
    titleHi: 'महिंद्रा 575 DI पावर प्लस 47 HP ट्रैक्टर (2022 मॉडल, एकदम साफ)',
    category: 'machinery',
    subCategory: 'Tractors',
    subCategoryHi: 'ट्रैक्टर',
    price: 465000,
    unit: 'Complete Vehicle',
    unitHi: 'पूरा ट्रैक्टर',
    isNegotiable: true,
    condition: 'used',
    conditionLabelEn: 'Single Hand Driven (1,150 Hrs)',
    conditionLabelHi: 'एक हाथ चला (1,150 घंटे)',
    quantityAvailable: '1 Unit',
    quantityAvailableHi: '1 यूनिट उपलब्ध',
    harvestYearOrMfg: '2022 Manufacturing',
    images: [
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Mahindra 575 DI Power Plus 47 Horsepower, 4-cylinder engine, oil-immersed brakes, power steering, dual-clutch, and high fuel efficiency. Complete original paint, zero mechanical issues, brand new rear MRF tyres (90% grip), clean RC with Punjab registration.',
    descriptionHi: 'महिंद्रा 575 DI पावर प्लस 47 एचपी, 4 सिलेंडर इंजन, तेल में डूबे ब्रेक, पावर स्टीयरिंग, ड्यूल क्लच और बहुत कम डीजल खपत। पूरे ओरिजिनल रंग में, नए एमआरएफ टायर (90%), पंजाब नंबर की साफ आरसी।',
    specs: [
      { labelEn: 'Horsepower', labelHi: 'इंजन क्षमता', valueEn: '47 HP @ 1900 RPM', valueHi: '47 एचपी' },
      { labelEn: 'Hours Run', labelHi: 'मीटर रीडिंग', valueEn: '1,150 Genuine Hours', valueHi: '1,150 घंटे' },
      { labelEn: 'No. of Cylinders', labelHi: 'सिलेंडर संख्या', valueEn: '4 Cylinders (2730 CC)', valueHi: '4 सिलेंडर' },
      { labelEn: 'Lifting Capacity', labelHi: 'हाइड्रोलिक क्षमता', valueEn: '1,600 kg (Hydraulic Lift)', valueHi: '1600 किग्रा' },
      { labelEn: 'Tyre Condition', labelHi: 'टायर की स्थिति', valueEn: 'Front 80%, Rear 90%', valueHi: 'आगे 80%, पीछे 90%' },
      { labelEn: 'Insurance & RC', labelHi: 'बीमा व कागजात', valueEn: 'Valid Comprehensive Insurance', valueHi: 'वैध बीमा एवं आरसी' }
    ],
    seller: MOCK_SELLERS['seller_3'],
    location: {
      village: 'Sampla Bypass',
      tehsil: 'Rohtak',
      district: 'Rohtak',
      state: 'Haryana',
      pincode: '124501',
      landmark: 'Near Kisan Seva Kendra, Delhi-Rohtak Highway'
    },
    tags: ['Mahindra 575', 'Tractor', '47 HP', 'Used Tractor', 'Farm Machine'],
    isFeatured: true,
    isUrgent: true,
    viewsCount: 890,
    postedDate: 'Just now'
  },
  {
    id: 'prod_mach_02',
    title: 'Fieldking Maxx 7-Feet Heavy Duty Multi-Speed Rotavator',
    titleHi: 'फील्डकिंग मैक्स 7-फीट हैवी ड्यूटी मल्टी-स्पीड रोटावेटर',
    category: 'machinery',
    subCategory: 'Rotavator / Tillage',
    subCategoryHi: 'रोटावेटर',
    price: 88000,
    unit: 'Complete Set with PTO Shaft',
    unitHi: 'पीटीओ शाफ्ट सहित सेट',
    isNegotiable: true,
    condition: 'used',
    conditionLabelEn: 'Excellent Condition (1 Season Used)',
    conditionLabelHi: '1 सीजन उपयोग (शानदार स्थिति)',
    quantityAvailable: '1 Piece',
    quantityAvailableHi: '1 पीस उपलब्ध',
    harvestYearOrMfg: '2024 Model',
    images: [
      'https://images.unsplash.com/photo-1595838728639-4458f288b857?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Fieldking 7 feet (48 Boron steel L-type blades) multi-speed gearbox rotavator. Ideal for 45-55 HP tractors. Ensures ultra-fine seedbed preparation in single pass, saves 20% diesel. Heavy duty side gear drive.',
    descriptionHi: 'फील्डकिंग 7 फीट (48 बोरोन स्टील एल-ब्लेड) मल्टी स्पीड गियरबॉक्स रोटावेटर। 45 से 55 एचपी ट्रैक्टर के लिए उत्तम। एक ही चक्कर में मिट्टी को भुरभुरा बनाता है।',
    specs: [
      { labelEn: 'Working Width', labelHi: 'कार्य चौड़ाई', valueEn: '7 Feet (210 cm)', valueHi: '7 फीट' },
      { labelEn: 'No. of Blades', labelHi: 'ब्लेड की संख्या', valueEn: '48 Boron Steel L-Type', valueHi: '48 बोरोन स्टील' },
      { labelEn: 'Tractor Required', labelHi: 'आवश्यक ट्रैक्टर', valueEn: '45 to 60 HP', valueHi: '45 - 60 एचपी' },
      { labelEn: 'Gearbox Type', labelHi: 'गियरबॉक्स', valueEn: 'Multi-Speed with Heavy Cast Body', valueHi: 'मल्टी स्पीड' }
    ],
    seller: MOCK_SELLERS['seller_1'],
    location: {
      village: 'Khanna Kalan',
      tehsil: 'Khanna',
      district: 'Ludhiana',
      state: 'Punjab',
      pincode: '141401'
    },
    tags: ['Rotavator', 'Fieldking', '7 Feet', 'Tillage Equipment'],
    viewsCount: 420,
    postedDate: '1 day ago'
  },
  {
    id: 'prod_mach_03',
    title: 'National 9-Tyne Automatic Seed Cum Fertilizer Drill Machine',
    titleHi: 'नेशनल 9-टाइन ऑटोमैटिक सीड कम फर्टिलाइजर ड्रिल मशीन',
    category: 'machinery',
    subCategory: 'Sowing Equipment',
    subCategoryHi: 'बुवाई यंत्र',
    price: 42000,
    unit: 'Piece',
    unitHi: 'मशीन',
    isNegotiable: true,
    condition: 'new',
    conditionLabelEn: 'Brand New (Subsidy Approved)',
    conditionLabelHi: 'बिल्कुल नया (सब्सिडी स्वीकृत)',
    quantityAvailable: '3 Units',
    quantityAvailableHi: '3 यूनिट उपलब्ध',
    harvestYearOrMfg: '2026 Batch',
    images: [
      'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Automatic 9-tyne tractor operated seed cum fertilizer drill with separate dual compartments for wheat/mustard/gram seeds and DAP fertilizer. Adjustable row-to-row spacing and depth control wheels for uniform germination.',
    descriptionHi: 'ट्रैक्टर चालित 9-टाइन स्वचालित बीज एवं खाद बुवाई मशीन। गेहूं, चना, सरसों बीज और खाद के लिए अलग-अलग बॉक्स। गहराई नियंत्रण पहियों से समान अंकुरण।',
    specs: [
      { labelEn: 'Tynes', labelHi: 'टाइन संख्या', valueEn: '9 Heavy Carbon Steel Tynes', valueHi: '9 टाइन' },
      { labelEn: 'Row Spacing', labelHi: 'कतार दूरी', valueEn: 'Adjustable 6 to 9 inches', valueHi: '6 से 9 इंच एडजस्टेबल' },
      { labelEn: 'Capacity', labelHi: 'क्षमता', valueEn: '50 kg Seed + 50 kg Fertilizer', valueHi: '50 किग्रा बीज + 50 किग्रा खाद' },
      { labelEn: 'Tractor Power', labelHi: 'आवश्यक ट्रैक्टर', valueEn: '35 HP and above', valueHi: '35 एचपी व अधिक' }
    ],
    seller: MOCK_SELLERS['seller_3'],
    location: {
      village: 'Sampla',
      tehsil: 'Rohtak',
      district: 'Rohtak',
      state: 'Haryana',
      pincode: '124501'
    },
    tags: ['Seed Drill', 'Sowing Machine', 'Zero Till', 'Wheat Planter'],
    viewsCount: 310,
    postedDate: '4 days ago'
  },
  {
    id: 'prod_mach_04',
    title: 'Neptune 16-Liter Dual Motor 12V 12Ah Battery Knapsack Sprayer Pump',
    titleHi: 'नेपच्यून 16-लीटर ड्यूल मोटर 12V बैटरी स्प्रेयर पंप',
    category: 'machinery',
    subCategory: 'Sprayers',
    subCategoryHi: 'स्प्रेयर पंप',
    price: 3200,
    unit: 'Complete Set (Gun + 4 Nozzles + Charger)',
    unitHi: 'पूरा सेट',
    isNegotiable: false,
    condition: 'new',
    conditionLabelEn: 'Brand New with 6 Months Battery Warranty',
    conditionLabelHi: 'नया (6 माह वारंटी)',
    quantityAvailable: '15 Units',
    quantityAvailableHi: '15 यूनिट उपलब्ध',
    harvestYearOrMfg: '2026 Model',
    images: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6910609a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'High-pressure dual motor 16L agricultural knapsack sprayer pump. Heavy duty 12V 12Ah lead-acid battery gives 25-30 tanks per single charge. Comes with stainless steel extendable lance, 4 brass nozzles, and fast regulator.',
    descriptionHi: '16 लीटर क्षमता वाला शक्तिशाली ड्यूल मोटर बैटरी स्प्रेयर पंप। एक चार्ज में 25-30 टंकी स्प्रे। पीतल के 4 नोजल और एसएस की लंबी रॉड साथ में।',
    specs: [
      { labelEn: 'Tank Capacity', labelHi: 'टंकी क्षमता', valueEn: '16 Litres (HDPE)', valueHi: '16 लीटर' },
      { labelEn: 'Battery', labelHi: 'बैटरी', valueEn: '12V 12Ah Rechargeable', valueHi: '12V 12Ah' },
      { labelEn: 'Pressure', labelHi: 'दबाव', valueEn: '130 PSI Dual Motor', valueHi: '130 PSI' },
      { labelEn: 'Spray Range', labelHi: 'छिड़काव दूरी', valueEn: 'Up to 22 Feet High', valueHi: '22 फीट तक' }
    ],
    seller: MOCK_SELLERS['seller_4'],
    location: {
      village: 'Baramati Rural',
      tehsil: 'Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '413102'
    },
    tags: ['Sprayer Pump', 'Battery Sprayer', 'Agriculture Tools'],
    viewsCount: 275,
    postedDate: '2 days ago'
  },
  {
    id: 'prod_mach_05',
    title: 'Shakti 5 HP AC Solar Powered Submersible Agriculture Water Pump',
    titleHi: 'शक्ति 5 HP सोलर संचालित सबमर्सिबल कृषि जल पंप',
    category: 'machinery',
    subCategory: 'Solar & Irrigation',
    subCategoryHi: 'सोलर व सिंचाई',
    price: 135000,
    unit: 'Complete System (Pump + VFD Controller)',
    unitHi: 'पूरा सिस्टम',
    isNegotiable: true,
    condition: 'used',
    conditionLabelEn: '1.5 Years Old (Flawless Working)',
    conditionLabelHi: '1.5 साल उपयोग (शानदार चालू)',
    quantityAvailable: '1 Complete Set',
    quantityAvailableHi: '1 सेट उपलब्ध',
    harvestYearOrMfg: '2024 Installation',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'High efficiency 5 HP solar submersible pump set with smart MPPT Variable Frequency Drive (VFD) controller. Pumps up to 1,50,000 liters of water daily even on cloudy days. Zero electricity bill.',
    descriptionHi: '5 एचपी का शक्ति सोलर सबमर्सिबल वाटर पंप और स्मार्ट VFD कंट्रोलर। प्रतिदिन 1.5 लाख लीटर पानी की आपूर्ति। बिजली बिल का कोई झंझट नहीं।',
    specs: [
      { labelEn: 'Motor Power', labelHi: 'मोटर क्षमता', valueEn: '5 HP (3.7 kW) AC Submersible', valueHi: '5 एचपी सबमर्सिबल' },
      { labelEn: 'Discharge Head', labelHi: 'पानी खींचने की गहराई', valueEn: 'Up to 320 Feet Head', valueHi: '320 फीट तक' },
      { labelEn: 'Controller', labelHi: 'कंट्रोलर', valueEn: 'IP65 Weatherproof MPPT VFD', valueHi: 'स्मार्ट MPPT VFD' },
      { labelEn: 'Water Output', labelHi: 'पानी डिस्चार्ज', valueEn: '250-300 Liters / Minute', valueHi: '250-300 ली./मिनट' }
    ],
    seller: MOCK_SELLERS['seller_4'],
    location: {
      village: 'Baramati',
      tehsil: 'Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '413102'
    },
    tags: ['Solar Pump', 'Submersible', 'Irrigation', '5 HP Pump'],
    viewsCount: 512,
    postedDate: '3 days ago'
  },
  {
    id: 'prod_mach_06',
    title: 'Heavy Duty 3 HP Electric Motor Chaff Cutter (टोका / कुट्टी मशीन)',
    titleHi: 'हैवी ड्यूटी 3 HP मोटर चारा कुट्टी मशीन (टोका)',
    category: 'machinery',
    subCategory: 'Livestock Machinery',
    subCategoryHi: 'चारा काटने की मशीन',
    price: 24500,
    unit: 'Complete Machine with Copper Motor',
    unitHi: '3 HP मोटर सहित',
    isNegotiable: true,
    condition: 'new',
    conditionLabelEn: 'Brand New with 3 HP 100% Copper Motor',
    conditionLabelHi: 'नया (100% तांबा मोटर)',
    quantityAvailable: '4 Units',
    quantityAvailableHi: '4 यूनिट उपलब्ध',
    harvestYearOrMfg: '2026',
    images: [
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Heavy duty 3-blade automated chaff cutter with reverse-forward gear system. Cuts dry and green fodder (Jowar, Bajra, Sugarcane tops, Wheat straw) at 800-1000 kg/hour capacity. 100% pure copper winding 3HP single-phase motor.',
    descriptionHi: 'रिवर्स-फॉरवर्ड गियर वाली 3-ब्लेड हैवी ड्यूटी कुट्टी मशीन। हरा व सूखा चारा (बाजरा, ज्वार, पराली) 800-1000 किलो प्रति घंटा काटने की क्षमता। 3 एचपी सिंगल फेज तांबा मोटर।',
    specs: [
      { labelEn: 'Motor', labelHi: 'मोटर', valueEn: '3 HP Single Phase (Copper)', valueHi: '3 HP सिंगल फेज तांबा' },
      { labelEn: 'Blades', labelHi: 'ब्लेड', valueEn: '3 High Carbon Steel Blades', valueHi: '3 स्टील ब्लेड' },
      { labelEn: 'Output Capacity', labelHi: 'क्षमता', valueEn: '900 kg / hour', valueHi: '900 किग्रा / घंटा' },
      { labelEn: 'Safety Gear', labelHi: 'सुरक्षा गियर', valueEn: 'Reverse-Forward Safety Lever', valueHi: 'रिवर्स-फॉरवर्ड गियर' }
    ],
    seller: MOCK_SELLERS['seller_3'],
    location: {
      village: 'Sampla',
      tehsil: 'Rohtak',
      district: 'Rohtak',
      state: 'Haryana',
      pincode: '124501'
    },
    tags: ['Chaff Cutter', 'Toka Machine', 'Dairy Tools', 'Fodder'],
    viewsCount: 388,
    postedDate: '5 days ago'
  },

  // FERTILIZERS & SOIL HEALTH
  {
    id: 'prod_fert_01',
    title: '100% Pure Organic Australian Earthworm Vermicompost (केंचुआ खाद)',
    titleHi: '100% शुद्ध जैविक केंचुआ खाद (वर्मी कम्पोस्ट) 50 किग्रा बोरी',
    category: 'fertilizers',
    subCategory: 'Organic Compost',
    subCategoryHi: 'जैविक खाद',
    price: 360,
    unit: 'Bag (50 kg)',
    unitHi: 'बोरी (50 किग्रा)',
    isNegotiable: true,
    condition: 'organic_produce',
    conditionLabelEn: '100% Organic (Tested NPK)',
    conditionLabelHi: '100% जैविक (NPK परीक्षित)',
    quantityAvailable: '300 Bags Available (Trolley Load Available)',
    quantityAvailableHi: '300 बोरी (ट्रॉली लोड भी उपलब्ध)',
    minOrderQuantity: '5 Bags',
    harvestYearOrMfg: 'Fresh Batch Feb 2026',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d6910609a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Odorless, dark brown granular vermicompost prepared from pure cow dung using Eisenia Foetida earthworms. Rich in beneficial microbes, Nitrogen, Phosphorus, Potassium, and micronutrients. Improves soil water retention and crop root depth.',
    descriptionHi: 'देसी गाय के गोबर से आइसीनिया फोटिडा केंचुओं द्वारा निर्मित शुद्ध भुरभुरी जैविक खाद। नाइट्रोजन, फास्फोरस, पोटाश एवं लाभकारी सूक्ष्म जीवाणुओं से भरपूर। जमीन की उपजाऊ शक्ति दोगुना करे।',
    specs: [
      { labelEn: 'Moisture Content', labelHi: 'नमी की मात्रा', valueEn: '18 - 22%', valueHi: '18 - 22%' },
      { labelEn: 'Organic Carbon', labelHi: 'ऑर्गेनिक कार्बन', valueEn: '16.5%', valueHi: '16.5%' },
      { labelEn: 'Nitrogen (N)', labelHi: 'नाइट्रोजन', valueEn: '1.8%', valueHi: '1.8%' },
      { labelEn: 'Phosphorus (P)', labelHi: 'फास्फोरस', valueEn: '1.2%', valueHi: '1.2%' },
      { labelEn: 'Potassium (K)', labelHi: 'पोटाश', valueEn: '1.5%', valueHi: '1.5%' }
    ],
    seller: MOCK_SELLERS['seller_2'],
    location: {
      village: 'Pipaliya Mandi',
      tehsil: 'Malhargarh',
      district: 'Mandsaur',
      state: 'Madhya Pradesh',
      pincode: '458664'
    },
    tags: ['Vermicompost', 'Organic Fertilizer', 'Kechua Khad', 'Soil Health'],
    isFeatured: true,
    viewsCount: 460,
    postedDate: '1 day ago',
    organicCertified: true
  },
  {
    id: 'prod_fert_02',
    title: 'IFFCO Nano Urea (500ml) & Nano DAP Liquid Fertilizer Pack',
    titleHi: 'इफको नैनो यूरिया व नैनो डीएपी लिक्विड खाद पैक (500ml)',
    category: 'fertilizers',
    subCategory: 'Bio Fertilizers',
    subCategoryHi: 'जैव उर्वरक',
    price: 850,
    unit: 'Combo Pack (1 Bottle Each)',
    unitHi: 'कॉम्बो पैक (2 बोतल)',
    isNegotiable: false,
    condition: 'new',
    conditionLabelEn: 'Original Sealed IFFCO Stock',
    conditionLabelHi: 'ओरिजिनल इफको सील पैक',
    quantityAvailable: '50 Packs',
    quantityAvailableHi: '50 पैक उपलब्ध',
    harvestYearOrMfg: 'Jan 2026 Batch',
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d6910609a?w=800&auto=format&fit=crop&q=80'
    ],
    description: '1 bottle of 500ml Nano Urea replaces one 45 kg bag of conventional urea! Increases crop yield by 8-10%, cuts transport costs, and prevents soil acidity. Spray directly on leaves.',
    descriptionHi: '500ml नैनो यूरिया की एक बोतल पारंपरिक 45 किलो यूरिया बोरी के बराबर है! फसलों में पत्तियों पर सीधा छिड़काव करें। पैदावार में 8-10% वृद्धि।',
    specs: [
      { labelEn: 'Total Nitrogen', labelHi: 'कुल नाइट्रोजन', valueEn: '4.0% w/v Nanoparticles', valueHi: '4.0% नैनो कण' },
      { labelEn: 'Dosage', labelHi: 'खुराक', valueEn: '2-4 ml per liter of clean water', valueHi: '2-4 मिली प्रति लीटर' },
      { labelEn: 'Bottle Volume', labelHi: 'बोतल मात्रा', valueEn: '500 ml each', valueHi: '500 मिली' }
    ],
    seller: MOCK_SELLERS['seller_4'],
    location: {
      village: 'Baramati',
      tehsil: 'Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '413102'
    },
    tags: ['IFFCO', 'Nano Urea', 'Nano DAP', 'Liquid Fertilizer'],
    viewsCount: 390,
    postedDate: '3 days ago'
  },
  {
    id: 'prod_fert_03',
    title: 'Pure Cold-Pressed Neem Cake Powder (नीम खली पाउडर - 100% शुद्ध)',
    titleHi: 'शुद्ध कोल्ड-प्रेस्ड नीम खली पाउडर (कीट रोधी व भूमि सुधारक)',
    category: 'fertilizers',
    subCategory: 'Organic Cake',
    subCategoryHi: 'जैविक खली',
    price: 1100,
    unit: 'Bag (40 kg)',
    unitHi: 'बोरी (40 किग्रा)',
    isNegotiable: true,
    condition: 'organic_produce',
    conditionLabelEn: 'High Azadirachtin Content',
    conditionLabelHi: 'उच्च एजाडिराक्टिन मात्रा',
    quantityAvailable: '80 Bags',
    quantityAvailableHi: '80 बोरी उपलब्ध',
    harvestYearOrMfg: '2026 Fresh Production',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Neem cake is a dual-action organic fertilizer and soil pest repellent. Protects roots from termites, white grubs, and nematodes while providing sustained organic nitrogen.',
    descriptionHi: 'नीम खली खाद और कीटनाशक दोनों का काम करती है। दीमक, सफेद लट और निमेटोड से जड़ों की रक्षा करती है और जमीन में लंबे समय तक नाइट्रोजन प्रदान करती है।',
    specs: [
      { labelEn: 'Azadirachtin', labelHi: 'एजाडिराक्टिन', valueEn: 'Min 1200 PPM', valueHi: 'न्यूनतम 1200 PPM' },
      { labelEn: 'Form', labelHi: 'रूप', valueEn: 'Micro Pulverized Powder', valueHi: 'बारीक पाउडर' },
      { labelEn: 'Application', labelHi: 'प्रयोग', valueEn: '100-150 kg per acre during field prep', valueHi: '100-150 किग्रा/एकड़' }
    ],
    seller: MOCK_SELLERS['seller_2'],
    location: {
      village: 'Pipaliya Mandi',
      district: 'Mandsaur',
      state: 'Madhya Pradesh',
      tehsil: 'Malhargarh',
      pincode: '458664'
    },
    tags: ['Neem Cake', 'Neem Khali', 'White Grub Control', 'Organic'],
    viewsCount: 220,
    postedDate: '4 days ago',
    organicCertified: true
  },

  // CROP PROTECTION
  {
    id: 'prod_pest_01',
    title: 'Organic Cold-Pressed Neem Oil 10,000 PPM Bio-Pesticide (5 Litres)',
    titleHi: 'जैविक कोल्ड-प्रेस्ड नीम तेल 10,000 PPM कीटनाशक (5 लीटर कैन)',
    category: 'pesticides',
    subCategory: 'Bio Pesticides',
    subCategoryHi: 'जैव कीटनाशक',
    price: 1850,
    unit: 'Can (5 Litres)',
    unitHi: 'कैन (5 लीटर)',
    isNegotiable: true,
    condition: 'organic_produce',
    conditionLabelEn: 'Certified 10,000 PPM Active',
    conditionLabelHi: 'प्रमाणित 10,000 PPM',
    quantityAvailable: '40 Cans',
    quantityAvailableHi: '40 कैन उपलब्ध',
    harvestYearOrMfg: '2026 Batch',
    images: [
      'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592417817098-8f3d6910609a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Water-soluble organic neem oil 10,000 PPM concentration with natural emulsifier. Effective against aphids, jassids, thrips, bollworms, whiteflies, and powdery mildew without harming honeybees and beneficial insects.',
    descriptionHi: 'पानी में घुलनशील 10,000 PPM जैविक नीम तेल। माहू, तेला, थ्रिप्स, इल्ली, सफेद मक्खी पर अचूक वार। मधुमक्खियों और मित्र कीटों के लिए पूरी तरह सुरक्षित।',
    specs: [
      { labelEn: 'Active Ingredient', labelHi: 'सक्रिय तत्व', valueEn: 'Azadirachtin 10,000 PPM (1.0% EC)', valueHi: 'एजाडिराक्टिन 10,000 PPM' },
      { labelEn: 'Dilution Ratio', labelHi: 'घोल अनुपात', valueEn: '3-5 ml per liter water', valueHi: '3-5 मिली प्रति लीटर' },
      { labelEn: 'Organic Certificate', labelHi: 'जैविक प्रमाण', valueEn: 'APEDA Approved for Organic Farming', valueHi: 'APEDA स्वीकृत' }
    ],
    seller: MOCK_SELLERS['seller_4'],
    location: {
      village: 'Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      tehsil: 'Baramati',
      pincode: '413102'
    },
    tags: ['Neem Oil', 'Bio Pesticide', 'Organic Pest Control', 'Aphid Control'],
    viewsCount: 310,
    postedDate: '2 days ago',
    organicCertified: true
  },
  {
    id: 'prod_pest_02',
    title: 'Automatic Solar LED Insect Light Trap for Cotton & Paddy Fields',
    titleHi: 'ऑटोमैटिक सोलर एलईडी कीट ट्रैप (कपास व धान के लिए)',
    category: 'pesticides',
    subCategory: 'Pest Traps',
    subCategoryHi: 'कीट ट्रैप',
    price: 2600,
    unit: 'Complete Solar Unit with Stand',
    unitHi: 'सोलर यूनिट स्टैंड सहित',
    isNegotiable: false,
    condition: 'new',
    conditionLabelEn: 'New with 1 Year Warranty',
    conditionLabelHi: 'नया (1 साल वारंटी)',
    quantityAvailable: '20 Units',
    quantityAvailableHi: '20 यूनिट उपलब्ध',
    harvestYearOrMfg: '2026',
    images: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Automatic dusk-to-dawn UV LED solar insect trap. Traps and eliminates nocturnal pests like Pink Bollworm, armyworms, stem borers, and moths without any chemicals. Covers 1-1.5 acres per trap.',
    descriptionHi: 'शाम होते ही अपने आप चालू होने वाला सोलर कीट ट्रैप। गुलाबी सुंडी, तना छेदक और अन्य हानिकारक कीटों को बिना दवा के आकर्षित कर नष्ट करता है। 1 ट्रैप 1.5 एकड़ के लिए पर्याप्त।',
    specs: [
      { labelEn: 'Solar Panel', labelHi: 'सोलर पैनल', valueEn: '10W Polycrystalline Panel', valueHi: '10W सोलर पैनल' },
      { labelEn: 'Battery', labelHi: 'बैटरी', valueEn: 'Lithium Ferro Phosphate (LiFePO4)', valueHi: 'लिथियम बैटरी' },
      { labelEn: 'Coverage Area', labelHi: 'कवर क्षेत्र', valueEn: '1.5 Acres', valueHi: '1.5 एकड़' }
    ],
    seller: MOCK_SELLERS['seller_4'],
    location: {
      village: 'Baramati',
      district: 'Pune',
      state: 'Maharashtra',
      tehsil: 'Baramati',
      pincode: '413102'
    },
    tags: ['Solar Light Trap', 'Pink Bollworm', 'Pest Trap', 'Zero Chemical'],
    viewsCount: 290,
    postedDate: '6 days ago'
  },

  // FRESH BULK CROPS DIRECT FROM FARM
  {
    id: 'prod_crop_01',
    title: 'Grade-A MP Sharbati Wheat Bulk Direct Farm Harvest (80 Quintals Lot)',
    titleHi: 'ग्रेड-ए एमपी शरबती गेहूं थोक खेत से सीधा (80 क्विंटल लॉट)',
    category: 'crops',
    subCategory: 'Wheat Crop',
    subCategoryHi: 'गेहूं फसल',
    price: 3200,
    unit: 'Quintal (100 kg)',
    unitHi: 'क्विंटल (100 किग्रा)',
    isNegotiable: true,
    condition: 'organic_produce',
    conditionLabelEn: 'Sun-Dried & Cleaned',
    conditionLabelHi: 'धूप में सुखाया व साफ किया',
    quantityAvailable: '80 Quintals (8,000 kg)',
    quantityAvailableHi: '80 क्विंटल (8,000 किग्रा)',
    minOrderQuantity: '10 Quintals',
    harvestYearOrMfg: 'Fresh 2026 Harvest',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Golden shining, heavyweight Sharbati wheat grown in the black fertile soils of Malwa region. Sweet taste, high protein (13.5%), excellent gluten for soft chapatis. Completely clean, stones and dust removed.',
    descriptionHi: 'मालवा की काली उपजाऊ मिट्टी में उपजा सुनहरा भारी शरबती गेहूं। मीठा स्वाद, 13.5% प्रोटीन और नरम रोटियों के लिए सर्वोत्तम। एकदम साफ, धूल-कंकड़ रहित।',
    specs: [
      { labelEn: 'Moisture Level', labelHi: 'नमी स्तर', valueEn: '9.8% (Safe for Long Storage)', valueHi: '9.8% (सुरक्षित भंडारण)' },
      { labelEn: 'Protein Content', labelHi: 'प्रोटीन मात्रा', valueEn: '13.5%', valueHi: '13.5%' },
      { labelEn: 'Foreign Matter', labelHi: 'अशुद्धता', valueEn: 'Less than 0.3%', valueHi: '0.3% से कम' }
    ],
    seller: MOCK_SELLERS['seller_2'],
    location: {
      village: 'Pipaliya Mandi',
      district: 'Mandsaur',
      state: 'Madhya Pradesh',
      tehsil: 'Malhargarh',
      pincode: '458664'
    },
    tags: ['Sharbati Wheat', 'Bulk Grain', 'Wholesale Wheat', 'MP Wheat'],
    isFeatured: true,
    isUrgent: true,
    viewsCount: 740,
    postedDate: 'Today'
  },
  {
    id: 'prod_crop_02',
    title: 'Fresh Desi Organic Mandsaur Garlic (देसी लहसुन थोक - मोटा दाना)',
    titleHi: 'ताजा देसी जैविक मंदसौर लहसुन (मोटा दाना थोक - 25 क्विंटल)',
    category: 'crops',
    subCategory: 'Garlic / Spices',
    subCategoryHi: 'लहसुन व मसाले',
    price: 14500,
    unit: 'Quintal (100 kg)',
    unitHi: 'क्विंटल (100 किग्रा)',
    isNegotiable: true,
    condition: 'organic_produce',
    conditionLabelEn: 'Extra Bold Climax Pods',
    conditionLabelHi: 'एक्स्ट्रा बोल्ड गांठदार',
    quantityAvailable: '25 Quintals',
    quantityAvailableHi: '25 क्विंटल उपलब्ध',
    harvestYearOrMfg: 'Feb 2026 Fresh Dug',
    images: [
      'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Famous Mandsaur desi variety white garlic with intense pungent flavor and high allicin content. 40mm+ bold bulb size, properly cured and trimmed for long shelf life.',
    descriptionHi: 'प्रसिद्ध मंदसौर का देसी सफेद लहसुन, तेज तीखापन और औषधीय गुणों से भरपूर। 40mm+ बड़ा दाना, अच्छी तरह सुखाया व साफ किया हुआ।',
    specs: [
      { labelEn: 'Bulb Size', labelHi: 'गांठ का आकार', valueEn: '40 - 55 mm Bold Size', valueHi: '40 - 55 मिमी' },
      { labelEn: 'Quality Grade', labelHi: 'क्वालिटी ग्रेड', valueEn: 'Super G2 / Desi Bold', valueHi: 'सुपर G2 देसी' },
      { labelEn: 'Packaging', labelHi: 'पैकिंग', valueEn: '50 kg breathable mesh bags', valueHi: '50 किग्रा जालीदार बोरी' }
    ],
    seller: MOCK_SELLERS['seller_2'],
    location: {
      village: 'Pipaliya Mandi',
      district: 'Mandsaur',
      state: 'Madhya Pradesh',
      tehsil: 'Malhargarh',
      pincode: '458664'
    },
    tags: ['Garlic', 'Desi Lahsun', 'Mandsaur Garlic', 'Bulk Spice'],
    viewsCount: 530,
    postedDate: 'Yesterday',
    organicCertified: true
  },

  // LIVESTOCK & DAIRY
  {
    id: 'prod_live_01',
    title: 'MilkoTech 2-Bucket Electric Automated Cow/Buffalo Milking Machine',
    titleHi: 'मिल्कोटेक 2-बाल्टी स्वचालित गाय/भैंस मिल्किंग मशीन',
    category: 'livestock',
    subCategory: 'Dairy Equipment',
    subCategoryHi: 'डेयरी उपकरण',
    price: 36500,
    unit: 'Complete Double Bucket Machine',
    unitHi: '2 बाल्टी सहित मशीन',
    isNegotiable: true,
    condition: 'new',
    conditionLabelEn: 'Brand New with 1 Year Motor Warranty',
    conditionLabelHi: 'नया (1 साल मोटर वारंटी)',
    quantityAvailable: '2 Units',
    quantityAvailableHi: '2 यूनिट उपलब्ध',
    harvestYearOrMfg: '2026 Batch',
    images: [
      'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Electric trolley-mounted double bucket milking machine capable of milking 16-20 cows or buffaloes per hour. Food-grade SS 304 25L cans with silicone liners that massage teats gently without harming animal health.',
    descriptionHi: 'ट्रॉली माउंटेड डबल बकेट स्वचालित मिल्किंग मशीन। 1 घंटे में 16 से 20 गाय/भैंस का दूध निकालने में सक्षम। खाद्य ग्रेड SS 304 बाल्टी और मुलायम सिलिकॉन लाइनर।',
    specs: [
      { labelEn: 'Milking Capacity', labelHi: 'क्षमता', valueEn: '16-20 Animals per hour', valueHi: '16-20 पशु प्रति घंटा' },
      { labelEn: 'Motor Power', labelHi: 'मोटर', valueEn: '1.5 HP Single Phase 100% Copper', valueHi: '1.5 HP तांबा मोटर' },
      { labelEn: 'Bucket Capacity', labelHi: 'बाल्टी क्षमता', valueEn: '2 x 25 Litres (SS 304 Food Grade)', valueHi: '2 x 25 लीटर स्टेनलेस स्टील' },
      { labelEn: 'Pulsator Rate', labelHi: 'पल्सेटर दर', valueEn: '60/40 ratio (Gentle Massage)', valueHi: '60/40 अनुपात' }
    ],
    seller: MOCK_SELLERS['seller_5'],
    location: {
      village: 'Miryalaguda',
      district: 'Nalgonda',
      state: 'Telangana',
      tehsil: 'Miryalaguda',
      pincode: '508207'
    },
    tags: ['Milking Machine', 'Dairy Equipment', 'Cattle Care', 'Cow Milking'],
    viewsCount: 360,
    postedDate: '3 days ago'
  },
  {
    id: 'prod_live_02',
    title: 'Heavy Duty 304 Food-Grade Stainless Steel 40-Liter Milk Transport Cans',
    titleHi: 'हैवी ड्यूटी SS 304 फूड-ग्रेड 40-लीटर दूध के ड्रम (कैन)',
    category: 'livestock',
    subCategory: 'Milk Cans',
    subCategoryHi: 'दूध कैन',
    price: 3400,
    unit: 'Per Can (40 Litre)',
    unitHi: 'प्रति कैन (40 लीटर)',
    isNegotiable: false,
    condition: 'new',
    conditionLabelEn: 'Seamless SS 304 with Airtight Lock',
    conditionLabelHi: 'एयरटाइट लॉक सहित SS 304',
    quantityAvailable: '12 Pieces',
    quantityAvailableHi: '12 पीस उपलब्ध',
    harvestYearOrMfg: '2026',
    images: [
      'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Seamless welded heavy gauge AISI 304 stainless steel milk cans with airtight silicone gasket lid and dual reinforced handles. Mirror finished interior prevents bacterial growth and curdling during transport.',
    descriptionHi: 'भारी गेज 304 स्टेनलेस स्टील से बने 40 लीटर दूध के ड्रम। एयरटाइट ढक्कन और मजबूत हैंडल। अंदर से मिरर फिनिश जिससे दूध खराब नहीं होता।',
    specs: [
      { labelEn: 'Capacity', labelHi: 'क्षमता', valueEn: '40 Litres', valueHi: '40 लीटर' },
      { labelEn: 'Material', labelHi: 'सामग्री', valueEn: 'Food-Grade Stainless Steel 304 (1.2mm)', valueHi: 'SS 304 फूड ग्रेड' },
      { labelEn: 'Weight', labelHi: 'वजन', valueEn: '6.8 kg Empty', valueHi: '6.8 किग्रा खाली' }
    ],
    seller: MOCK_SELLERS['seller_5'],
    location: {
      village: 'Miryalaguda',
      district: 'Nalgonda',
      state: 'Telangana',
      tehsil: 'Miryalaguda',
      pincode: '508207'
    },
    tags: ['Milk Can', 'Dairy Transport', 'SS 304 Can'],
    viewsCount: 195,
    postedDate: '5 days ago'
  }
];

export const MANDI_RATES_TICKER = [
  { cropEn: 'Wheat (Sharbati)', cropHi: 'गेहूं (शरबती)', cropMr: 'गहू (शरबती)', mandiEn: 'Khanna Mandi', mandiHi: 'खन्ना मंडी', mandiMr: 'खन्ना बाजार समिती', price: '₹3,250/Qtl', trend: '+ ₹50' },
  { cropEn: 'Basmati Paddy 1121', cropHi: 'बासमती 1121 धान', cropMr: 'बासमती 1121 धान', mandiEn: 'Karnal Mandi', mandiHi: 'करनाल मंडी', mandiMr: 'कर्नाल बाजार समिती', price: '₹4,420/Qtl', trend: '+ ₹80' },
  { cropEn: 'Mustard (Sarson)', cropHi: 'सरसों', cropMr: 'मोहरी / तोरिया', mandiEn: 'Jaipur Mandi', mandiHi: 'जयपुर मंडी', mandiMr: 'जयपूर बाजार समिती', price: '₹5,650/Qtl', trend: '+ ₹30' },
  { cropEn: 'Garlic (Desi Lahsun)', cropHi: 'देसी लहसुन', cropMr: 'देशी लसूण', mandiEn: 'Mandsaur Mandi', mandiHi: 'मंदसौर मंडी', mandiMr: 'मंदसौर बाजार समिती', price: '₹14,800/Qtl', trend: '+ ₹200' },
  { cropEn: 'Soybean (Yellow)', cropHi: 'पीला सोयाबीन', cropMr: 'सोयाबीन (पिवळा)', mandiEn: 'Latur Mandi', mandiHi: 'लातूर मंडी', mandiMr: 'लातूर बाजार समिती', price: '₹4,850/Qtl', trend: '+ ₹90' },
  { cropEn: 'Onion (Nashik Red)', cropHi: 'लाल प्याज', cropMr: 'नाशिक लाल कांदा', mandiEn: 'Lasalgaon Mandi', mandiHi: 'लासलगाव मंडी', mandiMr: 'लासलगाव बाजार समिती', price: '₹2,600/Qtl', trend: '+ ₹120' },
  { cropEn: 'Chana (Gram)', cropHi: 'चना', cropMr: 'हरभरा / चणा', mandiEn: 'Akola Mandi', mandiHi: 'अकोला मंडी', mandiMr: 'अकोला बाजार समिती', price: '₹6,100/Qtl', trend: '+ ₹40' },
  { cropEn: 'Cotton (Kapas)', cropHi: 'कपास', cropMr: 'कापूस', mandiEn: 'Nagpur Mandi', mandiHi: 'नागपुर मंडी', mandiMr: 'नागपूर बाजार समिती', price: '₹7,450/Qtl', trend: '+ ₹60' }
];

export const STATES_DISTRICTS_DATA: Record<string, string[]> = {
  'Punjab': ['Ludhiana', 'Khanna', 'Bathinda', 'Amritsar', 'Patiala', 'Sangrur', 'Jalandhar'],
  'Haryana': ['Rohtak', 'Karnal', 'Hisar', 'Sirsa', 'Kurukshetra', 'Sonipat', 'Ambala'],
  'Madhya Pradesh': ['Mandsaur', 'Neemuch', 'Indore', 'Ujjain', 'Dewas', 'Sehore', 'Vidisha'],
  'Maharashtra': ['Pune', 'Baramati', 'Nashik', 'Kolhapur', 'Ahmednagar', 'Solapur', 'Nagpur'],
  'Telangana': ['Nalgonda', 'Miryalaguda', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam'],
  'Rajasthan': ['Jaipur', 'Kota', 'Sri Ganganagar', 'Alwar', 'Bharatpur', 'Hanumangarh', 'Bikaner'],
  'Uttar Pradesh': ['Meerut', 'Agra', 'Muzaffarnagar', 'Aligarh', 'Mathura', 'Bareilly', 'Varanasi']
};
