import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./register.module.css"; // Importar los estilos

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username !== "" && password !== "") {
      const body = { username, password };

      try {
        const response = await fetch("https://backendnextplayer.onrender.com/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          Swal.fire({
            title: "Registro exitoso",
            text: "Ahora puedes iniciar sesión",
            icon: "success",
          });
          navigate("/login");
        } else {
          Swal.fire({
            title: "Error",
            text: "El usuario ya existe o hubo un problema",
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
      <h1>Bienvenido/a!</h1>
      <div className={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleRegister} className={styles.button}>
          Registrarse
        </button>
      <p>
        Already have an account? <a href="/login" className={styles.link}>Login</a>
      </p>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2024 - Página increíble</p>
      </footer>
      <p>
        Already have an account? <a href="/login" className={styles.link}>Login</a>
      </p>
    </div>
  );
}
