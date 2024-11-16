import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./login.module.css"; // Importar tus estilos

export default function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username !== "" && password !== "") {
      const body = { username, password };

      try {
        const response = await fetch("http://localhost:5000/api/login", {
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
          }).then(() => {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/jugadores");
          });
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
      <div className={styles.content}>
        <FaCircleUser size={60} color="rgb(28, 90, 189)" />
        <input
          type="text"
          placeholder="Ingrese username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLogin} className={styles.button}>
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
