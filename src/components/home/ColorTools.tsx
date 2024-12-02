import React from 'react';
import { Settings, Sliders, Droplet, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ColorTools: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
      <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
        <Settings className="h-8 w-8 mr-3 text-blue-500" />
        Herramientas de Color
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/palettes" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Sliders className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Selector Avanzado</h3>
          <p className="text-gray-600">
            Herramienta precisa para seleccionar y ajustar colores con valores RGB, HSL y más.
          </p>
        </Link>
        <Link to="/palettes" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Droplet className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Extractor de Color</h3>
          <p className="text-gray-600">
            Extrae colores de imágenes para crear paletas personalizadas.
          </p>
        </Link>
        <Link to="/palettes" className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Palette className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Generador de Paletas</h3>
          <p className="text-gray-600">
            Crea combinaciones armoniosas basadas en teoría del color.
          </p>
        </Link>
      </div>
    </div>
  );
};