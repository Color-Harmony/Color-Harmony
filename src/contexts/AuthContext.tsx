import React, { createContext, useContext, ReactNode } from 'react';
import { User, UserCircle2 } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

interface AuthContextType {
  isLoggedIn: boolean;
  isGuest: boolean;
  userName: string | null;
  hasMembership: boolean;
  login: (name: string, email: string, password: string) => { success: boolean; message: string };
  loginAsGuest: () => void;
  logout: () => void;
  purchaseMembership: (membershipData: MembershipData) => void;
}

export interface MembershipData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  phone: string;
  address: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    currentUser, 
    isGuest, 
    addUser, 
    login: storeLogin, 
    loginAsGuest: storeLoginAsGuest, 
    logout: storeLogout, 
    purchaseMembership: storePurchaseMembership 
  } = useUserStore();

  const login = (name: string, email: string, password: string) => {
    if (!name) {
      return storeLogin(email, password);
    }

    const loginResult = storeLogin(email, password);
    if (loginResult.success) {
      return { success: false, message: 'El correo electrónico ya está registrado.' };
    }

    addUser({ name, email, password, hasMembership: false });
    return { success: true, message: 'Registro exitoso.' };
  };

  const loginAsGuest = () => {
    storeLoginAsGuest();
  };

  const logout = () => {
    storeLogout();
  };

  const purchaseMembership = (membershipData: MembershipData) => {
    storePurchaseMembership();
    console.log('Processing membership purchase:', membershipData);
  };

  const value = {
    isLoggedIn: !!currentUser,
    isGuest,
    userName: currentUser?.name ?? null,
    hasMembership: currentUser?.hasMembership ?? false,
    login,
    loginAsGuest,
    logout,
    purchaseMembership
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const UserIcon: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <User className="h-6 w-6" />
  ) : (
    <UserCircle2 className="h-6 w-6" />
  );
};