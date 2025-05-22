import React, { useState } from "react";
import styles from "./Register.module.css";
import Modal from "../../components/Modal/Modal";

export default function Registro() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    general: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,12}$/;
  const nameRegex = /^[A-Za-zñÑçÇª\s]+$/;
  const forbiddenChars = /[<>/]/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (forbiddenChars.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "No se permiten los caracteres <, > o /"
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", name: "", general: "" };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Introduce un email válido";
      valid = false;
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener entre 7 y 12 caracteres, con al menos 1 mayúscula, 1 minúscula y 1 número";
      valid = false;
    }

    if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "Solo se permiten letras (mayúsculas, minúsculas), ñ, ç y ª";
      valid = false;
    }

    if (
      forbiddenChars.test(formData.name) ||
      forbiddenChars.test(formData.email) ||
      forbiddenChars.test(formData.password)
    ) {
      newErrors.general = "No se permiten los caracteres <, > o /";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.email,
            password: formData.password,
            name: formData.name
          })
        });

        if (response.ok) {
          setShowModal(true);
          setFormData({ email: "", password: "", name: "" });
          setErrors({ email: "", password: "", name: "", general: "" });
        } else {
          const errorData = await response.json();
          setErrors((prev) => ({
            ...prev,
            general: errorData.message || "Error al registrar"
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general: "Error de red o del servidor"
        }));
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}>Crear cuenta</h1>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Escribe tu email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Escribe una contraseña segura"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.showPasswordButton}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <label htmlFor="name" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Escribe tu nombre"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        {errors.general && <p className={styles.error}>{errors.general}</p>}

        <button type="submit" className={styles.submitButton}>Crear cuenta</button>
      </form>

      {showModal && (
        <Modal onClose={closeModal}>
          <p>Cuenta creada con éxito 🎉</p>
        </Modal>
      )}
    </div>
  );
}
