import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://localhost:3000";

const getToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem("@token");
};

const request = async <T>(
    method: string,
    path: string,
    body?: object
): Promise<T> => {
    const token = await getToken();

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw { status: response.status, message: error.message ?? "Erro na requisição" };
    }

    return response.json();
};

const api = {
    get: <T>(path: string) => request<T>("GET", path),
    post: <T>(path: string, body: object) => request<T>("POST", path, body),
    put: <T>(path: string, body: object) => request<T>("PUT", path, body),
    delete: <T>(path: string) => request<T>("DELETE", path),
};

export default api;