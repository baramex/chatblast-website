import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import "./styles/main.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

function App() {
    const [user, setUser] = useState(null);

    const props = { user, setUser };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home {...props} />} />
                <Route path="/register" element={<Register {...props} />} />
                <Route path="/login" element={<Login {...props} />} />
            </Routes>
        </Router>
    );
}