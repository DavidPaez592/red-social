import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));

export default useUserStore;
