import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Modal, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export const FarmerAccountScreen: React.FC = () => {
  const { language, t, setLanguage } = useLanguage();
  const { navigateTo, goBack, myProductIds, savedProductIds } = useMarketplace();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigateTo({ name: 'home' });
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <View style={styles.notLoggedInContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('account')}</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.guestCard}>
          <View style={styles.guestIconCircle}>
            <MaterialCommunityIcons name="account-off-outline" size={42} color="#15803D" />
          </View>
          <Text style={styles.guestTitle}>{t('guestFarmer')}</Text>
          <Text style={styles.guestDesc}>{t('loginToPost')}</Text>

          <TouchableOpacity
            style={styles.loginActionBtn}
            onPress={() => navigateTo({ name: 'login' })}
            activeOpacity={0.85}
          >
            <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
            <Text style={styles.loginActionBtnText}>{t('login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{t('myAccount')}</Text>
          <Text style={styles.headerSub}>
            {language === 'hi' ? 'डिजिटल किसान प्रोफाइल एवं सेटिंग्स' : 'Digital Kisan Profile & Settings'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.headerSwitchBtn}
          onPress={() => navigateTo({ name: 'login' })}
          activeOpacity={0.8}
        >
          <Ionicons name="swap-horizontal" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* DIGITAL KISAN ID CARD (Passbook Style) */}
      <View style={styles.kisanCardWrapper}>
        <View style={styles.kisanCard}>
          {/* Card Top Strip */}
          <View style={styles.cardTopStrip}>
            <View style={styles.cardBrandBadge}>
              <MaterialCommunityIcons name="sprout" size={16} color="#FDE047" />
              <Text style={styles.cardBrandText}>KRISHIBAZAR KISAN CARD</Text>
            </View>
            <View style={styles.verifiedPill}>
              <Ionicons name="shield-checkmark" size={12} color="#15803D" />
              <Text style={styles.verifiedPillText}>VERIFIED</Text>
            </View>
          </View>

          {/* Card Body */}
          <View style={styles.cardBody}>
            <Image
              source={{ uri: currentUser.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80' }}
              style={styles.cardAvatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.farmerName}>{currentUser.name}</Text>
              <Text style={styles.farmerKisanId}>
                ID: <Text style={{ color: '#FDE047', fontWeight: '800' }}>{currentUser.kisanId}</Text>
              </Text>
              <Text style={styles.farmerLocation}>
                📍 {currentUser.village}, {currentUser.district}, {currentUser.state}
              </Text>
              <Text style={styles.farmerSpecialty} numberOfLines={1}>
                🌾 {currentUser.farmType}
              </Text>
            </View>
          </View>

          {/* Card Footer Bar */}
          <View style={styles.cardFooter}>
            <View style={styles.cardFooterItem}>
              <Text style={styles.footerItemLabel}>{language === 'hi' ? 'मोबाइल' : 'Mobile'}</Text>
              <Text style={styles.footerItemVal}>+91 {currentUser.phone}</Text>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardFooterItem}>
              <Text style={styles.footerItemLabel}>{language === 'hi' ? 'जमीन' : 'Land'}</Text>
              <Text style={styles.footerItemVal}>{currentUser.landSize || '15 Acres'}</Text>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardFooterItem}>
              <Text style={styles.footerItemLabel}>{language === 'hi' ? 'रेटिंग' : 'Rating'}</Text>
              <Text style={styles.footerItemVal}>⭐ {currentUser.rating}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* STATS ROW */}
      <View style={styles.statsRow}>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigateTo({ name: 'my_listings' })}
          activeOpacity={0.8}
        >
          <View style={[styles.statIconBox, { backgroundColor: '#DCFCE7' }]}>
            <MaterialCommunityIcons name="cube-outline" size={20} color="#15803D" />
          </View>
          <Text style={styles.statNumber}>{myProductIds.length}</Text>
          <Text style={styles.statLabel}>{t('activeListings')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigateTo({ name: 'saved' })}
          activeOpacity={0.8}
        >
          <View style={[styles.statIconBox, { backgroundColor: '#FEE2E2' }]}>
            <Ionicons name="heart" size={20} color="#DC2626" />
          </View>
          <Text style={styles.statNumber}>{savedProductIds.length}</Text>
          <Text style={styles.statLabel}>{t('savedItems')}</Text>
        </TouchableOpacity>

        <View style={styles.statCard}>
          <View style={[styles.statIconBox, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="hand-left" size={20} color="#D97706" />
          </View>
          <Text style={styles.statNumber}>{currentUser.totalDeals}</Text>
          <Text style={styles.statLabel}>{t('dealsCount')}</Text>
        </View>
      </View>

      {/* QUICK ACTIONS MENU */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>{language === 'hi' ? 'त्वरित सेवाएं' : language === 'mr' ? 'जलद सेवा' : 'Farmer Quick Actions'}</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateTo({ name: 'sell' })}
          activeOpacity={0.75}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#FEF3C7' }]}>
            <Ionicons name="add-circle" size={20} color="#D97706" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuItemTitle}>{t('postAdTitle')}</Text>
            <Text style={styles.menuItemSub}>{language === 'hi' ? 'फसल, बीज या कृषि यंत्र 0% कमीशन पर बेचें' : 'Sell with 0% Commission'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateTo({ name: 'my_listings' })}
          activeOpacity={0.75}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#DCFCE7' }]}>
            <MaterialCommunityIcons name="format-list-bulleted" size={20} color="#15803D" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuItemTitle}>{t('myAds')} ({myProductIds.length})</Text>
            <Text style={styles.menuItemSub}>{language === 'hi' ? 'अपने विज्ञापनों को संपादित करें या हटाएं' : 'Manage your posted items'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateTo({ name: 'safety_guide' })}
          activeOpacity={0.75}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="shield-checkmark" size={20} color="#0284C7" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuItemTitle}>{t('safetyGuide')}</Text>
            <Text style={styles.menuItemSub}>{language === 'hi' ? 'सौदा करते समय धोखाधड़ी से बचाव के नियम' : 'Rules for safe direct trading'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigateTo({ name: 'login' })}
          activeOpacity={0.75}
        >
          <View style={[styles.menuIconBox, { backgroundColor: '#F3E8FF' }]}>
            <Ionicons name="swap-horizontal" size={20} color="#7C3AED" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.menuItemTitle}>{t('switchFarmer')}</Text>
            <Text style={styles.menuItemSub}>{language === 'hi' ? 'दूसरे किसान या डेमो अकाउंट से लॉगिन करें' : 'Switch demo profile or login with OTP'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* LOGOUT BUTTON */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutBtnText}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>

      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.logoutModalIconBox}>
              <Ionicons name="log-out" size={32} color="#DC2626" />
            </View>
            <Text style={styles.modalTitle}>{t('logoutConfirmTitle')}</Text>
            <Text style={styles.modalDesc}>{t('logoutConfirmDesc')}</Text>

            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelBtnText}>{t('cancel')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleConfirmLogout}
                activeOpacity={0.85}
              >
                <Text style={styles.modalConfirmBtnText}>{t('confirmLogout')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  header: {
    backgroundColor: '#15803D',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 14 : 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  headerSub: {
    color: '#DCFCE7',
    fontSize: 10.5,
    fontWeight: '600',
    marginTop: 1,
  },
  headerSwitchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kisanCardWrapper: {
    paddingHorizontal: 14,
    marginTop: 12,
  },
  kisanCard: {
    backgroundColor: '#14532D',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#22C55E',
    elevation: 4,
    shadowColor: '#14532D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardTopStrip: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardBrandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardBrandText: {
    color: '#DCFCE7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  verifiedPillText: {
    color: '#15803D',
    fontSize: 9,
    fontWeight: '800',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
    alignItems: 'center',
  },
  cardAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#FDE047',
  },
  farmerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  farmerKisanId: {
    fontSize: 11,
    color: '#BBF7D0',
    fontWeight: '600',
    marginTop: 2,
  },
  farmerLocation: {
    fontSize: 11,
    color: '#E2E8F0',
    marginTop: 2,
  },
  farmerSpecialty: {
    fontSize: 10.5,
    color: '#FEF3C7',
    fontWeight: '600',
    marginTop: 2,
  },
  cardFooter: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  cardFooterItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerItemLabel: {
    fontSize: 9.5,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  footerItemVal: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 1,
  },
  cardDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 14,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
  },
  statIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 2,
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 10,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  menuItemSub: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 1,
  },
  logoutContainer: {
    paddingHorizontal: 14,
    marginTop: 16,
  },
  logoutBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoutBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#DC2626',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    elevation: 8,
  },
  logoutModalIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
  },
  modalConfirmBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalConfirmBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  notLoggedInContainer: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  guestCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  guestIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  guestDesc: {
    fontSize: 12.5,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  loginActionBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginActionBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});
