import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth, DEMO_FARMERS } from '../../context/AuthContext';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { STATES_DISTRICTS_DATA } from '../../data/mockProducts';

type AuthTab = 'otp' | 'pin' | 'register' | 'demo';

export const LoginScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { navigateTo, goBack } = useMarketplace();
  const { loginWithOtp, loginWithPin, registerFarmer, loginDemoUser } = useAuth();

  const [activeTab, setActiveTab] = useState<AuthTab>('otp');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // OTP Login State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);

  // PIN Login State
  const [pinPhoneOrId, setPinPhoneOrId] = useState('');
  const [pin, setPin] = useState('');

  // Registration State
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regState, setRegState] = useState('Punjab');
  const [regDistrict, setRegDistrict] = useState('Ludhiana');
  const [regVillage, setRegVillage] = useState('');
  const [regFarmType, setRegFarmType] = useState('Wheat & Certified Seed Production');
  const [regLandSize, setRegLandSize] = useState('15 Acres');
  const [regPin, setRegPin] = useState('1234');

  // Handle OTP Send
  const handleSendOtp = () => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    setSuccessMsg(language === 'hi' ? 'ओटीपी सफलतापूर्वक भेजा गया! (टेस्ट कोड: 5566)' : 'OTP sent successfully! (Test code: 5566)');
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 4) {
      setErrorMsg(language === 'hi' ? 'कृपया 4 अंकों का ओटीपी दर्ज करें' : 'Please enter 4-digit OTP');
      return;
    }
    const res = await loginWithOtp(phone, otp);
    if (res.success) {
      navigateTo({ name: 'account' });
    } else {
      setErrorMsg(res.error || 'Invalid OTP');
    }
  };

  // Handle PIN Login
  const handlePinLogin = async () => {
    if (!pinPhoneOrId.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया मोबाइल नंबर या किसान आईडी दर्ज करें' : 'Please enter mobile or Kisan ID');
      return;
    }
    if (!pin || pin.length < 4) {
      setErrorMsg(language === 'hi' ? 'कृपया 4 अंकों का सुरक्षा पिन दर्ज करें' : 'Please enter 4-digit PIN');
      return;
    }
    const res = await loginWithPin(pinPhoneOrId, pin);
    if (res.success) {
      navigateTo({ name: 'account' });
    } else {
      setErrorMsg(res.error || 'Login failed');
    }
  };

  // Handle Registration
  const handleRegister = async () => {
    if (!regName.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name');
      return;
    }
    if (regPhone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit phone');
      return;
    }
    const res = await registerFarmer({
      name: regName,
      phone: regPhone,
      state: regState,
      district: regDistrict,
      village: regVillage || 'Gram Panchayat',
      farmType: regFarmType,
      landSize: regLandSize,
      pin: regPin || '1234'
    });

    if (res.success) {
      navigateTo({ name: 'account' });
    } else {
      setErrorMsg(res.error || 'Registration failed');
    }
  };

  // Handle Demo Login
  const handleDemoSelect = (id: string) => {
    loginDemoUser(id);
    navigateTo({ name: 'account' });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{t('login')}</Text>
          <Text style={styles.headerSub}>
            {language === 'hi' ? 'किसानों का डिजिटल पहचान पत्र एवं खाता' : language === 'mr' ? 'शेतकऱ्यांचे डिजिटल ओळखपत्र व खाते' : 'Farmer Digital Identity & Account'}
          </Text>
        </View>
        <View style={{ width: 34 }} />
      </View>

      {/* Hero Badge Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroIconBox}>
          <MaterialCommunityIcons name="shield-account" size={32} color="#15803D" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.heroTitle}>
            {language === 'hi' ? 'कृषि बाज़ार किसान पोर्टल' : language === 'mr' ? 'कृषी बाझार शेतकरी पोर्टल' : 'KrishiBazar Farmer Portal'}
          </Text>
          <Text style={styles.heroSub}>
            {language === 'hi' ? '100% मुफ्त • शून्य कमीशन • डिजिटल किसान कार्ड' : language === 'mr' ? '१००% मोफत • ०% कमिशन • डिजिटल शेतकरी कार्ड' : '100% Free • 0% Commission • Digital Kisan ID'}
          </Text>
        </View>
      </View>

      {/* Auth Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'otp' && styles.tabBtnActive]}
          onPress={() => { setActiveTab('otp'); setErrorMsg(''); }}
        >
          <Ionicons name="phone-portrait-outline" size={14} color={activeTab === 'otp' ? '#15803D' : '#6B7280'} />
          <Text style={[styles.tabBtnText, activeTab === 'otp' && styles.tabBtnTextActive]}>
            {language === 'hi' ? 'ओटीपी (OTP)' : language === 'mr' ? 'ओटीपी' : 'Mobile OTP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'pin' && styles.tabBtnActive]}
          onPress={() => { setActiveTab('pin'); setErrorMsg(''); }}
        >
          <Ionicons name="key-outline" size={14} color={activeTab === 'pin' ? '#15803D' : '#6B7280'} />
          <Text style={[styles.tabBtnText, activeTab === 'pin' && styles.tabBtnTextActive]}>
            {language === 'hi' ? 'पिन (PIN)' : language === 'mr' ? 'पिन' : 'PIN Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'register' && styles.tabBtnActive]}
          onPress={() => { setActiveTab('register'); setErrorMsg(''); }}
        >
          <Ionicons name="person-add-outline" size={14} color={activeTab === 'register' ? '#15803D' : '#6B7280'} />
          <Text style={[styles.tabBtnText, activeTab === 'register' && styles.tabBtnTextActive]}>
            {language === 'hi' ? 'नया पंजीकरण' : language === 'mr' ? 'नवीन नोंदणी' : 'Register'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'demo' && styles.tabBtnActive]}
          onPress={() => { setActiveTab('demo'); setErrorMsg(''); }}
        >
          <Ionicons name="flash-outline" size={14} color={activeTab === 'demo' ? '#15803D' : '#6B7280'} />
          <Text style={[styles.tabBtnText, activeTab === 'demo' && styles.tabBtnTextActive]}>
            {language === 'hi' ? 'डेमो' : language === 'mr' ? 'डेमो' : '1-Tap Demo'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      {!!errorMsg && (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle" size={18} color="#DC2626" />
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
      {!!successMsg && (
        <View style={styles.successBox}>
          <Ionicons name="checkmark-circle" size={18} color="#15803D" />
          <Text style={styles.successText}>{successMsg}</Text>
        </View>
      )}

      {/* TAB 1: OTP LOGIN */}
      {activeTab === 'otp' && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            {language === 'hi' ? 'मोबाइल नंबर से त्वरित लॉगिन' : language === 'mr' ? 'मोबाईल नंबरने थेट लॉगिन' : 'Quick Login with Mobile Number'}
          </Text>
          <Text style={styles.cardSub}>
            {language === 'hi' ? 'हम आपके नंबर पर 4 अंकों का सत्यापन कोड भेजेंगे।' : 'We will verify via a 4-digit code.'}
          </Text>

          {!otpSent ? (
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>{t('phoneNumber')}</Text>
              <View style={styles.phoneInputRow}>
                <View style={styles.countryCodeBox}>
                  <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="98765 43210"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleSendOtp} activeOpacity={0.85}>
                <Ionicons name="paper-plane" size={16} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>{t('sendOtp')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.formGroup}>
              <View style={styles.otpHeaderBox}>
                <Text style={styles.otpSentNote}>
                  {t('otpSentTo')} <Text style={{ fontWeight: '800', color: '#15803D' }}>+91 {phone}</Text>
                </Text>
                <TouchableOpacity onPress={() => setOtpSent(false)}>
                  <Text style={styles.changePhoneText}>
                    {language === 'hi' ? 'नंबर बदलें' : 'Change'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.otpInput}
                placeholder="• • • •"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={setOtp}
              />

              <TouchableOpacity
                style={styles.autoFillBtn}
                onPress={() => setOtp('5566')}
                activeOpacity={0.8}
              >
                <Text style={styles.autoFillBtnText}>{t('autoFillOtp')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyOtp} activeOpacity={0.85}>
                <Ionicons name="checkmark-done" size={18} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>{t('verifyOtp')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {/* TAB 2: PIN LOGIN */}
      {activeTab === 'pin' && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            {language === 'hi' ? 'किसान आईडी या पिन से लॉगिन' : language === 'mr' ? 'पिन किंवा ओळख क्रमांकाने लॉगिन' : 'Login with Kisan ID & PIN'}
          </Text>
          <Text style={styles.cardSub}>
            {t('defaultPinHint')}
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>{language === 'hi' ? 'मोबाइल नंबर या किसान आईडी' : 'Mobile Number or Kisan ID'}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 9876543210 or KB-PB-2026-1049"
              placeholderTextColor="#9CA3AF"
              value={pinPhoneOrId}
              onChangeText={setPinPhoneOrId}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('enterPin')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1234"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              secureTextEntry
              maxLength={6}
              value={pin}
              onChangeText={setPin}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handlePinLogin} activeOpacity={0.85}>
              <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>{t('loginNow')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* TAB 3: REGISTER NEW FARMER */}
      {activeTab === 'register' && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            {language === 'hi' ? 'नया किसान पंजीकरण एवं पहचान पत्र' : language === 'mr' ? 'नवीन शेतकरी नोंदणी व ओळखपत्र' : 'Register as Verified Farmer'}
          </Text>
          <Text style={styles.cardSub}>
            {language === 'hi' ? 'पंजीकरण करने पर आपको डिजिटल किसान कार्ड मिलेगा।' : 'Get your instant digital Kisan Card & verified badge.'}
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>{t('farmerName')} *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Sardar Gurpreet Singh / रामेश्वर जी"
              placeholderTextColor="#9CA3AF"
              value={regName}
              onChangeText={setRegName}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('phoneNumber')} *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="10-digit mobile number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              maxLength={10}
              value={regPhone}
              onChangeText={setRegPhone}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('state')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Punjab / Maharashtra / MP"
              placeholderTextColor="#9CA3AF"
              value={regState}
              onChangeText={setRegState}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('district')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ludhiana / Nashik / Rohtak"
              placeholderTextColor="#9CA3AF"
              value={regDistrict}
              onChangeText={setRegDistrict}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('village')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Village or Tehsil Name"
              placeholderTextColor="#9CA3AF"
              value={regVillage}
              onChangeText={setRegVillage}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('farmType')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Wheat & Mustard / Organic Garlic / Dairy"
              placeholderTextColor="#9CA3AF"
              value={regFarmType}
              onChangeText={setRegFarmType}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('landSize')}</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 15 Acres / 5 Bigha"
              placeholderTextColor="#9CA3AF"
              value={regLandSize}
              onChangeText={setRegLandSize}
            />

            <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t('enterPin')} (4 Digits)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="1234"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              maxLength={4}
              value={regPin}
              onChangeText={setRegPin}
            />

            <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} activeOpacity={0.85}>
              <Ionicons name="card-outline" size={18} color="#FFFFFF" />
              <Text style={styles.primaryBtnText}>{t('createKisanAccount')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* TAB 4: 1-TAP DEMO PROFILES */}
      {activeTab === 'demo' && (
        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            {t('quickDemoLogin')}
          </Text>
          <Text style={styles.cardSub}>
            {t('selectDemoProfile')}
          </Text>

          <View style={styles.demoList}>
            {DEMO_FARMERS.map(farmer => (
              <TouchableOpacity
                key={farmer.id}
                style={styles.demoCard}
                onPress={() => handleDemoSelect(farmer.id)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: farmer.avatar }} style={styles.demoAvatar} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={styles.demoName}>{farmer.name}</Text>
                    <Ionicons name="checkmark-circle" size={14} color="#15803D" />
                  </View>
                  <Text style={styles.demoLocation}>📍 {farmer.district}, {farmer.state}</Text>
                  <Text style={styles.demoSpecialty} numberOfLines={1}>🌾 {farmer.farmType}</Text>
                  <View style={styles.demoMetaRow}>
                    <Text style={styles.demoKisanId}>ID: {farmer.kisanId}</Text>
                    <Text style={styles.demoDeals}>⭐ {farmer.rating} • {farmer.totalDeals} Deals</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#15803D" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Bottom Features / Helpline */}
      <View style={styles.safetyFooter}>
        <View style={styles.safetyItem}>
          <MaterialCommunityIcons name="shield-check" size={20} color="#15803D" />
          <Text style={styles.safetyText}>
            {language === 'hi' ? 'सत्यापित किसान समुदाय' : 'Verified Farmer Community'}
          </Text>
        </View>
        <View style={styles.safetyItem}>
          <MaterialCommunityIcons name="phone-classic" size={20} color="#D97706" />
          <Text style={styles.safetyText}>
            {t('kisanHelpline')}
          </Text>
        </View>
      </View>

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
  headerCenter: {
    alignItems: 'center',
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
  heroBanner: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8D8',
    elevation: 2,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  heroIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#111827',
  },
  heroSub: {
    fontSize: 11,
    color: '#15803D',
    fontWeight: '600',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    marginHorizontal: 14,
    marginVertical: 10,
    padding: 3,
    gap: 2,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    flexDirection: 'row',
    gap: 4,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4B5563',
  },
  tabBtnTextActive: {
    color: '#15803D',
    fontWeight: '800',
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#B91C1C',
    fontWeight: '600',
    flex: 1,
  },
  successBox: {
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 14,
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successText: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '700',
    flex: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  cardSub: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 2,
    marginBottom: 14,
  },
  formGroup: {
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 5,
  },
  phoneInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  countryCodeBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  countryCodeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: '#111827',
    fontWeight: '500',
  },
  otpHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  otpSentNote: {
    fontSize: 12,
    color: '#4B5563',
  },
  changePhoneText: {
    fontSize: 11.5,
    color: '#16A34A',
    fontWeight: '700',
  },
  otpInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#15803D',
    borderRadius: 12,
    paddingVertical: 12,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 10,
    color: '#15803D',
    marginBottom: 8,
  },
  autoFillBtn: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  autoFillBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#92400E',
  },
  primaryBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  demoList: {
    gap: 10,
  },
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 10,
    gap: 10,
  },
  demoAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: '#16A34A',
  },
  demoName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  demoLocation: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '500',
    marginTop: 1,
  },
  demoSpecialty: {
    fontSize: 10.5,
    color: '#15803D',
    fontWeight: '600',
    marginTop: 1,
  },
  demoMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingRight: 6,
  },
  demoKisanId: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#6B7280',
  },
  demoDeals: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#D97706',
  },
  safetyFooter: {
    marginHorizontal: 14,
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  safetyText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#374151',
  },
});
