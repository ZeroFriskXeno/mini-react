import { create } from 'zustand';

interface GlobalState {
	error: string | null;
	success: string | null;
	data: string | null;
	setError: (error: string | null) => void;
	setSuccess: (success: string | null) => void;
	setData: (data: string | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
	error: null,
	success: null,
	data: null,
	setError: (error) => set({ error }),
	setSuccess: (success) => set({ success }),
	setData: (data) => set({data})
}));
