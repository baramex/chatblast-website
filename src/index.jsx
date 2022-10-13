import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages';
import Login from './pages/login';
import Register from './pages/register';
import "./styles/main.css";
import "./styles/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </>
);