import { api } from ".";

export function fetchUser() {
    return api("/profile/@me", "get")
}

export function isComplete(user) {
    return user && user.email && user.email.address && user.name && user.name.firstname && user.name.lastname;
}

export function isVerified(user) {
    return user && user.email && user.email.isVerified;
}

export function pacthUser(body) {
    return api("/profile/@me", "patch", body);
}

export function getAvatar() {
    return api("/profile/@me/avatar", "get", undefined, undefined, "blob");
}

export function verifEmailCode(code) {
    return api("/verification/email/code", "post", { code });
}

export function verifEmailSend() {
    return api("/verification/email/send", "post");
}