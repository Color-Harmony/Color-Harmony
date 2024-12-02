import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { X, ExternalLink } from 'lucide-react';

const FLOATING_ADS = [
  {
    title: '¡Mejora tu experiencia!',
    description: 'Obtén una membresía premium para eliminar anuncios y acceder a funciones exclusivas.',
    image: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=200'
  },
  {
    title: '¡Diseña como un pro!',
    description: 'Accede a paletas exclusivas y herramientas avanzadas con nuestra membresía premium.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200'
  },
  {
    title: '¡Potencia tu creatividad!',
    description: 'Descubre todas las posibilidades con nuestra membresía premium.',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=200'
  }
];

const BANNER_ADS = [
  {
    title: 'Herramientas Premium de Diseño',
    description: 'Accede a más de 1000 paletas exclusivas',
    image: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=400',
    cta: 'Obtener Premium'
  },
  {
    title: 'Curso de Teoría del Color',
    description: 'Aprende a dominar la armonía del color',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400',
    cta: 'Comenzar Ahora'
  },
  {
    title: 'Plantillas Profesionales',
    description: 'Más de 500 plantillas de color prediseñadas',
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=400',
    cta: 'Ver Plantillas'
  }
];

export const Advertisement: React.FC = () => {
  const { hasMembership } = useAuth();
  const [isFloatingVisible, setIsFloatingVisible] = useState(true);
  const [currentFloatingIndex, setCurrentFloatingIndex] = useState(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    if (hasMembership) return;

    const rotateAds = setInterval(() => {
      setIsFloatingVisible(true);
      setCurrentFloatingIndex((prevIndex) => (prevIndex + 1) % FLOATING_ADS.length);
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % BANNER_ADS.length);
    }, 4000);

    return () => clearInterval(rotateAds);
  }, [hasMembership]);

  if (hasMembership) return null;

  const currentFloatingAd = FLOATING_ADS[currentFloatingIndex];
  const currentBannerAd = BANNER_ADS[currentBannerIndex];

  return (
    <>
      {/* Floating Advertisement */}
      <div
        className={`fixed bottom-4 right-4 w-64 bg-white rounded-lg shadow-lg p-4 border border-gray-200 transition-opacity duration-300 ${
          isFloatingVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsFloatingVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-center">
          <h3 className="font-bold text-lg mb-2">{currentFloatingAd.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{currentFloatingAd.description}</p>
          <img
            src={currentFloatingAd.image}
            alt="Anuncio"
            className="w-full h-32 object-cover rounded mb-4"
          />
        </div>
      </div>

      {/* Bottom Banner Advertisement */}
      <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={currentBannerAd.image}
                alt="Banner"
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{currentBannerAd.title}</h3>
                <p className="text-white/90">{currentBannerAd.description}</p>
              </div>
            </div>
            <a
              href="/membership"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            >
              {currentBannerAd.cta}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};