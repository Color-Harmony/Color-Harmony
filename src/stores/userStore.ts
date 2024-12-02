import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  hasMembership: boolean;
}

interface UserStore {
  users: User[];
  currentUser: User | null;
  isGuest: boolean;
  addUser: (user: Omit<User, 'id'>) => void;
  login: (email: string, password: string) => { success: boolean; message: string };
  loginAsGuest: () => void;
  logout: () => void;
  purchaseMembership: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isGuest: false,

      addUser: (userData) => {
        const existingUser = get().users.find(u => u.email === userData.email);
        if (existingUser) {
          return;
        }

        const newUser = {
          ...userData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isGuest: false,
        }));
      },

      login: (email, password) => {
        const user = get().users.find((u) => u.email === email);
        
        if (!user) {
          return { 
            success: false, 
            message: 'Usuario no registrado. Por favor, regístrese primero.' 
          };
        }

        if (user.password !== password) {
          return { 
            success: false, 
            message: 'Contraseña incorrecta.' 
          };
        }

        set({ currentUser: user, isGuest: false });
        return { 
          success: true, 
          message: 'Inicio de sesión exitoso.' 
        };
      },

      loginAsGuest: () => {
        set({ currentUser: null, isGuest: true });
      },

      logout: () => {
        set({ currentUser: null, isGuest: false });
      },

      purchaseMembership: () => {
        const { currentUser, users } = get();
        if (currentUser) {
          const updatedUser = { ...currentUser, hasMembership: true };
          const updatedUsers = users.map((u) =>
            u.id === currentUser.id ? updatedUser : u
          );
          set({
            currentUser: updatedUser,
            users: updatedUsers,
          });
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
);