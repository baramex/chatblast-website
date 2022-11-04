import { verifEmailCode } from "../../lib/service/profile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailVerif({ user, setUser, addAlert }) {
    const code = new URLSearchParams(document.location.search).get("code");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (user?.email.isVerified) {
                navigate("/dashboard/profile");
            }
            else if (!code) {
                addAlert({ type: "error", title: "Code de vérification invalide.", ephemeral: true });
                if (user) navigate("/dashboard/profile");
                else navigate("/");
            }
            else if (!user) {
                addAlert({ type: "warning", title: "Connectez-vous pour vérifier votre adresse email.", ephemeral: true });
                navigate("/login?redirect=" + document.location.pathname + document.location.search);
            }
            else {
                try {
                    await verifEmailCode(code);
                    setUser(a => ({ ...a, email: { ...a.email, isVerified: true } }));
                    addAlert({ type: "success", title: "Email vérifiée.", ephemeral: true });
                } catch (error) {
                    addAlert({ type: "error", title: "Code de vérification invalide ou expiré.", ephemeral: true });
                }
                navigate("/dashboard/profile");
            }
        })();
    }, []);

    return null;
}