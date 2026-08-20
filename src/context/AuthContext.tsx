import React, { createContext, useContext, useState, useEffect } from 'react';
import { FarmerUser } from '../types';

export const DEMO_FARMERS: FarmerUser[] = [
  {
    id: 'seller_1',
    name: 'Sardar Gurpreet Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    phone: '9876543210',
    kisanId: 'KB-PB-2026-1049',
    village: 'Khanna Kalan',
    district: 'Ludhiana',
    state: 'Punjab',
    farmType: 'Certified Seed Grower & Wheat Farming (35 Acres)',
    landSize: '35 Acres',
    rating: 4.9,
    totalDeals: 48,
    memberSince: 'March 2023',
    isVerified: true,
    pin: '1234'
  },
  {
    id: 'seller_2',
    name: 'Rameshwar Patidar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    phone: '9425088712',
    kisanId: 'KB-MP-2026-2814',
    village: 'Pipaliya Mandi',
    district: 'Mandsaur',
    state: 'Madhya Pradesh',
    farmType: 'Organic Garlic & Seed Producer (18 Acres)',
    landSize: '18 Acres',
    rating: 4.8,
    totalDeals: 36,
    memberSince: 'August 2023',
    isVerified: true,
    pin: '1234'
  },
  {
    id: 'seller_3',
    name: 'Chaudhary Birender Hooda',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    phone: '9812054389',
    kisanId: 'KB-HR-2026-3912',
    village: 'Sampla',
    district: 'Rohtak',
    state: 'Haryana',
    farmType: 'Tractor Owner & Custom Hiring Center (24 Acres)',
    landSize: '24 Acres',
    rating: 4.7,
    totalDeals: 29,
    memberSince: 'January 2024',
    isVerified: true,
    pin: '1234'
  },
  {
    id: 'seller_4',
    name: 'Savita Tai Patil',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    phone: '9765432109',
    kisanId: 'KB-MH-2026-4420',
    village: 'Pimpalgaon Baswant',
    district: 'Nashik',
    state: 'Maharashtra',
    farmType: 'Grape & Onion Horticulture (12 Acres)',
    landSize: '12 Acres',
    rating: 4.9,
    totalDeals: 52,
    memberSince: 'May 2023',
    isVerified: true,
    pin: '1234'
  }
];

interface AuthContextType {
  currentUser: FarmerUser | null;
  isAuthenticated: boolean;
  loginWithOtp: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  loginWithPin: (phoneOrKisanId: string, pin: string) => Promise<{ success: boolean; error?: string }>;
  registerFarmer: (data: {
    name: string;
    phone: string;
    state: string;
    district: string;
    village: string;
    farmType: string;
    landSize?: string;
    pin?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loginDemoUser: (id: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<FarmerUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'krishibazar_farmer_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FarmerUser | null>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('Could not read auth state from localStorage', e);
    }
    // Default to Sardar Gurpreet Singh for initial rich preview or null
    return DEMO_FARMERS[0];
  });

  const saveUserToStorage = (user: FarmerUser | null) => {
    setCurrentUser(user);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (user) {
          window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch (e) {
      console.warn('Could not write auth state to localStorage', e);
    }
  };

  const loginWithOtp = async (phone: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number' };
    }
    if (!otp || otp.trim().length !== 4) {
      return { success: false, error: 'Please enter a valid 4-digit OTP' };
    }

    // Match existing demo farmer or generate a verified account
    const matched = DEMO_FARMERS.find(f => f.phone.slice(-10) === cleanPhone);
    if (matched) {
      saveUserToStorage(matched);
      return { success: true };
    }

    // New or custom phone number login
    const newUser: FarmerUser = {
      id: `farmer_${Date.now()}`,
      name: `Kisan (+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)})`,
      phone: cleanPhone,
      kisanId: `KB-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Gram Panchayat',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      isVerified: true,
      farmType: 'Progressive Farmer (General Agriculture)',
      landSize: '10 Acres',
      memberSince: 'Just joined',
      totalDeals: 0,
      rating: 5.0,
      pin: '1234'
    };

    saveUserToStorage(newUser);
    return { success: true };
  };

  const loginWithPin = async (phoneOrKisanId: string, pin: string): Promise<{ success: boolean; error?: string }> => {
    const term = phoneOrKisanId.trim().toLowerCase();
    if (!term) {
      return { success: false, error: 'Please enter your Mobile number or Kisan ID' };
    }
    if (!pin || pin.length < 4) {
      return { success: false, error: 'Please enter your 4-digit security PIN' };
    }

    const matched = DEMO_FARMERS.find(f => 
      f.phone.includes(term) || 
      f.kisanId.toLowerCase() === term ||
      f.phone.slice(-10) === term.replace(/[^0-9]/g, '')
    );

    if (matched) {
      if (matched.pin && matched.pin !== pin) {
        return { success: false, error: 'Incorrect PIN. Default PIN is 1234' };
      }
      saveUserToStorage(matched);
      return { success: true };
    }

    // If not found in demo, let them login if PIN is 1234 or clean number
    const cleanPhone = term.replace(/[^0-9]/g, '').slice(-10);
    const newUser: FarmerUser = {
      id: `farmer_${Date.now()}`,
      name: `Farmer (${term})`,
      phone: cleanPhone || '9876500000',
      kisanId: `KB-IN-${Math.floor(1000 + Math.random() * 9000)}`,
      state: 'Maharashtra',
      district: 'Nashik',
      village: 'Taluka Central',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
      isVerified: true,
      farmType: 'Kisan Member',
      landSize: '15 Acres',
      memberSince: 'Joined 2026',
      totalDeals: 1,
      rating: 5.0,
      pin: pin
    };
    saveUserToStorage(newUser);
    return { success: true };
  };

  const registerFarmer = async (data: {
    name: string;
    phone: string;
    state: string;
    district: string;
    village: string;
    farmType: string;
    landSize?: string;
    pin?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!data.name.trim()) {
      return { success: false, error: 'Please enter your Full Name' };
    }
    const cleanPhone = data.phone.replace(/[^0-9]/g, '').slice(-10);
    if (!cleanPhone || cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number' };
    }

    const stateCode = data.state ? data.state.slice(0, 2).toUpperCase() : 'IN';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const kisanId = `KB-${stateCode}-2026-${randomNum}`;

    const newUser: FarmerUser = {
      id: `farmer_reg_${Date.now()}`,
      name: data.name.trim(),
      phone: cleanPhone,
      kisanId: kisanId,
      state: data.state || 'Punjab',
      district: data.district || 'Ludhiana',
      village: data.village || 'Gram',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      isVerified: true,
      farmType: data.farmType || 'Progressive Agriculture',
      landSize: data.landSize || '10 Acres',
      memberSince: 'Joined Today',
      totalDeals: 0,
      rating: 5.0,
      pin: data.pin || '1234'
    };

    saveUserToStorage(newUser);
    return { success: true };
  };

  const loginDemoUser = (id: string) => {
    const demo = DEMO_FARMERS.find(f => f.id === id) || DEMO_FARMERS[0];
    saveUserToStorage(demo);
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const updateProfile = (updated: Partial<FarmerUser>) => {
    if (currentUser) {
      const newUser = { ...currentUser, ...updated };
      saveUserToStorage(newUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loginWithOtp,
        loginWithPin,
        registerFarmer,
        loginDemoUser,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
