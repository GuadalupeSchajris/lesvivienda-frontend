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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,12}$/;
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Datos enviados:", formData);
      setShowModal(true);
      setFormData({ email: "", password: "", name: "" });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.title}>Crear cuenta</h1>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Escribe tu email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          aria-describedby="emailHelp"
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <label htmlFor="password" className={styles.label}>
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Escribe una contraseña segura"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          aria-describedby="passwordHelp"
          required
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <label htmlFor="name" className={styles.label}>
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Escribe tu nombre"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          aria-describedby="nameHelp"
          required
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        {errors.general && <p className={styles.error}>{errors.general}</p>}

        <button type="submit" className={styles.submitButton}>
          Crear cuenta
        </button>
      </form>

      {showModal && (
        <Modal onClose={closeModal}>
          <p>Cuenta creada con éxito 🎉</p>
        </Modal>
      )}
    </div>
  );
}
