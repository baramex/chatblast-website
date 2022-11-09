import { api } from ".";

export function fetchSubscriptions() {
    return api("/profile/@me/subscriptions", "get");
}

export function subscribe(planId, modules, additionalSites) {
    return api("/subscribe", "post", {
        planId,
        modules,
        additionalSites
    });
}