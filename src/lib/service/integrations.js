import { api } from ".";

export function fetchIntegrations() {
    return api("/profile/@me/integrations", "get");
}

export function updateIntegration(integrationId, data) {
    return api("/integration/" + integrationId, "patch", data);
}