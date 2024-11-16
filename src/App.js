import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "./containers/login/login";
import PlayerList from "./containers/playerList/playerList"; // Asegúrate de que este archivo existe
import RegisterContainer from "./containers/register/register"; // Importa el componente de registro

import { AuthProvider, useAuth } from "./context/AuthContext";

export default function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <AuthProvider>
    <BrowserRouter>
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
    </BrowserRouter>
    </AuthProvider>
  );
}
