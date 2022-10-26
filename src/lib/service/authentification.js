import { api } from ".";
import { getCookie } from "../utils/cookie";

export const USERS_TYPE = {
    DEFAULT: 0,
    ANONYME: 1,
    OAUTHED: 2
};

export function loginUser(username, password) {
    return api("/login", "post", { username, password });
}

export async function registerUser(email, firstname, lastname, username, password, avatar) {
    const res = await api("/profile", "post", { username, password, email, firstname, lastname });

    if (avatar) {
        await uploadAvatar(avatar);
    }

    return res;
}

export function uploadAvatar(file) {
    const formData = new FormData();

    formData.append('avatar', file);
    return api("/profile/@me/avatar", "put", formData, { "Content-Type": "multipart/form-data" });
}

export function logoutUser() {
    return api("/disconnect", "post");
}

export function isLogged() {
    return !!getCookie("token");
}