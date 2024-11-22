import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./login.module.css"; // Importar tus estilos

export default function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const body = { username, password };
      setIsLoading(true); // Mostrar indicador de carga

      try {
        const response = await fetch("https://backendnextplayer.onrender.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          Swal.fire({
            title: "Inicio de sesión exitoso",
            icon: "success",
          });
          login();
          navigate("/jugadores");
        } else {
          Swal.fire({
            title: "Error en las credenciales",
            text: "Por favor, verifica tu usuario y contraseña",
            icon: "error",
          });
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al conectarse con el servidor",
          icon: "error",
        });
      } finally {
        setIsLoading(false); // Ocultar indicador de carga
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
      });
    }
  };

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <img src="nextPlayerLogo.png" className={styles.logo} alt="Logo" />
        <a href="mailto:giovannirafi@unisabana.edu.co" className={styles.contactLink}>
          Contact
        </a>
      </header>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      )}
      <div className={styles.content} style={{ opacity: isLoading ? 0.5 : 1 }}>
        <FaCircleUser size={60} color="rgb(28, 90, 189)" />
        <input
          type="text"
          placeholder="Ingrese username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <button
          onClick={handleLogin}
          className={styles.button}
          disabled={isLoading} // Deshabilitar botón si está cargando
        >
          Iniciar sesión
        </button>
      </div>
      <a href="/register" className={styles.registerLink}>
        ¿No tienes cuenta? Regístrate aquí
      </a>
      <footer className={styles.footer}>
        <p>&copy; 2024 - Página increíble</p>
      </footer>
    </div>
  );
}
