import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.description}>
        <h1>LesVivienda</h1>
        <p>
          Proyecto de cohabitación dirigido a mujeres lesbianas y bisexuales con el objetivo de facilitar el acceso justo y seguro a la vivienda. 
          Promovemos un modelo social, solidario y autogestionado.
        </p>
      </section>

      <section className={styles.contactLink}>
        <p>¿Quieres saber más o contactarnos?</p>
        <Link to="/contacto" className={styles.linkButton}>Ir al formulario de contacto</Link>
      </section>
    </div>
  );
};

export default Home;
