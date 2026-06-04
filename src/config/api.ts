import { Platform } from "react-native";

const BASE_URL = Platform.OS === "web"
    ? "http://localhost:3000"
    : "http://192.168.100.186:3000";

export default BASE_URL;