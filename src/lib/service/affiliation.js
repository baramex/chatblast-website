import { api } from ".";

export function fetchAffiliation() {
    return api("/profile/@me/affiliation");
}