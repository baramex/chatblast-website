import { api } from ".";

export function fetchIntegrations() {
    return api("/profile/@me/integrations", "get");
}