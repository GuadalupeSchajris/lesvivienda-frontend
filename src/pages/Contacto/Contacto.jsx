import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';



export default function Contacto() {
  return (
    <main style={{ padding: '2rem', minHeight: '80vh'}}>
      <h1 style={{ color: 'rgb(0, 0, 0)', textAlign: 'center', marginBottom: '1.5rem' }}>
        Contáctanos
      </h1>
      <ContactForm />
    </main>
  );
}
