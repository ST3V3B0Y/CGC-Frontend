import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import "./App.css";
import "./styles/home.css";
import "./styles/navbar.css"
import Home from "./pages/Home";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Dashboard from "./pages/UserDashboard";
import AdminPanel from "./pages/AdminPanel";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { LibraryProvider } from "./context/LibraryProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */} 
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Rutas privadas */} 
          <Route
            path="/dashboard"
            element={<LibraryProvider><PrivateRoute><Dashboard /></PrivateRoute></LibraryProvider>}
          />
          <Route
            path="/admin-panel"
            element={<PrivateRoute requiredRole="admin"><AdminPanel /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;