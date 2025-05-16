import React from "react";
import EnviarPropuesta from "../../components/EnviarPropuesta/EnviarPropuesta.jsx";
import PropuestasActivas from "../../components/PropuestasActivas/PropuestasActivas.jsx";
import { Link } from "react-router-dom";
import styles from "./Propuestas.module.css";

export default function Propuestas() {
  return (
    <div className={styles.propuestasContainer}>
      <h1>Propuestas</h1>

      <section className={styles.section}>
        <h2>Envía tu propuesta para la vivienda</h2>
        <EnviarPropuesta />
      </section>

      <section className={styles.section}>
        <h2>Propuestas activas</h2>
        <PropuestasActivas />
      </section>

      <div className={styles.bottomButton}>
        <Link to="/propuestas-pasadas" className={styles.linkButton}>
          Ver propuestas pasadas
        </Link>
      </div>
    </div>
  );
}
