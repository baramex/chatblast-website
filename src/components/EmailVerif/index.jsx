import { verifEmailCode } from "../../lib/service/profile";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function EmailVerif({ user, setUser, addAlert }) {
    const code = new URLSearchParams(document.location.search).get("code");
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (user?.email.isVerified) {
                history.push("/dashboard/profile");
            }
            else if (!code) {
                addAlert({ type: "error", title: "Code de vérification invalide.", ephemeral: true });
                if (user) history.push("/dashboard/profile");
                else history.push("/");
            }
            else if (!user) {
                addAlert({ type: "warning", title: "Connectez-vous pour vérifier votre adresse email.", ephemeral: true });
                history.push("/login?redirect=" + document.location.pathname + document.location.search);
            }
            else {
                try {
                    await verifEmailCode(code);
                    setUser(a => ({ ...a, email: { ...a.email, isVerified: true } }));
                    addAlert({ type: "success", title: "Email vérifiée.", ephemeral: true });
                } catch (error) {
                    addAlert({ type: "error", title: "Code de vérification invalide ou expiré.", ephemeral: true });
                }
                history.push("/dashboard/profile");
            }
        })();
    }, []);

    return null;
}