import React, { useState } from "react";
import styles from "./EnviarPropuesta.module.css";

export default function EnviarPropuesta() {
  const [nombre, setNombre] = useState("");
  const [propuesta, setPropuesta] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalNombre = nombre.trim() || "Anónima";


    console.log("Enviado a admin:", {
      nombre: finalNombre,
      propuesta,
    });

    setNombre("");
    setPropuesta("");
    alert("Propuesta enviada correctamente");
  };

  return (
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
  );
}
