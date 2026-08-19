import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ProductCard } from '../common/ProductCard';
import { Ionicons } from '@expo/vector-icons';

const POPULAR_SEARCHES = [
  'Sharbati Wheat',
  'Mahindra Tractor',
  'Rotavator',
  'Vermicompost',
  'Pusa 1121 Basmati',
  'Solar Pump',
  'Neem Oil',
  'Desi Garlic',
  'Mustard Seed'
];

interface SearchScreenProps {
  initialQuery?: string;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ initialQuery = '' }) => {
  const { language, t } = useLanguage();
  const { products, goBack, searchQuery, setSearchQuery } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState(initialQuery || searchQuery);

  useEffect(() => {
    if (initialQuery) {
      setSearchTerm(initialQuery);
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setSearchQuery(val);
  };

  const results = products.filter(p => {
    if (!searchTerm.trim()) return false;
    const query = searchTerm.toLowerCase().trim();
    return (
      p.title.toLowerCase().includes(query) ||
      p.titleHi.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.descriptionHi.toLowerCase().includes(query) ||
      p.subCategory.toLowerCase().includes(query) ||
      p.location.district.toLowerCase().includes(query) ||
      p.location.village.toLowerCase().includes(query) ||
      p.seller.name.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const chunkInPairs = (arr: any[]) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push(arr.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={18} color="#374151" />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color="#9CA3AF" style={{ marginRight: 6 }} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={handleSearchChange}
            autoFocus={true}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => handleSearchChange('')}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {!searchTerm.trim() ? (
          <View style={{ padding: 16 }}>
            <Text style={styles.popularTitle}>
              🔥 {language === 'hi' ? 'लोकप्रिय कृषि खोजें' : 'Popular Agri Searches'}
            </Text>
            <View style={styles.tagsContainer}>
              {POPULAR_SEARCHES.map(tag => (
                <TouchableOpacity
                  key={tag}
                  style={styles.tagBtn}
                  onPress={() => handleSearchChange(tag)}
                >
                  <Text style={styles.tagBtnText}>✨ {tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.resultsCount}>
              {language === 'hi'
                ? `"${searchTerm}" के लिए ${results.length} परिणाम मिले:`
                : `Found ${results.length} results for "${searchTerm}":`}
            </Text>

            {results.length > 0 ? (
              chunkInPairs(results).map((pair, idx) => (
                <View key={idx} style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                  {pair.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </View>
              ))
            ) : (
              <View style={styles.noResultsBox}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>🔍</Text>
                <Text style={styles.noResultsTitle}>
                  {language === 'hi' ? 'कोई सामान नहीं मिला' : 'No items found'}
                </Text>
              </View>
            )}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
    padding: 0,
  },
  popularTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  resultsCount: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  noResultsBox: {
    padding: 50,
    alignItems: 'center',
  },
  noResultsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
});
