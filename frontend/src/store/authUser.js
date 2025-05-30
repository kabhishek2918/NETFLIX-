import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// SET axios config HERE

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const { data } = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(error.response?.data?.message || "Signup failed");
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const { data } = await axios.post("/api/v1/auth/login", credentials);
      set({ user: data.user, isLoggingIn: false });
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch {
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
