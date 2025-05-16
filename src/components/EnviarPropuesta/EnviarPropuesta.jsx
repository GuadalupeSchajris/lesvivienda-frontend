import React, { useState } from "react";
import styles from "./EnviarPropuesta.module.css";
import Modal from "../Modal/Modal";

export default function EnviarPropuesta() {
  const [nombre, setNombre] = useState("");
  const [propuesta, setPropuesta] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalNombre = nombre.trim() || "Anónima";

    console.log("Enviado a admin:", {
      nombre: finalNombre,
      propuesta,
    });

    setNombre("");
    setPropuesta("");
    setShowModal(true);
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

      {showModal && (
        <Modal
          mensaje="Propuesta enviada correctamente!"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
