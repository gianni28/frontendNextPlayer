import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./register.module.css"; // Importar los estilos

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username !== "" && password !== "") {
      const body = { username, password };
      setIsLoading(true); // Mostrar indicador de carga

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
      <h1>Bienvenido/a!</h1>
      <div className={styles.form} style={{ opacity: isLoading ? 0.5 : 1 }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          disabled={isLoading} // Deshabilitar input mientras carga
        />
        <button
          onClick={handleRegister}
          className={styles.button}
          disabled={isLoading} // Deshabilitar botón si está cargando
        >
          Registrarse
        </button>
        <a href="/login" className={styles.loginLink}>
          ¿Ya tienes cuenta? Inicia sesión aquí
        </a>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2024 - Página increíble</p>
      </footer>
    </div>
  );
}
