import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { LoadingScreen } from './components/Layout/Loading';
import Login from './components/Login';
import { AlertContainer } from './components/Misc/Alerts';
import FutherInformationModal from './components/Misc/FutherInformation';
import Register from './components/Register';
import { isLogged } from './lib/service/authentification';
import { fetchUser, getAvatar, isComplete } from './lib/service/profile';
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

    useEffect(() => {
        (async () => {
            if (isLogged()) {
                if (!user) {
                    const tuser = await fetchUser().catch(() => { });
                    if (tuser) {
                        setUser(tuser);
                    }
                    return;
                }

                if (!isComplete(user)) setFutherInformation(true);
                else if (!user.email.isVerified && !alerts.some(a => a.name === "validate_email")) setAlerts(a => [...a, { name: "validate_email", type: "warning", title: "Veuillez vérifier votre adresse email." }]);

                if (!user.avatar) {
                    const avatar = await getAvatar();
                    setUser(u => ({ ...u, avatar: URL.createObjectURL(avatar) }));
                }
            } else if (user) setUser(null);
        })();
    }, [user]);

    const props = { user, setUser, setAlerts };

    return (
        <>
            <AlertContainer alerts={alerts} setAlerts={setAlerts} />
            <LoadingScreen open={!user && isLogged()} />
            <FutherInformationModal open={furtherInformation} email={user?.email?.address} firstname={user?.name?.firstname} lastname={user?.name?.lastname} onSaved={(nuser) => handleSave(nuser, setUser, setFutherInformation)} />
            <Router>
                <Routes>
                    <Route path="/" element={<Home {...props} />} />
                    <Route path="/register" element={<Register {...props} />} />
                    <Route path="/login" element={<Login {...props} />} />
                    <Route path="/dashboard" element={<Dashboard {...props} />} />
                </Routes>
            </Router>
        </>
    );
}

function handleSave(nuser, setUser, setFutherInformation) {
    setFutherInformation(false);
    setUser(nuser);
}