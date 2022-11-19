import { api } from ".";

export function fetchAffiliation() {
    return api("/profile/@me/affiliation");
}

export function updateAffiliation(data) {
    return api("/profile/@me/affiliation", "post", data);
}

export function fetchUsersAffiliation() {
    return api("/profile/@me/affiliation/users");
}