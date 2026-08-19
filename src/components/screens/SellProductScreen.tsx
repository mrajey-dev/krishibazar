import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCategory, Product } from '../../types';
import { CATEGORIES_DATA, STATES_DISTRICTS_DATA } from '../../data/mockProducts';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const SAMPLE_IMAGES: Record<ProductCategory, string[]> = {
  all: ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80'],
  seeds: [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=800&auto=format&fit=crop&q=80'
  ],
  machinery: [
    'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595838728639-4458f288b857?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80'
  ],
  fertilizers: [
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=80'
  ],
  pesticides: [
    'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80'
  ],
  crops: [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=800&auto=format&fit=crop&q=80'
  ],
  livestock: [
    'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80'
  ],
  irrigation: [
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=80'
  ]
};

export const SellProductScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { addProduct, navigateTo, goBack } = useMarketplace();

  const [category, setCategory] = useState<ProductCategory>('seeds');
  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Bag');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [condition, setCondition] = useState<'new' | 'used' | 'certified_seed' | 'organic_produce'>('certified_seed');
  const [quantityAvailable, setQuantityAvailable] = useState('50 Bags');
  const [harvestYearOrMfg, setHarvestYearOrMfg] = useState('2026 Fresh Batch');
  const [description, setDescription] = useState('');
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  const [farmerName, setFarmerName] = useState('Baldev Singh');
  const [phone, setPhone] = useState('+91 98765 12345');
  const [whatsapp, setWhatsapp] = useState('919876512345');
  const [state, setState] = useState('Punjab');
  const [district, setDistrict] = useState('Ludhiana');
  const [village, setVillage] = useState('Samrala');

  const [formError, setFormError] = useState('');

  const handleSubmit = () => {
    if (!title.trim() && !titleHi.trim()) {
      setFormError(language === 'hi' ? 'कृपया सामान का नाम दर्ज करें' : 'Please enter item title');
      return;
    }
    if (!price || isNaN(Number(price))) {
      setFormError(language === 'hi' ? 'कृपया मान्य मूल्य दर्ज करें' : 'Please enter valid price');
      return;
    }
    if (!farmerName.trim() || !phone.trim()) {
      setFormError(language === 'hi' ? 'कृपया किसान का नाम और मोबाइल नंबर दर्ज करें' : 'Please enter farmer name and phone number');
      return;
    }

    setFormError('');
    const availableImgs = SAMPLE_IMAGES[category] || SAMPLE_IMAGES['seeds'];
    const chosenImg = availableImgs[selectedImgIdx] || availableImgs[0];

    const conditionLabelEn = condition === 'certified_seed' ? 'Certified Seed'
      : condition === 'organic_produce' ? '100% Organic'
      : condition === 'new' ? 'Brand New' : 'Used / Second Hand';

    const conditionLabelHi = condition === 'certified_seed' ? 'प्रमाणित बीज'
      : condition === 'organic_produce' ? '100% जैविक'
      : condition === 'new' ? 'बिल्कुल नया' : 'पुराना यंत्र';

    const newProduct = addProduct({
      title: title.trim() || titleHi.trim(),
      titleHi: titleHi.trim() || title.trim(),
      category,
      subCategory: subCategory.trim() || (category === 'seeds' ? 'Certified Seeds' : 'Farm Equipment'),
      subCategoryHi: subCategory.trim() || (category === 'seeds' ? 'प्रमाणित बीज' : 'कृषि यंत्र'),
      price: Number(price),
      unit: unit,
      unitHi: unit === 'Bag' ? 'बोरी' : unit === 'Kg' ? 'किग्रा' : unit === 'Quintal' ? 'क्विंटल' : 'पीस',
      isNegotiable,
      condition,
      conditionLabelEn,
      conditionLabelHi,
      quantityAvailable,
      quantityAvailableHi: quantityAvailable,
      harvestYearOrMfg,
      images: [chosenImg, ...availableImgs.filter(img => img !== chosenImg)],
      description: description.trim() || `${title} available directly from farm in ${village}, ${district}. Direct deal without middleman.`,
      descriptionHi: description.trim() || `${village}, ${district} से सीधे खेत से उपलब्ध। बिना किसी बिचौलिए के सीधा संपर्क करें।`,
      specs: [
        { labelEn: 'Category', labelHi: 'श्रेणी', valueEn: category.toUpperCase(), valueHi: category.toUpperCase() },
        { labelEn: 'Available Stock', labelHi: 'स्टॉक', valueEn: quantityAvailable, valueHi: quantityAvailable },
        { labelEn: 'Year/Batch', labelHi: 'वर्ष', valueEn: harvestYearOrMfg, valueHi: harvestYearOrMfg }
      ],
      seller: {
        id: `user_seller_${Date.now()}`,
        name: farmerName,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        phone: phone,
        whatsapp: whatsapp || phone.replace(/[^0-9]/g, ''),
        village: village,
        district: district,
        state: state,
        mandiDistance: `Near ${district} Mandi`,
        rating: 5.0,
        totalDeals: 1,
        memberSince: 'Today',
        isVerified: true,
        farmType: 'Progressive Farmer',
        bio: `Farmer from ${village}, ${district}. Direct deal.`
      },
      location: {
        village,
        tehsil: district,
        district,
        state,
        pincode: '141001'
      },
      tags: [category, title, district]
    });

    navigateTo({ name: 'product_detail', productId: newProduct.id });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{t('postAdTitle')}</Text>
          <Text style={styles.headerSub}>{t('postAdSubtitle')}</Text>
        </View>
      </View>

      {/* Step 1: Category */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('stepCategory')}</Text>
        <View style={styles.catGrid}>
          {CATEGORIES_DATA.filter(c => c.id !== 'all').map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catRadio, category === cat.id && styles.catRadioActive]}
              onPress={() => { setCategory(cat.id); setSelectedImgIdx(0); }}
            >
              <Text style={styles.catRadioText}>
                {cat.id === 'seeds' ? '🌱' : cat.id === 'machinery' ? '🚜' : cat.id === 'fertilizers' ? '🌿' : cat.id === 'pesticides' ? '🛡️' : cat.id === 'crops' ? '🌾' : '🐄'} {language === 'hi' ? cat.nameHi : cat.nameEn}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Step 2: Item Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('stepDetails')}</Text>

        <Text style={styles.inputLabel}>{t('productTitle')} (English) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Sharbati Wheat HD-2967"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.inputLabel}>{t('productTitle')} (हिंदी)</Text>
        <TextInput
          style={styles.input}
          placeholder="जैसे: शरबती गेहूं बीज HD-2967"
          placeholderTextColor="#9CA3AF"
          value={titleHi}
          onChangeText={setTitleHi}
        />

        <Text style={styles.inputLabel}>{language === 'hi' ? 'फोटो चुनें' : 'Select Photo'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 6 }}>
          {(SAMPLE_IMAGES[category] || SAMPLE_IMAGES['seeds']).map((img, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setSelectedImgIdx(idx)}
              style={[styles.imgPicker, selectedImgIdx === idx && styles.imgPickerActive]}
            >
              <Image source={{ uri: img }} style={styles.imgPickerThumb} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.inputLabel}>{t('description')}</Text>
        <TextInput
          style={[styles.input, { height: 70, textAlignVertical: 'top' }]}
          placeholder={language === 'hi' ? 'सामान का विवरण...' : 'Item description...'}
          placeholderTextColor="#9CA3AF"
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Step 3: Price & Stock */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('stepPrice')}</Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>{t('pricePerUnit')} *</Text>
            <TextInput
              style={styles.input}
              placeholder="₹ 1450"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>{t('unitLabel')}</Text>
            <TextInput
              style={styles.input}
              value={unit}
              onChangeText={setUnit}
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>{t('availableStock')}</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 50 Bags"
          placeholderTextColor="#9CA3AF"
          value={quantityAvailable}
          onChangeText={setQuantityAvailable}
        />

        <TouchableOpacity
          style={styles.negoCheckRow}
          onPress={() => setIsNegotiable(!isNegotiable)}
        >
          <Ionicons
            name={isNegotiable ? 'checkbox' : 'square-outline'}
            size={20}
            color={isNegotiable ? '#16A34A' : '#6B7280'}
          />
          <Text style={styles.negoCheckLabel}>
            {t('negotiable')} ({language === 'hi' ? 'मोलभाव संभव' : 'Price Negotiable'})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Step 4: Contact Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('stepContact')}</Text>

        <Text style={styles.inputLabel}>{t('farmerName')} *</Text>
        <TextInput style={styles.input} value={farmerName} onChangeText={setFarmerName} />

        <Text style={styles.inputLabel}>{t('phoneNumber')} *</Text>
        <TextInput style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.inputLabel}>{t('village')}</Text>
        <TextInput style={styles.input} value={village} onChangeText={setVillage} />
      </View>

      {formError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{formError}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
        <Ionicons name="sparkles" size={18} color="#FFFFFF" />
        <Text style={styles.submitBtnText}>{t('submitListing')}</Text>
      </TouchableOpacity>

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
  headerSub: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  catGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  catRadio: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '48%',
  },
  catRadioActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  catRadioText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#374151',
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#374151',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: '#111827',
  },
  imgPicker: {
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  imgPickerActive: {
    borderColor: '#16A34A',
    borderWidth: 2,
  },
  imgPickerThumb: {
    width: 60,
    height: 60,
  },
  negoCheckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  negoCheckLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#374151',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    marginHorizontal: 12,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 14,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
