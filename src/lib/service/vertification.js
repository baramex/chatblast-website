import { api } from ".";

export function verifyIntegrationDomain(integrationId) {
    return api("/verification/integration/" + integrationId + "/domain", "post");
}