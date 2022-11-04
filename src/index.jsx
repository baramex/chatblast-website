import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProfileTab from './components/Dashboard/ProfileTab';
import EmailVerif from './components/EmailVerif';
import Home from './components/Home';
import { LoadingScreen } from './components/Layout/Loading';
import Login from './components/Login';
import { AlertContainer } from './components/Misc/Alerts';
import FutherInformationModal from './components/Misc/FutherInformation';
import Register from './components/Register';
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
                        const tuser = await fetchUser().catch(() => { });
                        if (tuser) {
                            setUser(tuser);
                            sessionStorage.setItem("lastupdate", Date.now());
                        }
                        return;
                    }
                }

                if (!isComplete(user)) setFutherInformation(true);
                else if (!emailAlerted && !user.email.isVerified) {
                    addAlert({ name: "validate_email", type: "warning", title: "Veuillez vérifier votre adresse email." });
                    setEmailAlerted(true);
                }

                if (!user.avatar) {
                    const avatar = await getAvatar();
                    const data = await convertImageToDataURL(avatar);
                    setUser(u => ({ ...u, avatar: data }));
                }

                sessionStorage.setItem('user', JSON.stringify(user));
            } else {
                if (user) setUser(null);
                if (suser) sessionStorage.removeItem('user');
            }
        })();
    }, [user]);

    const props = { user, setUser, addAlert };

    return (
        <>
            <AlertContainer alerts={alerts} setAlerts={setAlerts} />
            <LoadingScreen open={!user && isLogged()} />
            <FutherInformationModal open={furtherInformation} email={user?.email?.address} firstname={user?.name?.firstname} lastname={user?.name?.lastname} onSaved={(nuser) => handleSave(nuser, setUser, setFutherInformation)} />
            {
                (isLogged() ? user : true) &&
                <Router>
                    <Routes>
                        <Route path="/" element={<Home {...props} />} />
                        <Route path="/register" element={<Register {...props} />} />
                        <Route path="/login" element={<Login {...props} />} />

                        <Route path="/dashboard" element={<Dashboard {...props} />} />
                        <Route path="/dashboard/profile" element={<Dashboard {...props} Tab={ProfileTab} />} />
                        <Route path="/dashboard/integrations" element={<Dashboard {...props} Tab="integrations" />} />
                        <Route path="/dashboard/invoices" element={<Dashboard {...props} />} />

                        <Route path="/verification/email" element={<EmailVerif {...props} />} />
                    </Routes>
                </Router>}
        </>
    );
}

function handleSave(nuser, setUser, setFutherInformation) {
    setFutherInformation(false);
    setUser(nuser);
}