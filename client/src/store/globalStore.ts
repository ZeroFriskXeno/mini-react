import { create } from 'zustand';

interface GlobalState {
	error: string | null;
	success: string | null;
	setError: (error: string | null) => void;
	setSuccess: (success: string | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
	error: null,
	success: null,
	setError: (error) => set({ error }),
	setSuccess: (success) => set({ success }),
}));
