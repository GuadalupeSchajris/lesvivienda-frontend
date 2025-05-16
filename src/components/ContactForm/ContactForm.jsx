import React, { useState } from 'react';
import styles from './ContactForm.module.css';

function Modal({ message, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
      </div>
    </div>
  );
}

const nombreRegex = /^[a-zA-ZñÑçÇáéíóúÁÉÍÓÚ`´ª\s]*$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    asunto: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'mensaje') {
      const filteredValue = value.replace(/[<>\/]/g, '');
      setFormData(prev => ({ ...prev, [name]: filteredValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === 'nombre') {
      if (!nombreRegex.test(value)) {
        setErrors(prev => ({ ...prev, nombre: 'Solo letras y caracteres permitidos' }));
      } else {
        setErrors(prev => ({ ...prev, nombre: '' }));
      }
    }

    if (name === 'email') {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!emailValid) {
        setErrors(prev => ({ ...prev, email: 'Email no válido' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (name === 'asunto') {
      if (value.length > 25) {
        setErrors(prev => ({ ...prev, asunto: 'Máximo 25 caracteres' }));
      } else {
        setErrors(prev => ({ ...prev, asunto: '' }));
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.asunto) {
      setModalMessage('Por favor completa todos los campos requeridos.');
      setShowModal(true);
      return;
    }

    if (errors.nombre || errors.email || errors.asunto) {
      setModalMessage('Por favor corrige los errores antes de enviar.');
      setShowModal(true);
      return;
    }

    setModalMessage('Formulario enviado correctamente!');
    setShowModal(true);
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="¿Cómo te llamas?"
          value={formData.nombre}
          onChange={handleChange}
          required
          className={errors.nombre ? styles.errorInput : ''}
          autoComplete="off"
        />
        {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className={errors.email ? styles.errorInput : ''}
          autoComplete="off"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}

        <label htmlFor="asunto">Asunto</label>
        <input
          type="text"
          id="asunto"
          name="asunto"
          placeholder="¿De qué hablamos?"
          maxLength="25"
          value={formData.asunto}
          onChange={handleChange}
          required
          className={errors.asunto ? styles.errorInput : ''}
        />
        {errors.asunto && <span className={styles.error}>{errors.asunto}</span>}

        <label htmlFor="mensaje">¿Podemos ayudarte? Cuéntanos un poco más...</label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="¿Podemos ayudarte? Cuéntanos un poco más..."
          value={formData.mensaje}
          onChange={handleChange}
          rows="5"
        />

        <button type="submit" className={styles.submitButton}>Enviar</button>
      </form>

      {showModal && (
        <Modal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
