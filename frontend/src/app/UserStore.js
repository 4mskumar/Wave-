import { create } from "zustand";
import axios from "../api/axiosConfig.js";

export const useUserStore = create((set, get) => ({
    followers: [],
    following: [],
    feed: [],
    loading: false,
    error: false,
    globalUsers : [],

    setUserData: async (userId, username, fullName, imageurl, bio = '') => {
        try {
            // console.log('in user store');
            // console.log(userId);        
            // console.log(imageurl);
            

            const res = await axios.post("/set-user", {
                userId, username, fullName, imageUrl:imageurl
            });

            if (res.data.success) {
                set({ loading: true });

                set((state) => ({
                    followers: [...state.followers, res.data.followers],
                    following: [...state.following, res.data.following],
                }))
                // console.log('succes');

                set({ loading: false });
                return { success: true };

            } else {
                set({ loading: false, error: true });
                return { success: true, message: res.data.message };


            }
        } catch (error) {
            console.log(error.message);

        }
    },

    getUserFeed: async (userId) => {
        try {
            const res = await axios.get('/feed', { params: { userId } });

            if (res.data.success) {
                // Access previous state if you want
                // const prevFeed = get().feed;

                // const newFeed = [...prevFeed, ...res.data.feedData]; // append properly

                set({ feed: res.data.feedData });


            }
        } catch (error) {
            console.log(error.message);
        }
    },

    getFollowers  :async (userId) => {
        try {
            const res = await axios.get('/followers', {params : {userId}})
            if(res.data.success){
                set({followers : res.data.followers})
            }
        } catch (error) {
            console.log(error.message);
            
        }
    },

    getGlobalUsers : async (userId) => {
        try {
            const res = axios.get('/g/users', {params : {userId}})

            if(res.data.success){
                set({globalUsers : res.data.gUsers})
            }
        } catch (error) {
            console.log(error.message);            
        }
    }

}))
