import { fetchAffiliation, fetchUsersAffiliation, updateAffiliation } from "../../lib/service/affiliation";
import { useEffect, useRef } from "react";
import { dataSetter, fetchData } from "../../lib/service";
import { Label, TextField } from "../Misc/Fields";
import { Button } from "../Misc/Button";
import { LinkIcon } from "@heroicons/react/20/solid";
import { formatDate } from "../../lib/utils/date";
import useBeforeUnload from "../../lib/hooks/useBeforeUnload";

export default function AffiliateTab({ user, data, setData, addAlert }) {
    const form = useRef(null);

    useEffect(() => {
        if (!data.affiliation) fetchData(addAlert, dataSetter(setData, "affiliation"), fetchAffiliation);
    }, []);

    useEffect(() => {
        if (data.affiliation && !data.users_affiliation) fetchData(addAlert, dataSetter(setData, "users_affiliation"), fetchUsersAffiliation);
    }, [data.affiliation]);

    useBeforeUnload({
        message: "Voulez-vous vraiment quitter cette page ? Les modifications non enregistrées seront perdues.",
        when: () => form.current ? Array.from(form.current.querySelectorAll("input")).some(a => a.hasAttribute("changed")) : false
    });

    const url = data.affiliation ? `${document.location.origin}/register?affiliateCode=${data.affiliation?.code}` : null;

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Affiliation</h2>
        </div>
        <div className="px-6 mt-5">
            <p className="text-sm text-gray-800">Pour chaque utilisateur utilisant votre code, vous recevez 10% de sa première commande, directement sur paypal !</p>
            <form ref={form} onSubmit={e => handleSave(e, setData, addAlert)} className="mt-5 max-w-xl">
                <div>
                    <Label>Email Paypal</Label>
                    <div className="flex gap-6">
                        <TextField
                            id="paypal"
                            type="email"
                            className="sm:col-span-2 w-full"
                            defaultValue={data.affiliation?.paypalEmail}
                            placeholder={user.email?.address}
                            showChanged={true}
                            required
                        />
                        <Button
                            className="sm:col-span-1 min-w-[10rem]"
                            color="emerald"
                        >Enregister</Button>
                    </div>
                </div>
            </form>
            <div className="flex items-center mt-3">
                <p className="text-gray-900 text-sm">Votre code: <a href={url} target="_blank" className="underline">{data.affiliation?.code || "Non configuré"}</a></p>
                <button onClick={() => url && copyLink(url, addAlert)} className="ml-1 disabled:cursor-not-allowed disabled:opacity-75" disabled={!data.affiliation}><LinkIcon className="w-5 text-gray-700" /></button>
            </div>

            <h3 className="font-medium mb-2 mt-8 text-xl">Commandes</h3>

            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Nom d'utilisateur
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Commission (10%)
                        </th>
                        <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.users_affiliation?.map((affiliate) => (
                        <tr key={affiliate._id}>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-700 font-medium">{affiliate.profile.username}</td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{(affiliate.price * 0.1).toFixed(2)} €</td>
                            <td className="whitespace-nowrap py-4 px-3 text-sm text-gray-500">{formatDate(affiliate.date)}</td>
                        </tr>
                    ))}
                    {data.users_affiliation?.length === 0 && <tr><td colSpan="3" className="py-4 px-3 text-center text-gray-600 text-sm">Aucune utilisation pour le moment.</td></tr>}
                </tbody>
            </table>
        </div>
    </>);
}

function copyLink(url, addAlert) {
    if (!navigator?.clipboard) return addAlert({ type: "error", title: <>Impossible de copier le lien: <a href={url} target="_blank" className="underline">{url}</a></>, ephemeral: true });
    navigator.clipboard.writeText(url);
    addAlert({ type: "success", title: "Le lien a été copié dans le presse-papier.", ephemeral: true });
}

async function handleSave(e, setData, addAlert) {
    e.preventDefault();

    const elements = e.target.querySelectorAll("input, button");
    elements.forEach(el => el.disabled = true);

    try {
        const data = await updateAffiliation({ paypalEmail: e.target.paypal.value });

        setData(prev => {
            prev.affiliation = data;
            return prev;
        });

        addAlert({ type: "success", title: "Les informations ont été mises à jour.", ephemeral: true });
    } catch (error) {
        addAlert({ title: "Impossible de mettre à jour l'affiliation: " + (error.message || "Une erreur est survenue."), type: "error", ephemeral: true });
    }
    finally {
        elements.forEach(el => el.disabled = false);
    }
}