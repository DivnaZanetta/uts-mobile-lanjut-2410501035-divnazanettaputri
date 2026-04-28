import { create } from "zustand";

const useFavoriteStore = create((set, get) => ({
  favorites: [],
  addFavorite: (book) => set({ favorites: [...get().favorites, book] }),
  removeFavorite: (key) => set({ favorites: get().favorites.filter(b => b.key !== key) }),
  isFavorite: (key) => get().favorites.some(b => b.key === key),
}));

export default useFavoriteStore;