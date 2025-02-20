import { create } from "zustand";
import { db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";

export const useUserStore = create((set) => ({
	currentUser: null,
	isLoading: true,
	fetchUserInfo: async (uid) => {
		if (!uid) return set({ currentUser: null, isLoading: false });

		try {
			const docRef = await getDoc(doc(db, "users", uid));
			if (docRef.exists()) {
				set({ currentUser: docRef.data(), isLoading: false });
			} else {
				set({ currentUser: null, isLoading: false });
			}
		} catch (error) {
			console.log(error);
			set({ currentUser: null, isLoading: false });
		}
	},
}));
