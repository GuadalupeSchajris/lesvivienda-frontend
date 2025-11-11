import React, { useState } from 'react';
import styles from "./adminpanel.module.css";
//import { adminService } from '../services/adminService';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('suggestions');
  const [suggestions, setSuggestions] = useState([]);
  const [surveyForm, setSurveyForm] = useState({
    title: '',
    description: '',
    questions: ['']
  });

  // mensjes sugerencias
  const loadSuggestions = async () => {
    try {
  //    const response = await adminService.getSuggestions();
  //    setSuggestions(response.data);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  // Crear encuesta
  const handleCreateSurvey = async (e) => {
    e.preventDefault();
    try {
      await adminService.createSurvey(surveyForm);
      alert('Encuesta creada exitosamente');
      setSurveyForm({ title: '', description: '', questions: [''] });
    } catch (error) {
      console.error('Error creating survey:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Panel de Administrador</h1>
        
        {/* Navegación */}
        <div className="bg-white shadow rounded-lg mb-6">
          <nav className={styles.nav}>
            <button
              onClick={() => setActiveSection('suggestions')}
              className={`flex-1 py-4 px-6 text-center ${
                activeSection === 'suggestions' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Sugerencias
            </button>
            <button
              onClick={() => setActiveSection('surveys')}
              className={`flex-1 mx-8 py-4 px-6 text-center ${
                activeSection === 'surveys' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Crear Encuestas
            </button>
          </nav>
        </div>

        {/* Contenido */}
        {activeSection === 'suggestions' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Mensajes de Sugerencias</h2>
            <button 
              onClick={loadSuggestions}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
              Cargar Sugerencias
            </button>
            
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="border rounded-lg p-4">
                  <p className="text-gray-800">{suggestion.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    De: {suggestion.userEmail} - {new Date(suggestion.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'surveys' && (
          <div className={styles.text}>
            <h2 className="text-xl font-semibold mb-4.">Crear Nueva Encuesta</h2>
            <form className={styles.form} onSubmit={handleCreateSurvey}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Título:</label>
                <input
                  type="text"
                  value={surveyForm.title}
                  onChange={(e) => setSurveyForm({...surveyForm, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Descripción:</label>
                <textarea
                  value={surveyForm.description}
                  onChange={(e) => setSurveyForm({...surveyForm, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Preguntas:</label>
                {surveyForm.questions.map((question, index) => (
                  <input
                    key={index}
                    type="text"
                    value={question}
                    onChange={(e) => {
                      const newQuestions = [...surveyForm.questions];
                      newQuestions[index] = e.target.value;
                      setSurveyForm({...surveyForm, questions: newQuestions});
                    }}
                    className="w-full px-3 py-2 border rounded-lg mb-2"
                    placeholder={`Pregunta ${index + 1}`}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setSurveyForm({
                    ...surveyForm, 
                    questions: [...surveyForm.questions, '']
                  })}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Agregar Pregunta
                </button>
              </div>
              
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg"
              >
                Crear Encuesta
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;