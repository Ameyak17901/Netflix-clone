import { create } from "zustand";
import { LoginCredentials, SignUpCredentials } from "../models/user";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSignUp: false,
  isAuthCheck: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentials: SignUpCredentials) => {
    set({ isSignUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSignUp: false });
      toast.success("Account created successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error.response?.data?.message;
        console.error(error.response?.data?.message);
        toast.error(err || "Error signing up!");
      } else {
        console.error("failed to sign up", error);
        toast.error("Something went wrong!");
      }

      set({ isSignUp: false, user: null });
    }
  },
  login: async (credentials: LoginCredentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      if (response.data.success && response.status !== 200) {
        console.error("Error signing in");
      }
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully!");
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      console.error("Error logging in", error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error signing in");
      } else {
        toast.error("Error signing in");
      }
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error signing out");
      } else {
        toast.error("Error signing out");
      }
    }
  },
  authCheck: async () => {
    set({ isAuthCheck: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      console.log("user", response.data.user);
      set({ user: response.data.user, isAuthCheck: false });
    } catch (error) {
      set({ isAuthCheck: false, user: null });
      console.error("Error authenicating", error);
    }
  },
}));
