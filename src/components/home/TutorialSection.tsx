import React from 'react';
import { Book, Lightbulb } from 'lucide-react';

export const TutorialSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
        <Book className="h-8 w-8 mr-3 text-blue-500" />
        Guía de Color
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div>
          <h3 className="text-xl font-semibold mb-4">Fundamentos del Color</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Colores primarios, secundarios y terciarios
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Temperatura del color (cálidos y fríos)
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Propiedades: matiz, saturación y brillo
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Psicología del color en el diseño
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Teoría de la armonía del color
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Esquemas de color y combinaciones
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Aplicaciones Prácticas</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Diseño de interfaces de usuario
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Branding y identidad visual
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Diseño web y gráfico
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Fotografía y edición de imagen
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Impresión y medios digitales
            </li>
            <li className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Accesibilidad y contraste
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};