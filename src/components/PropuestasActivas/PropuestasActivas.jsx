import React, { useState } from "react";
import styles from "./PropuestasActivas.module.css";
import Modal from "../Modal/Modal";

const propuestasMock = [
  {
    id: 1,
    pregunta: "¿Dónde prefieres que esté localizada?",
    opciones: ["Barcelona ciudad", "Barcelona alrededores", "Girona", "Tarragona", "Lleida"],
    fechaLimite: "2029-05-30",
  },
  {
    id: 2,
    pregunta: "¿Adiquimos vivienda ya construida o terreno?",
    opciones: ["Vivienda a entrar", "Vivienda a reformar", "Terreno"],
    fechaLimite: "2027-05-20",
  },
];

export default function PropuestasActivas() {
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const [seleccionActual, setSeleccionActual] = useState({});
  const [votaciones, setVotaciones] = useState({});

  const [modalMensaje, setModalMensaje] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const propuestasPaginadas = propuestasMock.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  const handleSelect = (id, opcionIndex) => {
    setSeleccionActual((prev) => ({ ...prev, [id]: opcionIndex }));
  };

  const mostrarModal = (mensaje) => {
    setModalMensaje(mensaje);
    setModalVisible(true);
  };

  const cerrarModal = () => setModalVisible(false);

  const handleSubmit = (id, e) => {
    e.preventDefault();
    if (seleccionActual[id] !== undefined) {
      setVotaciones((prev) => ({ ...prev, [id]: seleccionActual[id] }));
      mostrarModal("Voto enviado con éxito");
    } else {
      mostrarModal("Por favor selecciona una opción antes de enviar");
    }
  };

  return (
    <>
      <div className={styles.lista}>
        {propuestasPaginadas.map((propuesta) => (
          <div key={propuesta.id} className={styles.card}>
            <p className={styles.pregunta}>{propuesta.pregunta}</p>

            {votaciones[propuesta.id] == null ? (
              <form onSubmit={(e) => handleSubmit(propuesta.id, e)}>
                {propuesta.opciones.map((opcion, index) => (
                  <label key={index} className={styles.label}>
                    <input
                      type="radio"
                      name={`voto-${propuesta.id}`}
                      checked={seleccionActual[propuesta.id] === index}
                      onChange={() => handleSelect(propuesta.id, index)}
                      className={styles.radio}
                    />
                    <span className={styles.customRadio}></span>
                    {opcion}
                  </label>
                ))}
                <button type="submit" className={styles.submitButton}>
                  Enviar
                </button>
              </form>
            ) : (
              <div className={styles.resultado}>
                <p>Gracias por votar. Resultado parcial:</p>
                {propuesta.opciones.map((opcion, index) => (
                  <p key={index}>
                    {opcion} {index === votaciones[propuesta.id] && "✅"}
                  </p>
                ))}
              </div>
            )}

            <p className={styles.fecha}>
              Límite: {new Date(propuesta.fechaLimite).toLocaleDateString()}
            </p>
          </div>
        ))}

        <div className={styles.paginacion}>
          {pagina > 1 && (
            <button onClick={() => setPagina(pagina - 1)}>Anterior</button>
          )}
          {propuestasMock.length > pagina * porPagina && (
            <button onClick={() => setPagina(pagina + 1)}>Siguiente</button>
          )}
        </div>
      </div>

      {modalVisible && <Modal mensaje={modalMensaje} onClose={cerrarModal} />}
    </>
  );
}
