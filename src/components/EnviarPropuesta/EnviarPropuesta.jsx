import React, { useState } from "react";
import styles from "./EnviarPropuesta.module.css";
import Modal from "../Modal/Modal";

export default function EnviarPropuesta() {
  const [nombre, setNombre] = useState("");
  const [propuesta, setPropuesta] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalNombre = nombre.trim() || "Anónima";

    try {
      const response = await fetch("http://localhost:8080/propuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: finalNombre, propuesta }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la propuesta");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      setNombre("");
      setPropuesta("");
      setError(null);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      setError("No se pudo enviar la propuesta. Intenta de nuevo más tarde.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Tu nombre (opcional)"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Escribe tu propuesta..."
          value={propuesta}
          onChange={(e) => setPropuesta(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {showModal && (
        <Modal
          mensaje="Propuesta enviada correctamente!"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
