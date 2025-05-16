import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ mensaje, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} 
      >
        <p>{mensaje}</p>
        <button onClick={onClose} className={styles.closeBtn}>
          Cerrar
        </button>
      </div>
    </div>
  );
}