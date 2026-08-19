import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Linking } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export const ContactModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { contactModalProduct, closeContactModal } = useMarketplace();
  const [copied, setCopied] = useState(false);

  if (!contactModalProduct) return null;

  const { seller, title, titleHi, price, unit, unitHi } = contactModalProduct;
  const displayTitle = language === 'hi' ? titleHi : title;
  const displayUnit = language === 'hi' ? unitHi : unit;

  const cleanPhone = seller.phone.replace(/[^0-9+]/g, '');

  const handleCall = () => {
    Linking.openURL(`tel:${cleanPhone}`).catch(() => {});
  };

  const handleWhatsApp = () => {
    const msg = language === 'hi'
      ? `नमस्ते ${seller.name} जी, मैंने कृषि बाज़ार ऐप पर आपकी लिस्टिंग "${displayTitle}" (मूल्य: ₹${price.toLocaleString()} / ${displayUnit}) देखी। कृपया बताएं यह उपलब्ध है?`
      : `Hello ${seller.name}, I am interested in your listing "${displayTitle}" (Price: ₹${price.toLocaleString()} / ${displayUnit}) on KrishiBazar. Is it available?`;

    const url = `https://wa.me/${seller.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <Modal
      visible={!!contactModalProduct}
      transparent={true}
      animationType="slide"
      onRequestClose={closeContactModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalDragBar} />

          {/* Modal Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerTitleGroup}>
              <View style={styles.phoneIconBox}>
                <Ionicons name="call" size={16} color="#15803D" />
              </View>
              <Text style={styles.modalTitle}>{t('contactFarmerModalTitle')}</Text>
            </View>
            <TouchableOpacity onPress={closeContactModal} style={styles.closeBtn}>
              <Ionicons name="close" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Seller Card */}
          <View style={styles.sellerBox}>
            <Image source={{ uri: seller.avatar }} style={styles.sellerAvatar} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={styles.sellerName}>{seller.name}</Text>
                {seller.isVerified && <MaterialIcons name="verified" size={15} color="#16A34A" />}
              </View>
              <Text style={styles.sellerLocation}>
                📍 {seller.village}, {seller.district}, {seller.state}
              </Text>
            </View>
          </View>

          {/* Phone Display Box */}
          <View style={styles.phoneBox}>
            <View>
              <Text style={styles.phoneSubText}>
                {language === 'hi' ? 'किसान का मोबाइल नंबर' : 'Farmer Mobile Number'}
              </Text>
              <Text style={styles.phoneNum}>{seller.phone}</Text>
            </View>
          </View>

          {/* Direct Call Button */}
          <TouchableOpacity style={styles.callBtn} onPress={handleCall} activeOpacity={0.85}>
            <Ionicons name="call" size={18} color="#FFFFFF" />
            <Text style={styles.btnText}>{t('callFarmer')} ({seller.phone})</Text>
          </TouchableOpacity>

          {/* WhatsApp Button */}
          <TouchableOpacity style={styles.whatsappBtn} onPress={handleWhatsApp} activeOpacity={0.85}>
            <FontAwesome name="whatsapp" size={20} color="#FFFFFF" />
            <Text style={styles.btnText}>{t('whatsAppSeller')}</Text>
          </TouchableOpacity>

          {/* Safety Notice */}
          <View style={styles.safetyBox}>
            <Ionicons name="shield-checkmark" size={18} color="#D97706" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.safetyTitle}>{t('safetyNoticeTitle')}</Text>
              <Text style={styles.safetyDesc}>
                {t('safetyNotice2')} {t('safetyNotice1')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
  modalDragBar: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phoneIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  closeBtn: {
    backgroundColor: '#F3F4F6',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAF5',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8D8',
    marginBottom: 14,
  },
  sellerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: '#16A34A',
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  sellerLocation: {
    fontSize: 11,
    color: '#4B5563',
    marginTop: 2,
  },
  phoneBox: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  phoneSubText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  phoneNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  callBtn: {
    backgroundColor: '#16A34A',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
    elevation: 3,
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
    elevation: 3,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  safetyBox: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 8,
  },
  safetyTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 2,
  },
  safetyDesc: {
    fontSize: 11,
    color: '#78350F',
    lineHeight: 15,
  },
});
