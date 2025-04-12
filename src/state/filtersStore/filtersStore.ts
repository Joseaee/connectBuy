import { create } from 'zustand';

interface FilterState {
    category: string;
    setCategory: (value: string) => void;

    store: string;
    setStore: (value: string) => void;

    searchTerm: string;
    setSearchTerm: (value: string) => void;

    distance: string;
    setDistance: (value: string) => void;

    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    category: '',
    setCategory: (value: string) => set({ category: value }),

    store: '',
    setStore: (value: string) => set({ store: value }),

    searchTerm: '',
    setSearchTerm: (value: string) => set({ searchTerm: value }),

    distance: '',
    setDistance: (value: string) => set({ distance: value }),

    resetFilters: () => set({ category: '', store: '', searchTerm: '', distance: '' }),
}));

