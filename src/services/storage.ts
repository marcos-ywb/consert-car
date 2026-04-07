import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@App:user";

export const StorageService = {
    async saveUser(user: any) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    async getUser() {
        const data = await AsyncStorage.getItem(USER_KEY);
        return data ? JSON.parse(data) : null;
    },

    async removeUser() {
        await AsyncStorage.removeItem(USER_KEY);
    }
};