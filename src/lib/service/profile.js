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