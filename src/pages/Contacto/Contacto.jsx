import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';


export default function Contacto() {
  return (
    <main style={{ padding: '2rem', minHeight: '80vh'}}>
      <h1 style={{ color: '#F7748D', textAlign: 'center', marginBottom: '1.5rem' }}>
        Contáctanos
      </h1>
      <ContactForm />
    </main>
  );
}
