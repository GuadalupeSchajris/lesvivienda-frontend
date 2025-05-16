import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.description}>
        <h1>LesVivienda</h1>
        <p>
          <strong>LesVivienda</strong> es una plataforma diseñada para una <strong>vivienda compartida exclusiva para mujeres lesbianas y bisexuales</strong>. 
          Su misión es garantizar un <strong>acceso equitativo, seguro y digno a la vivienda</strong> a través de un <em>modelo social innovador</em> basado en la <strong>solidaridad, autogestión y apoyo mutuo</strong>.
        </p>
        <p>
          La plataforma ofrece un enfoque integral que combina aspectos <strong>informativos, participativos y comunitarios</strong>. Facilita la <strong>comunicación, colaboración y fortalece el sentido de pertenencia</strong> entre sus usuarias.
        </p>
        <p>
          Con esta herramienta digital, buscamos no solo ofrecer <strong>información clara y accesible</strong> sobre el proyecto habitacional, sino también fomentar la <strong>implicación activa de la comunidad</strong> en la gestión y desarrollo del espacio compartido, creando un entorno <strong>inclusivo y empoderador</strong>.
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

