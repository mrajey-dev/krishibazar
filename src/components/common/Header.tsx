import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { STATES_DISTRICTS_TALUKAS_DATA, STATES_DISTRICTS_DATA } from '../../data/mockProducts';
import { Language } from '../../types';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const {
    selectedLocation,
    setSelectedLocation,
    navigateTo,
    notifications,
    unreadNotificationsCount,
    markAllNotificationsRead
  } = useMarketplace();

  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Drilldown step for location selection: 'state' | 'district' | 'taluka'
  const [locStep, setLocStep] = useState<'state' | 'district' | 'taluka'>('state');
  const [tempState, setTempState] = useState<string>('Maharashtra');
  const [tempDistrict, setTempDistrict] = useState<string>('Nashik');
  const [locationSearchTerm, setLocationSearchTerm] = useState<string>('');

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

  const getLocationDisplayText = () => {
    if (selectedLocation.district === 'All Districts' || !selectedLocation.district) {
      if (selectedLocation.state !== 'All India') {
        return `${selectedLocation.state} (${language === 'hi' ? 'सभी जिले' : language === 'mr' ? 'सर्व जिल्हे' : 'All Districts'})`;
      }
      return language === 'mr'
        ? 'संपूर्ण भारत (सर्व बाजार समित्या)'
        : language === 'hi'
          ? 'पूरा भारत (सभी मंडियां)'
          : 'All India (All Mandis)';
    }

    if (selectedLocation.taluka && selectedLocation.taluka !== 'All Talukas') {
      const shortTaluka = selectedLocation.taluka.split(' ')[0];
      return `${shortTaluka}, ${selectedLocation.district} (${selectedLocation.state})`;
    }

    return `${selectedLocation.district}, ${selectedLocation.state}`;
  };

  const openLocationPicker = () => {
    if (selectedLocation.state !== 'All India' && STATES_DISTRICTS_TALUKAS_DATA[selectedLocation.state]) {
      setTempState(selectedLocation.state);
      if (selectedLocation.district !== 'All Districts' && STATES_DISTRICTS_TALUKAS_DATA[selectedLocation.state][selectedLocation.district]) {
        setTempDistrict(selectedLocation.district);
        setLocStep('taluka');
      } else {
        setLocStep('district');
      }
    } else {
      setLocStep('state');
    }
    setLocationSearchTerm('');
    setShowLocationPicker(true);
  };

  // Flattened search list when user types in location search bar
  const getFilteredSearchResults = () => {
    if (!locationSearchTerm.trim()) return null;
    const term = locationSearchTerm.trim().toLowerCase();
    const results: Array<{ state: string; district: string; taluka?: string; label: string }> = [];

    Object.entries(STATES_DISTRICTS_TALUKAS_DATA).forEach(([st, distMap]) => {
      if (st.toLowerCase().includes(term)) {
        results.push({ state: st, district: 'All Districts', label: `🏛️ State: ${st} (All Districts)` });
      }
      Object.entries(distMap).forEach(([dst, talukas]) => {
        if (dst.toLowerCase().includes(term)) {
          results.push({ state: st, district: dst, label: `📍 District: ${dst}, ${st}` });
        }
        talukas.forEach(tal => {
          if (tal.toLowerCase().includes(term)) {
            results.push({
              state: st,
              district: dst,
              taluka: tal,
              label: `🏘️ Taluka: ${tal} (${dst}, ${st})`
            });
          }
        });
      });
    });

    return results.slice(0, 25);
  };

  const searchResults = getFilteredSearchResults();

  return (
    <View style={styles.headerContainer}>
      {/* Top Header Row: Logo, Location, Notifications, Profile */}
      <View style={styles.topRow}>
        {/* KrishiBazar Logo */}
        <TouchableOpacity
          style={styles.brandBadge}
          onPress={() => navigateTo({ name: 'home' })}
          activeOpacity={0.8}
        >
          <View style={styles.brandIconBox}>
            <MaterialCommunityIcons name="sprout" size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.brandTitle}>{getBrandTitle()}</Text>
            <Text style={styles.brandSub}>{getBrandSub()}</Text>
          </View>
        </TouchableOpacity>

        {/* Right Header Actions */}
        <View style={styles.headerRightActions}>
          {/* Language Selector */}
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() => setShowLanguagePicker(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="globe-outline" size={14} color="#FFFFFF" />
            <Text style={styles.langBtnText}>{getLanguageLabel(language)}</Text>
          </TouchableOpacity>

          {/* Notifications Bell */}
          <TouchableOpacity
            style={styles.headerActionIconBtn}
            onPress={() => {
              setShowNotificationsModal(true);
              markAllNotificationsRead();
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            {unreadNotificationsCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadNotificationsCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Selector Bar */}
      <TouchableOpacity
        style={styles.locationBar}
        onPress={openLocationPicker}
        activeOpacity={0.85}
      >
        <View style={styles.locationLeft}>
          <Ionicons name="location-sharp" size={16} color="#FDE047" />
          <Text style={styles.locationLabelText}>
            {language === 'hi' ? 'स्थान / तालुका: ' : language === 'mr' ? 'स्थान / तालुका: ' : 'Location: '}
          </Text>
          <Text style={styles.locationValueText} numberOfLines={1}>
            {getLocationDisplayText()}
          </Text>
        </View>
        <View style={styles.changeLocBtn}>
          <Text style={styles.changeLocText}>
            {language === 'hi' ? 'बदलें' : language === 'mr' ? 'बदला' : 'Change'}
          </Text>
          <Ionicons name="chevron-down" size={12} color="#FDE047" />
        </View>
      </TouchableOpacity>

      {/* Notifications Modal */}
      <Modal
        visible={showNotificationsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNotificationsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalDragBar} />
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Ionicons name="notifications" size={20} color="#15803D" />
                <Text style={styles.modalTitle}>{t('notifications')}</Text>
              </View>
              <TouchableOpacity onPress={() => setShowNotificationsModal(false)}>
                <Ionicons name="close" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              {notifications.map(notif => (
                <View key={notif.id} style={styles.notifCard}>
                  <View style={styles.notifIconCircle}>
                    <Ionicons
                      name={
                        notif.type === 'mandi_rate' ? 'trending-up'
                          : notif.type === 'deal' ? 'leaf-outline' : 'checkmark-circle'
                      }
                      size={18}
                      color="#15803D"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.notifCardTitle}>{notif.title}</Text>
                      <Text style={styles.notifTime}>{notif.time}</Text>
                    </View>
                    <Text style={styles.notifMessage}>{notif.message}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
              { code: 'mr' as Language, title: 'मराठी (Marathi)', sub: 'महाराष्ट्रातील शेतकरी बांधवांसाठी' },
              { code: 'hi' as Language, title: 'हिंदी (Hindi)', sub: 'किसानों के लिए सरल हिंदी' },
              { code: 'en' as Language, title: 'English', sub: 'Simple English for Agriculture' },
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
                  <Ionicons name="checkmark-circle" size={22} color="#15803D" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Comprehensive State -> District -> Taluka Location Picker Modal */}
      <Modal
        visible={showLocationPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheetLarge}>
            <View style={styles.modalDragBar} />
            
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
                <Ionicons name="location" size={20} color="#15803D" />
                <Text style={styles.modalTitle} numberOfLines={1}>
                  {locStep === 'state'
                    ? (language === 'mr' ? 'राज्य निवडा (Select State)' : language === 'hi' ? 'राज्य चुनें (Select State)' : 'Select State')
                    : locStep === 'district'
                      ? `${tempState} > ${language === 'mr' ? 'जिल्हा निवडा' : language === 'hi' ? 'जिला चुनें' : 'Select District'}`
                      : `${tempDistrict} > ${language === 'mr' ? 'तालुका निवडा' : language === 'hi' ? 'तालुका चुनें' : 'Select Taluka'}`}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedLocation({ state: 'All India', district: 'All Districts', taluka: 'All Talukas' });
                  setShowLocationPicker(false);
                }}
              >
                <Text style={styles.clearText}>🌾 {t('clearAll')}</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Search Bar for Any Taluka / District / State */}
            <View style={styles.locSearchBox}>
              <Ionicons name="search" size={16} color="#16A34A" />
              <TextInput
                style={styles.locSearchInput}
                placeholder={
                  language === 'mr'
                    ? 'जिल्हा किंवा तालुका शोधा (उदा. Niphad, Nashik...)'
                    : language === 'hi'
                      ? 'जिला या तालुका खोजें (उदा. Niphad, Nashik...)'
                      : 'Search District or Taluka (e.g. Niphad, Nashik...)'
                }
                placeholderTextColor="#9CA3AF"
                value={locationSearchTerm}
                onChangeText={setLocationSearchTerm}
              />
              {locationSearchTerm.length > 0 && (
                <TouchableOpacity onPress={() => setLocationSearchTerm('')}>
                  <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            {/* Step Navigation Breadcrumbs */}
            {!searchResults && (
              <View style={styles.breadcrumbBar}>
                <TouchableOpacity
                  style={[styles.crumbChip, locStep === 'state' && styles.crumbChipActive]}
                  onPress={() => setLocStep('state')}
                >
                  <Text style={[styles.crumbText, locStep === 'state' && styles.crumbTextActive]}>
                    1. {tempState || 'State'}
                  </Text>
                </TouchableOpacity>

                <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />

                <TouchableOpacity
                  style={[styles.crumbChip, locStep === 'district' && styles.crumbChipActive]}
                  onPress={() => setLocStep('district')}
                >
                  <Text style={[styles.crumbText, locStep === 'district' && styles.crumbTextActive]}>
                    2. {tempDistrict || 'District'}
                  </Text>
                </TouchableOpacity>

                <Ionicons name="chevron-forward" size={12} color="#9CA3AF" />

                <TouchableOpacity
                  style={[styles.crumbChip, locStep === 'taluka' && styles.crumbChipActive]}
                  onPress={() => setLocStep('taluka')}
                >
                  <Text style={[styles.crumbText, locStep === 'taluka' && styles.crumbTextActive]}>
                    3. {language === 'mr' ? 'तालुका' : language === 'hi' ? 'तालुका' : 'Taluka'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Content Body */}
            <ScrollView style={styles.locScrollBody} showsVerticalScrollIndicator={false}>
              {/* If user typed in search, show instant results */}
              {searchResults ? (
                <View>
                  <Text style={styles.stepSectionHeader}>
                    {language === 'mr' ? 'शोध निकाल (Search Results)' : language === 'hi' ? 'खोज परिणाम' : 'Search Results'} ({searchResults.length})
                  </Text>
                  {searchResults.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.searchResultItem}
                      onPress={() => {
                        setSelectedLocation({
                          state: item.state,
                          district: item.district,
                          taluka: item.taluka || 'All Talukas'
                        });
                        setShowLocationPicker(false);
                      }}
                    >
                      <Text style={styles.searchResultLabel}>{item.label}</Text>
                      <Ionicons name="checkmark-circle-outline" size={16} color="#15803D" />
                    </TouchableOpacity>
                  ))}
                  {searchResults.length === 0 && (
                    <Text style={styles.noResultText}>
                      {language === 'mr' ? 'कोणताही तालुका सापडला नाही' : 'No matching taluka or district found'}
                    </Text>
                  )}
                </View>
              ) : (
                /* Standard Hierarchical Drilldown */
                <View>
                  {/* Option: All India Button */}
                  <TouchableOpacity
                    style={[styles.allIndiaBtn, selectedLocation.state === 'All India' && styles.allIndiaBtnActive]}
                    onPress={() => {
                      setSelectedLocation({ state: 'All India', district: 'All Districts', taluka: 'All Talukas' });
                      setShowLocationPicker(false);
                    }}
                  >
                    <Text style={styles.allIndiaText}>
                      🌾 {language === 'mr' ? 'संपूर्ण भारत (सर्व राज्ये व सर्व बाजार समित्या)' : language === 'hi' ? 'संपूर्ण भारत (सभी राज्य एवं मंडियां)' : 'All India (All States & Mandis)'}
                    </Text>
                  </TouchableOpacity>

                  {/* LEVEL 1: STATE SELECTION */}
                  {locStep === 'state' && (
                    <View>
                      <Text style={styles.stepSectionHeader}>
                        {language === 'mr' ? 'कृषी राज्य निवडा (Select State):' : 'Select State / राज्य चुनें:'}
                      </Text>
                      <View style={styles.statesListGrid}>
                        {Object.keys(STATES_DISTRICTS_TALUKAS_DATA).map(st => (
                          <TouchableOpacity
                            key={st}
                            style={[styles.stateItemCard, tempState === st && styles.stateItemCardActive]}
                            onPress={() => {
                              setTempState(st);
                              const firstDist = Object.keys(STATES_DISTRICTS_TALUKAS_DATA[st] || {})[0] || 'Nashik';
                              setTempDistrict(firstDist);
                              setLocStep('district');
                            }}
                          >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <Text style={{ fontSize: 18 }}>
                                {st === 'Maharashtra' ? '🚩' : st === 'Punjab' ? '🌾' : st === 'Madhya Pradesh' ? '🌱' : st === 'Haryana' ? '🚜' : st === 'Rajasthan' ? '🐪' : st === 'Gujarat' ? '🦁' : '🏛️'}
                              </Text>
                              <Text style={[styles.stateItemText, tempState === st && styles.stateItemTextActive]}>
                                {st}
                              </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={14} color="#15803D" />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* LEVEL 2: DISTRICT SELECTION */}
                  {locStep === 'district' && (
                    <View>
                      <View style={styles.backRowHeader}>
                        <TouchableOpacity style={styles.subBackBtn} onPress={() => setLocStep('state')}>
                          <Ionicons name="arrow-back" size={14} color="#15803D" />
                          <Text style={styles.subBackText}>{language === 'mr' ? 'राज्य बदला' : 'Change State'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.stepSectionHeader}>
                          {tempState} {language === 'mr' ? 'जिल्हे' : 'Districts'}
                        </Text>
                      </View>

                      {/* Select All Districts in State */}
                      <TouchableOpacity
                        style={styles.allDistInStateBtn}
                        onPress={() => {
                          setSelectedLocation({ state: tempState, district: 'All Districts', taluka: 'All Talukas' });
                          setShowLocationPicker(false);
                        }}
                      >
                        <Text style={styles.allDistInStateText}>
                          📍 {language === 'mr' ? `सर्व ${tempState} जिल्हे (All Districts in ${tempState})` : `सभी ${tempState} जिले (All Districts in ${tempState})`}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.districtsGrid}>
                        {Object.keys(STATES_DISTRICTS_TALUKAS_DATA[tempState] || {}).map(dist => (
                          <TouchableOpacity
                            key={dist}
                            style={[styles.districtChipBtn, tempDistrict === dist && styles.districtChipBtnActive]}
                            onPress={() => {
                              setTempDistrict(dist);
                              setLocStep('taluka');
                            }}
                          >
                            <Text style={[styles.distChipBtnText, tempDistrict === dist && styles.distChipBtnTextActive]}>
                              {dist}
                            </Text>
                            <Ionicons name="chevron-forward" size={12} color="#15803D" />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* LEVEL 3: TALUKA / TEHSIL SELECTION */}
                  {locStep === 'taluka' && (
                    <View>
                      <View style={styles.backRowHeader}>
                        <TouchableOpacity style={styles.subBackBtn} onPress={() => setLocStep('district')}>
                          <Ionicons name="arrow-back" size={14} color="#15803D" />
                          <Text style={styles.subBackText}>{language === 'mr' ? 'जिल्हा बदला' : 'Change District'}</Text>
                        </TouchableOpacity>
                        <Text style={styles.stepSectionHeader}>
                          📍 {tempDistrict} {language === 'mr' ? 'तालुके' : 'Talukas / Tehsils'}
                        </Text>
                      </View>

                      {/* Select All Talukas in this District */}
                      <TouchableOpacity
                        style={styles.allDistInStateBtn}
                        onPress={() => {
                          setSelectedLocation({ state: tempState, district: tempDistrict, taluka: 'All Talukas' });
                          setShowLocationPicker(false);
                        }}
                      >
                        <Text style={styles.allDistInStateText}>
                          🌾 {language === 'mr' ? `सर्व ${tempDistrict} तालुका (All Talukas in ${tempDistrict})` : `सभी ${tempDistrict} तालुका (All Talukas in ${tempDistrict})`}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.talukasGrid}>
                        {(STATES_DISTRICTS_TALUKAS_DATA[tempState]?.[tempDistrict] || []).map(tal => (
                          <TouchableOpacity
                            key={tal}
                            style={[
                              styles.talukaChipBtn,
                              selectedLocation.district === tempDistrict && selectedLocation.taluka === tal && styles.talukaChipBtnActive
                            ]}
                            onPress={() => {
                              setSelectedLocation({ state: tempState, district: tempDistrict, taluka: tal });
                              setShowLocationPicker(false);
                            }}
                          >
                            <Ionicons name="location-outline" size={13} color="#15803D" />
                            <Text style={[
                              styles.talukaChipText,
                              selectedLocation.district === tempDistrict && selectedLocation.taluka === tal && styles.talukaChipTextActive
                            ]}>
                              {tal}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
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
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 6,
    shadowColor: '#14532D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  topRow: {
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
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1.5,
    borderColor: '#FDE047',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  brandSub: {
    fontSize: 10,
    color: '#DCFCE7',
    fontWeight: '600',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerActionBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  langBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  headerActionIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  notifBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  locationLabelText: {
    color: '#DCFCE7',
    fontSize: 11,
    fontWeight: '600',
  },
  locationValueText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },
  changeLocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(253, 224, 71, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  changeLocText: {
    color: '#FDE047',
    fontSize: 11,
    fontWeight: '800',
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
  modalSheetLarge: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: '88%',
    minHeight: '65%',
  },
  modalDragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#111827',
  },
  clearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  locSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locSearchInput: {
    flex: 1,
    fontSize: 12.5,
    color: '#111827',
    fontWeight: '600',
    padding: 0,
  },
  breadcrumbBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F9FAFB',
    padding: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  crumbChip: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  crumbChipActive: {
    backgroundColor: '#DCFCE7',
  },
  crumbText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  crumbTextActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  locScrollBody: {
    maxHeight: 380,
  },
  stepSectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#15803D',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  backRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subBackText: {
    fontSize: 11,
    color: '#15803D',
    fontWeight: '700',
  },
  allDistInStateBtn: {
    backgroundColor: '#DCFCE7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  allDistInStateText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#15803D',
  },
  statesListGrid: {
    gap: 6,
  },
  stateItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stateItemCardActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  stateItemText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  stateItemTextActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  districtsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  districtChipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  districtChipBtnActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  distChipBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  distChipBtnTextActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  talukasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  talukaChipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  talukaChipBtnActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },
  talukaChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#1F2937',
  },
  talukaChipTextActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  searchResultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 6,
  },
  searchResultLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  noResultText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 12,
    marginVertical: 14,
  },
  notifCard: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    marginBottom: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notifIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  notifTime: {
    fontSize: 10.5,
    color: '#6B7280',
  },
  notifMessage: {
    fontSize: 11.5,
    color: '#4B5563',
    marginTop: 3,
    lineHeight: 16,
  },
  langOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
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
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 2,
  },
  allIndiaBtn: {
    backgroundColor: '#F9FAFB',
    padding: 11,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  allIndiaBtnActive: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1.5,
    borderColor: '#16A34A',
  },
  allIndiaText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111827',
  },
});
