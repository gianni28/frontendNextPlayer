
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "./containers/login/login";
import PlayerList from "./containers/playerList/playerList"; // Asegúrate de que este archivo existe
import RegisterContainer from "./containers/register/register"; // Importa el componente de registro

import { AuthProvider, useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth(); // Use context directly for authentication state

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route
        path="/jugadores"
        element={
          isAuthenticated ? <PlayerList /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
