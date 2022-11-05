import { api } from ".";

export function fetchSubscriptions() {
    return api("/profile/@me/subscriptions", "get");
}