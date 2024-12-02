import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ColorSystem } from '../components/harmonies/ColorSystem';
import { colorSystems } from '../data/colorSystems';

const Harmonies: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<'rgb' | 'ryb' | 'cmyk' | null>(null);
  const { hasMembership } = useAuth();

  const handleSystemClick = (key: 'rgb' | 'ryb' | 'cmyk') => {
    setSelectedSystem(selectedSystem === key ? null : key);
  };

  const renderSystemContent = (systemKey: 'rgb' | 'ryb' | 'cmyk') => {
    const system = colorSystems[systemKey];

    if (system.premium && !hasMembership && systemKey !== 'ryb') {
      return (
        <div className="text-center p-8 bg-white rounded-lg shadow-md mt-4">
          <h3 className="text-xl font-bold mb-4">Contenido Premium</h3>
          <p className="text-gray-600 mb-6">
            Accede a paletas exclusivas y herramientas avanzadas con nuestra membresía premium.
          </p>
          <Link
            to="/membership"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Obtener Membresía Premium
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-xl font-bold mb-4">Características del Sistema {system.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Características Principales</h4>
            <ul className="space-y-2">
              {system.details.map((detail, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Aplicaciones</h4>
            <ul className="space-y-2">
              {system.applications.map((app, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-700">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Ventajas y Desventajas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-green-600 font-medium mb-2">Ventajas</h5>
              <ul className="space-y-2">
                {system.advantages.map((adv, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-red-600 font-medium mb-2">Desventajas</h5>
              <ul className="space-y-2">
                {system.disadvantages.map((dis, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-gray-700">{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Sistemas de Color</h2>
        <div className="space-y-8">
          {['rgb', 'ryb', 'cmyk'].map((key) => (
            <div key={key} className="space-y-4">
              <button
                onClick={() => handleSystemClick(key as 'rgb' | 'ryb' | 'cmyk')}
                className="w-full"
              >
                <ColorSystem {...colorSystems[key as 'rgb' | 'ryb' | 'cmyk']} />
              </button>
              {selectedSystem === key && renderSystemContent(key as 'rgb' | 'ryb' | 'cmyk')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Harmonies;