import { dataSetter, fetchData } from "../../lib/service";
import { useEffect } from "react"
import { fetchInvoicePDF, fetchInvoices } from "../../lib/service/billing";
import { formatDate } from "../../lib/utils/date";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function InvoiceTab({ data, setData, addAlert }) {
    useEffect(() => {
        if (!data.invoices) fetchData(addAlert, dataSetter(setData, "invoices"), fetchInvoices);
    }, []);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Factures</h2>
        </div>
        <div className="px-6 mt-5">
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Facture ID
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Date
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Prix TTC
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.invoices?.map((invoice) => (
                        <tr key={invoice._id}>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-700 font-medium">{invoice._id}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{formatDate(invoice.date)}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{["En cours de traitement", "Payée", "Erreur", "Remboursée"][invoice.state]}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{(invoice.articles.map(a => a.article.price * a.quantity * (1 - a.discount / 100)).reduce((a, b) => a + b, 0) * (1 + invoice.vat / 100)).toFixed(2)} €</td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm font-medium">
                                <button onClick={() => downloadInvoice(invoice._id, addAlert)} className="text-indigo-600 hover:text-indigo-900">
                                    <DocumentArrowDownIcon className="w-5 mr-1 inline" /> PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                    {data.invoices?.length === 0 && <tr><td colSpan="5" className="py-4 px-3 text-center text-gray-600 text-sm">Aucune facture pour le moment.</td></tr>}
                </tbody>
            </table>
        </div>
    </>)
}

async function downloadInvoice(id, addAlert) {
    try {
        const res = await fetchInvoicePDF(id);
        const url = URL.createObjectURL(res);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ChatBlast-facture-${id}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error);
        addAlert({ type: "error", title: "Une erreur est survenue lors du téléchargement de la facture.", ephemeral: true });
    }
}