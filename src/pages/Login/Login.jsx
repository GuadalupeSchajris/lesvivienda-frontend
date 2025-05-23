import React, { useState } from "react";
import styles from "./Login.module.css";
import Modal from "../../components/Modal/Modal";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,12}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!emailRegex.test(value)) {
      setEmailError("Ingrese un formato de email válido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!passRegex.test(value)) {
      setPassError("La contraseña debe tener entre 7 y 12 caracteres, con al menos 1 mayúscula, 1 minúscula y 1 número");
    } else {
      setPassError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setModalMessage("Por favor completa todos los campos.");
      setShowModal(true);
      return;
    }

    if (emailError || passError) {
      setModalMessage("Por favor corrige los errores antes de enviar.");
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});


      const data = await response.json();

      if (response.ok) {
        setModalMessage(data.message || "Inicio de sesión exitoso!");
        setShowModal(true);
        setEmail("");
        setPassword("");
      } else {
        setModalMessage(data.message || "Usuario no registrado o datos incorrectos.");
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage("Error de conexión con el servidor.");
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Escribe aquí tu E-mail"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            required
            aria-describedby="emailHelp"
          />
          {emailError && <p className={styles.error}>{emailError}</p>}

          <label htmlFor="password" className={styles.label}>Contraseña</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Escribe aquí tu contraseña"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
              required
              aria-describedby="passwordHelp"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.eyeButton}
              aria-label="Mostrar u ocultar contraseña"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5
                    5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 100 6 3 3 0 000-6z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c.68 1.72 1.8 3.23 3.18 4.44L2 18.59 3.41 20l2.54-2.54C8.11 18.39 9.99 19.5 12 19.5c5 0 9.27-3.11 11-7.5-.88-2.22-2.44-4.09-4.41-5.33L20.59 4 19.17 2.59l-4.07 4.07A6.98 6.98 0 0012 6c-2.76 0-5.26 1.68-6.32 4.09L12 16.41 13.41 15l-7.4-7.4C7.61 5.27 9.7 4.5 12 4.5z"/>
                </svg>
              )}
            </button>
          </div>
          {passError && <p className={styles.error}>{passError}</p>}

          <button type="submit" className={styles.submitButton}>Entrar</button>

          <div className={styles.registerPrompt}>
            ¿No estás registrado?{" "}
            <a href="http://localhost:5173/Registro" className={styles.registerLink}>
              HAZ CLICK AQUÍ
            </a>
          </div>
        </form>
      </div>

      {showModal && (
        <Modal mensaje={modalMessage} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
