import React from 'react';
import { Palette, Droplet, Layers, Book } from 'lucide-react';
import { FeatureCard } from '../components/home/FeatureCard';
import { ResourceCard } from '../components/home/ResourceCard';
import { TutorialSection } from '../components/home/TutorialSection';
import { ColorTools } from '../components/home/ColorTools';

const resources = [
  {
    title: "Adobe Color",
    description: "Crea esquemas de color y explora combinaciones creadas por la comunidad.",
    url: "https://color.adobe.com/"
  },
  {
    title: "Coolors",
    description: "Generador de paletas de colores y herramientas para diseñadores.",
    url: "https://coolors.co/"
  },
  {
    title: "Color Hunt",
    description: "Plataforma para descubrir y compartir paletas de colores.",
    url: "https://colorhunt.co/"
  }
];

const features = [
  {
    icon: Palette,
    title: "Armonías de Color",
    description: "Explora diferentes sistemas de color y crea combinaciones armoniosas.",
    link: "/harmonies"
  },
  {
    icon: Droplet,
    title: "Paletas Personalizadas",
    description: "Genera y guarda paletas de color profesionales para tus proyectos.",
    link: "/palettes"
  },
  {
    icon: Layers,
    title: "Teoría del Color",
    description: "Aprende los fundamentos y aplícalos en tus diseños.",
    link: "/harmonies"
  }
];

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 gradient-text">Color Harmony</h1>
        <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
          Explora el fascinante mundo de los colores y domina el arte de crear combinaciones 
          armoniosas. Descubre herramientas profesionales y recursos para elevar tus diseños.
        </p>
      </div>

      {/* Introducción a la Teoría del Color */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <Book className="h-8 w-8 mr-3 text-blue-500" />
          El Fascinante Mundo del Color
        </h2>
        <div className="prose max-w-none text-gray-600">
          <p className="mb-4">
            La teoría del color es mucho más que simplemente elegir colores que se vean bien juntos. 
            Es una ciencia y un arte que ha fascinado a artistas, diseñadores y científicos durante siglos. 
            Comprender el color nos permite crear experiencias visuales más ricas y significativas.
          </p>
          <p className="mb-4">
            El color influye en nuestras emociones, percepciones y comportamientos de maneras profundas 
            y a menudo subconscientes. Desde el rojo energético hasta el azul tranquilo, cada color tiene 
            el poder de evocar respuestas específicas en quienes lo observan.
          </p>
          <p className="mb-8">
            En el diseño moderno, la teoría del color es fundamental para crear interfaces efectivas, 
            marcas memorables y experiencias de usuario coherentes. Ya sea que estés diseñando para web, 
            impresión o espacios físicos, el conocimiento del color es una herramienta invaluable.
          </p>
        </div>
      </div>

      {/* Características Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      {/* Tutorial y Fundamentos */}
      <TutorialSection />

      {/* Herramientas de Color */}
      <ColorTools />

      {/* Recursos Externos */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Recursos Recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-lg mb-12">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-lg mb-6">
          Descubre todas las herramientas y recursos que tenemos para ti.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
          Explorar Ahora
        </button>
      </div>
    </div>
  );
};

export default Home;