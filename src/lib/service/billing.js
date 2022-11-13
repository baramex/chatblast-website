import { api } from ".";

export function fetchInvoices() {
    return api("/profile/@me/invoices");
}

export function fetchInvoicePDF(id) {
    return api(`/invoice/${id}/pdf`, "GET", null, null, "blob");
}