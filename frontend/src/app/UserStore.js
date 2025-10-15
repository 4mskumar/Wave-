import { create } from "zustand";
import axios from "../api/axiosConfig.js";

export const useUserStore = create((set, get) => ({
    followers: [],
    following: [],
    loading: false,
    error: false,

    setUserData: async (userId, username, fullName, imageurl = '', bio = '') => {
        try {
            console.log('in user store');
            console.log(userId);        

            const res = await axios.post("/set-user", {
                userId, username, fullName
            });

            if(res.data.success){
                set({ loading: true });

                set((state) => ({
                    followers : [...state.followers, res.data.followers],
                    following : [...state.following, res.data.following],
                }))
                console.log('succes');
                
                set({ loading: false });
                return { success: true };
                
            }else{
                set({ loading: false, error : true });
        return { success: true, message: res.data.message };
        

            }
        } catch (error) {
            console.log(error.message);
            
        }
    }
}))
