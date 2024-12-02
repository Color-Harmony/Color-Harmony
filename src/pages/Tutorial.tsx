import React from 'react';

const Tutorial: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tutorial de Armonía de Colores</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Introducción a la Armonía de Colores</h2>
        <p className="mb-4">
          La armonía de colores es el arte de combinar colores de manera agradable y efectiva.
          En este tutorial, aprenderás los conceptos básicos y cómo aplicarlos en tus proyectos.
        </p>
        <h3 className="text-xl font-semibold mb-2">Temas del tutorial:</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Teoría básica del color</li>
          <li>La rueda de colores</li>
          <li>Esquemas de color comunes</li>
          <li>Cómo elegir una paleta de colores</li>
          <li>Aplicación práctica en diseño</li>
        </ul>
        <p>
          Explora cada sección para profundizar tu comprensión de la armonía de colores y
          cómo puedes utilizarla para mejorar tus diseños y proyectos creativos.
        </p>
      </div>
    </div>
  );
};

export default Tutorial;