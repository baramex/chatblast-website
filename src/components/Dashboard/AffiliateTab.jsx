import { fetchAffiliation } from "../../lib/service/affiliation";
import { useEffect } from "react";
import { dataSetter, fetchData } from "../../lib/service";
import { Label, TextField } from "../Misc/Fields";
import { Button } from "../Misc/Button";

export default function AffiliateTab({ user, data, setData, addAlert }) {
    useEffect(() => {
        if (!data.affiliation) fetchData(addAlert, dataSetter(setData, "affiliation"), fetchAffiliation);
    }, []);

    return (<>
        <div className="px-5">
            <h2 className="text-2xl font-semibold text-gray-900">Affiliation</h2>
        </div>
        <div className="px-6 mt-5">
            <p className="text-sm text-gray-800">Pour chaque utilisateur utilisant votre code, vous recevez 10% de sa première commande, directement sur paypal !</p>
            <form className="mt-5 max-w-xl">
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
                        />
                        <Button
                            className="sm:col-span-1 min-w-[10rem]"
                            color="emerald"
                        >Enregister</Button>
                    </div>
                </div>
            </form>

        </div>
    </>);
}