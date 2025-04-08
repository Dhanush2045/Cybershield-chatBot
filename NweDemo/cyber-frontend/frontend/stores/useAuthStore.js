import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isLoggingIn: false,
      isCheckingAuth: true, // ✅ Start in checking state
      isSigningUp: false,

      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/login", data, {
            withCredentials: true,
          });
          set({ authUser: res.data.user });
          console.log(res.data);
          toast.success('Logged in successfully');
        } catch (error) {
          console.log('Error in login useAuthStore:', error);
          toast.error(error.response?.data?.error || error.message);
        } finally {
          set({ isLoggingIn: false });
        }
      },

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/check",{
            withCredentials:true,
          });
          set({ authUser: res.data.user });
        } catch (error) {
          console.error('Error in checkAuth:', error);
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post('/register', data);
          set({ authUser: res.data.user });
          toast.success('Account created successfully');
        } catch (error) {
          console.error('Error in signup:', error);
          toast.error(error.response?.data?.error || error.message);
        } finally {
          set({ isSigningUp: false });
        }
      },

      logout: async () => {
        try {
          await axiosInstance.get('/logout');
          set({ authUser: null });
          console.log(get().authUser);
          toast.success('Logged out successfully');
        } catch (error) {
          console.error('Error in logout:', error);
          toast.error(error.response?.data?.error || error.message);
        }
      },
    }),
  )
);