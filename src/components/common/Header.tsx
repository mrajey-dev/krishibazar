import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { STATES_DISTRICTS_DATA } from '../../data/mockProducts';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { selectedLocation, setSelectedLocation, navigateTo, searchQuery, setSearchQuery } = useMarketplace();
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigateTo({ name: 'search', initialQuery: searchQuery });
    }
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'hi': return 'हिंदी';
      case 'mr': return 'मराठी';
      default: return 'English';
    }
  };

  const getBrandTitle = () => {
    switch (language) {
      case 'hi': return 'कृषि बाज़ार';
      case 'mr': return 'कृषी बाझार';
      default: return 'KrishiBazar';
    }
  };

  const getBrandSub = () => {
    switch (language) {
      case 'hi': return 'सीधा किसान बाज़ार • 0% कमीशन';
      case 'mr': return 'शेतकऱ्यांचा थेट बाजार • ०% कमिशन';
      default: return 'Direct Farmer Trade • 0% Fee';
    }
  };

  const getLocationAllIndiaLabel = () => {
    switch (language) {
      case 'hi': return 'पूरा भारत (सभी मंडियां)';
      case 'mr': return 'संपूर्ण भारत (सर्व बाजार समित्या)';
      default: return 'All India (All Mandis)';
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Brand Row */}
      <View style={styles.brandRow}>
        <TouchableOpacity style={styles.brandBadge} onPress={() => navigateTo({ name: 'home' })} activeOpacity={0.8}>
          <View style={styles.brandIconBox}>
            <MaterialCommunityIcons name="sprout" size={22} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.brandTitle}>{getBrandTitle()}</Text>
            <Text style={styles.brandSub}>{getBrandSub()}</Text>
          </View>
        </TouchableOpacity>

        {/* Language Switch Button */}
        <TouchableOpacity
          style={styles.langBtn}
          onPress={() => setShowLanguagePicker(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="globe-outline" size={13} color="#FFFFFF" />
          <Text style={styles.langBtnText}>{getLanguageLabel(language)}</Text>
          <Ionicons name="chevron-down" size={10} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Location Selector Bar */}
      <TouchableOpacity
        style={styles.locationBar}
        onPress={() => setShowLocationPicker(true)}
        activeOpacity={0.85}
      >
        <View style={styles.locationLeft}>
          <Ionicons name="location-sharp" size={14} color="#FDE047" />
          <Text style={styles.locationText} numberOfLines={1}>
            {selectedLocation.district === 'All Districts'
              ? getLocationAllIndiaLabel()
              : `${selectedLocation.district}, ${selectedLocation.state}`}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={14} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Search Input Box */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={16} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          onFocus={() => navigateTo({ name: 'search', initialQuery: searchQuery })}
          returnKeyType="search"
        />
      </View>

      {/* Language Picker Modal */}
      <Modal
        visible={showLanguagePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguagePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalDragBar} />
            <Text style={styles.modalTitle}>
              {language === 'mr' ? 'भाषा निवडा (Select Language)' : language === 'hi' ? 'भाषा चुनें (Select Language)' : 'Select Language'}
            </Text>

            {[
              { code: 'mr' as Language, title: 'मराठी (Marathi)', sub: 'शेतकऱ्यांसाठी मराठी भाषा' },
              { code: 'hi' as Language, title: 'हिंदी (Hindi)', sub: 'किसानों के लिए हिंदी भाषा' },
              { code: 'en' as Language, title: 'English', sub: 'English for all states' },
            ].map(item => (
              <TouchableOpacity
                key={item.code}
                style={[styles.langOptionCard, language === item.code && styles.langOptionCardActive]}
                onPress={() => {
                  setLanguage(item.code);
                  setShowLanguagePicker(false);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.langOptionTitle, language === item.code && styles.langOptionTitleActive]}>
                    {item.title}
                  </Text>
                  <Text style={styles.langOptionSub}>{item.sub}</Text>
                </View>
                {language === item.code && (
                  <Ionicons name="checkmark-circle" size={20} color="#15803D" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Location Picker Modal */}
      <Modal
        visible={showLocationPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalDragBar} />
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>
                {language === 'mr' ? 'राज्य व जिल्हा निवडा' : language === 'hi' ? 'राज्य एवं जिला चुनें' : 'Select State & District'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedLocation({ state: 'All India', district: 'All Districts' });
                  setShowLocationPicker(false);
                }}
              >
                <Text style={styles.clearText}>{t('clearAll')}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.districtsList} showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.allIndiaBtn, selectedLocation.state === 'All India' && styles.allIndiaBtnActive]}
                onPress={() => {
                  setSelectedLocation({ state: 'All India', district: 'All Districts' });
                  setShowLocationPicker(false);
                }}
              >
                <Text style={styles.allIndiaText}>
                  🌾 {language === 'mr' ? 'संपूर्ण भारत (सर्व राज्ये)' : language === 'hi' ? 'संपूर्ण भारत (सभी राज्य)' : 'All India (All States)'}
                </Text>
              </TouchableOpacity>

              {Object.entries(STATES_DISTRICTS_DATA).map(([stateName, districts]) => (
                <View key={stateName} style={styles.stateGroup}>
                  <Text style={styles.stateGroupTitle}>{stateName}</Text>
                  <View style={styles.districtChipsContainer}>
                    {districts.map(dist => (
                      <TouchableOpacity
                        key={dist}
                        style={[
                          styles.distChip,
                          selectedLocation.district === dist && styles.distChipActive
                        ]}
                        onPress={() => {
                          setSelectedLocation({ state: stateName, district: dist });
                          setShowLocationPicker(false);
                        }}
                      >
                        <Text style={[
                          styles.distChipText,
                          selectedLocation.district === dist && styles.distChipTextActive
                        ]}>
                          {dist}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#15803D',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandIconBox: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  brandSub: {
    fontSize: 10,
    color: '#DCFCE7',
    fontWeight: '600',
  },
  langBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 10,
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 2,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 9,
    paddingLeft: 38,
    paddingRight: 16,
    fontSize: 13,
    color: '#1F2937',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalDragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  langOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  langOptionCardActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  langOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  langOptionTitleActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  langOptionSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  districtsList: {
    maxHeight: 380,
  },
  allIndiaBtn: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  allIndiaBtnActive: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: '#16A34A',
  },
  allIndiaText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  stateGroup: {
    marginBottom: 14,
  },
  stateGroupTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#15803D',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  districtChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  distChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  distChipActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  distChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  distChipTextActive: {
    color: '#15803D',
    fontWeight: '700',
  },
});
