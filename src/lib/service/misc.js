import { api } from ".";

export function fetchWebsiteTraffic(domain) {
    return api("/website-traffic?domain=" + domain, "get");
}