import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AffiliateTab from './components/Dashboard/AffiliateTab';
import IntegrationsTab from './components/Dashboard/IntegrationsTab';
import InvoiceTab from './components/Dashboard/InvoiceTab';
import ProfileTab from './components/Dashboard/ProfileTab';
import EmailVerif from './components/EmailVerif';
import Home from './components/Home';
import IntegrationDashboard from './components/IntegrationDashboard';
import AuthentificationTab from './components/IntegrationDashboard/AuthentificationTab';
import GeneralTab from './components/IntegrationDashboard/GeneralTab';
import IntegrationTab from './components/IntegrationDashboard/IntegrationTab';
import { LoadingScreen } from './components/Layout/Loading';
import Login from './components/Login';
import { AlertContainer } from './components/Misc/Alerts';
import FutherInformationModal from './components/Misc/FutherInformation';
import Register from './components/Register';
import { fetchData } from './lib/service';
import { isLogged } from './lib/service/authentification';
import { fetchUser, getAvatar, isComplete } from './lib/service/profile';
import { convertImageToDataURL } from './lib/utils/file';
import "./styles/main.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

function App() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState({});
    const [alerts, setAlerts] = useState([]);
    const [furtherInformation, setFutherInformation] = useState(false);
    const [emailAlerted, setEmailAlerted] = useState(false);

    function addAlert(alert) {
        setAlerts(a => [...a, { id: Date.now() + Math.round(Math.random() * 1000), ...alert }]);
    }

    useEffect(() => {
        (async () => {
            const suser = JSON.parse(sessionStorage.getItem('user'));
            const lastupdate = sessionStorage.getItem('lastupdate') || 0;
            if (isLogged()) {
                if (!user) {
                    if (suser && Date.now() - lastupdate < 1000 * 20) {
                        setUser(suser);
                        return;
                    }
                    else {
                        const tuser = await fetchData(addAlert, setUser, fetchUser);
                        if (tuser) sessionStorage.setItem("lastupdate", Date.now());
                        return;
                    }
                }

                if (!isComplete(user)) setFutherInformation(true);
                else if (!emailAlerted && !user.email.isVerified) {
                    addAlert({ name: "validate_email", type: "warning", title: "Veuillez vérifier votre adresse email." });
                    setEmailAlerted(true);
                }
                else if (user.email.isVerified && alerts.find(a => a.name === "validate_email")) setAlerts(a => a.filter(a => a.name !== "validate_email"));

                if (!user.avatar) {
                    const avatar = await getAvatar().catch(() => addAlert({ type: "error", title: "Une erreur est survenue lors de la récupération de votre avatar.", ephemeral: true }));
                    const avatarData = await convertImageToDataURL(avatar);
                    setUser(u => ({ ...u, avatar: avatarData }));
                }

                sessionStorage.setItem('user', JSON.stringify({ ...user, avatar: undefined }));
            } else {
                if (user) setUser(null);
                if (suser) sessionStorage.removeItem('user');
            }
        })();
    }, [user]);

    const props = { user, setUser, data, setData, addAlert };

    return (
        <>
            <AlertContainer alerts={alerts} setAlerts={setAlerts} />
            <LoadingScreen open={(!user || !user.avatar) && isLogged()} />
            <FutherInformationModal open={furtherInformation} email={user?.email?.address} firstname={user?.name?.firstname} lastname={user?.name?.lastname} onSaved={(nuser) => handleSave(nuser, setUser, setFutherInformation)} />
            {
                (isLogged() ? user : true) &&
                <Router>
                    <Route exact path="/"><Home {...props} /></Route>
                    <Route exact path="/register"><Register {...props} /></Route>
                    <Route exact path="/login"><Login {...props} /></Route>

                    <Route exact path="/dashboard"><Dashboard {...props} /></Route>
                    <Route exact path="/dashboard/profile"><Dashboard {...props} Tab={ProfileTab} /></Route>
                    <Route exact path="/dashboard/integrations"><Dashboard {...props} Tab={IntegrationsTab} /></Route>
                    <Route exact path="/dashboard/invoices"><Dashboard {...props} Tab={InvoiceTab} /></Route>
                    <Route exact path="/dashboard/affiliate"><Dashboard {...props} Tab={AffiliateTab} /></Route>

                    <Route exact path='/dashboard/integration/:id'><IntegrationDashboard {...props} Tab={GeneralTab} /></Route>
                    <Route exact path='/dashboard/integration/:id/authentification'><IntegrationDashboard {...props} Tab={AuthentificationTab} /></Route>
                    <Route exact path='/dashboard/integration/:id/integration'><IntegrationDashboard {...props} Tab={IntegrationTab} /></Route>
                    <Route exact path='/dashboard/integration/:id/customisation'><IntegrationDashboard {...props} /></Route>
                    <Route exact path='/dashboard/integration/:id/analyses'><IntegrationDashboard {...props} /></Route>

                    <Route exact path="/verification/email"><EmailVerif {...props} /></Route>
                </Router>}
        </>
    );
}

function handleSave(nuser, setUser, setFutherInformation) {
    setFutherInformation(false);
    setUser(nuser);
}