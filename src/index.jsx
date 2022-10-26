import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import { LoadingScreen } from './components/Layout/Loading';
import Login from './components/Login';
import FutherInformationModal from './components/Login/FutherInformation';
import Register from './components/Register';
import { isLogged } from './lib/service/authentification';
import { fetchUser, isComplete } from './lib/service/profile';
import "./styles/main.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

function App() {
    const [user, setUser] = useState(null);
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
            } else if (user) setUser(null);
        })();
    }, [user]);

    const props = { user, setUser };

    return (
        <>
            <LoadingScreen open={!user && isLogged()} />
            <FutherInformationModal open={furtherInformation} email={user?.email?.address} firstname={user?.name?.firstname} lastname={user?.name?.lastname} onSaved={(nuser) => handleSave(nuser, setUser, setFutherInformation)} />
            <Router>
                <Routes>
                    <Route path="/" element={<Home {...props} />} />
                    <Route path="/register" element={<Register {...props} />} />
                    <Route path="/login" element={<Login {...props} />} />
                </Routes>
            </Router>
        </>
    );
}

function handleSave(nuser, setUser, setFutherInformation) {
    setFutherInformation(false);
    setUser(nuser);
}