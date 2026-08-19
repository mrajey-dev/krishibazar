import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Ionicons } from '@expo/vector-icons';

export const SafetyGuideScreen: React.FC = () => {
  const { language, t } = useLanguage();
  const { goBack, navigateTo } = useMarketplace();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color="#374151" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{t('safetyGuide')}</Text>
          <Text style={styles.headerSub}>
            {language === 'hi' ? '100% सुरक्षित किसान व्यापार' : 'Safe Direct Farmer Trade Protocol'}
          </Text>
        </View>
      </View>

      <View style={{ padding: 14 }}>
        {/* Core Notice */}
        <View style={styles.banner}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Ionicons name="shield-checkmark" size={18} color="#B45309" />
            <Text style={styles.bannerTitle}>
              {language === 'hi' ? 'कोई ऑनलाइन भुगतान नहीं (Zero Online Payment)' : 'Zero Online Payment Model'}
            </Text>
          </View>
          <Text style={styles.bannerText}>
            {language === 'hi'
              ? 'कृषि बाज़ार केवल खरीदार और विक्रेता किसान भाइयों को सीधे जोड़ता है। कोई भी भुगतान केवल सामान देखकर, परखकर और आमने-सामने मंडी या खेत में करें।'
              : 'KrishiBazar connects farmers directly for transparent trade. Never send online token money in advance. Inspect goods physically before paying in person.'}
          </Text>
        </View>

        {/* Dos */}
        <View style={styles.card}>
          <Text style={styles.cardTitleGreen}>
            ✓ {language === 'hi' ? 'क्या करें (What To Do)' : 'Best Practices (DOs)'}
          </Text>
          <Text style={styles.bulletItem}>
            • {language === 'hi' ? 'किसान को सीधे फोन कॉल या व्हाट्सएप पर बात करके मंडी/खेत पर मिलने का समय तय करें।' : 'Call or WhatsApp the farmer directly to arrange a physical visit at farm or mandi.'}
          </Text>
          <Text style={styles.bulletItem}>
            • {language === 'hi' ? 'बीज की बोरी पर लैब प्रमाणन सील, बैच नंबर और एक्सपायरी तिथि जांचें।' : 'Check seed certification tag, germination lab report, and expiry date.'}
          </Text>
          <Text style={styles.bulletItem}>
            • {language === 'hi' ? 'पुराने ट्रैक्टर व मशीनरी की टेस्ट ड्राइव लें और आरसी/कागजात जांचें।' : 'Test drive tractors and equipment; verify original RC and chassis numbers.'}
          </Text>
          <Text style={styles.bulletItem}>
            • {language === 'hi' ? 'फसल का वजन स्थानीय मंडी के सरकारी कांटे पर करवाएं।' : 'Weigh crops at registered APMC mandi weighbridge before taking delivery.'}
          </Text>
        </View>

        {/* Don'ts */}
        <View style={styles.card}>
          <Text style={styles.cardTitleRed}>
            ✗ {language === 'hi' ? 'क्या न करें (What NOT To Do)' : 'Safety Warnings (DON’Ts)'}
          </Text>
          <Text style={styles.bulletItem}>
            • {language === 'hi' ? 'सामान देखे बिना कभी भी UPI / बैंक से अग्रिम बयाना न भेजें।' : 'Never send advance token payment via UPI/Bank before seeing the product.'}
          </Text>
          <Text style={styles.bulletItem}>
            • {language === 'hi' ? 'किसी अनजान QR कोड को स्कैन करके पेमेंट रिसीव करने के झांसे में न आएं।' : 'Never scan QR codes sent over chat claiming to send you money.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.gotItBtn}
          onPress={() => navigateTo({ name: 'home' })}
        >
          <Text style={styles.gotItText}>
            {language === 'hi' ? 'समझ गया • खरीदारी शुरू करें' : 'Got It • Start Browsing'}
          </Text>
        </TouchableOpacity>
      </View>
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
  banner: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FCD34D',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#78350F',
  },
  bannerText: {
    fontSize: 11.5,
    color: '#92400E',
    lineHeight: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    marginBottom: 12,
  },
  cardTitleGreen: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#15803D',
    marginBottom: 8,
  },
  cardTitleRed: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 8,
  },
  bulletItem: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 17,
    marginBottom: 6,
  },
  gotItBtn: {
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  gotItText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
