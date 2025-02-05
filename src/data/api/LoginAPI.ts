import { auth } from "./config";

export interface ICredential {
    access_token: string,
    refresh_token: string,
    expiration: number
}

interface IAuthAPI {
    login: (username: string, password: string) => Promise<{data: ICredential}>;
    refresh: (token: string) => Promise<{data: ICredential}>;
}

export const createAuthAPI = (httpClient: typeof auth): IAuthAPI => {
    return {
        login: (username, password) => httpClient.post('auth', { username, password }),
        refresh: (token) => httpClient.post('auth/refresh-token', { refresh_token: token }),
    };
};

export const AuthAPI = createAuthAPI(auth);