import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Palette, PaintBucket, Pipette } from 'lucide-react';

const ColorSystemIntro = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6">Sistemas de Color</h2>
    <p className="text-lg text-gray-600 mb-8">
      Explora los diferentes sistemas de color y aprende cómo se utilizan en el diseño digital e impreso.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <SystemCard
        title="RGB"
        description="Sistema aditivo usado en pantallas digitales"
        icon={<Palette className="w-8 h-8 text-blue-500" />}
      />
      <SystemCard
        title="RYB"
        description="Sistema sustractivo usado en pintura y arte"
        icon={<PaintBucket className="w-8 h-8 text-yellow-500" />}
      />
      <SystemCard
        title="CMYK"
        description="Sistema usado en impresión profesional"
        icon={<Pipette className="w-8 h-8 text-cyan-500" />}
      />
    </div>
  </div>
);

const SystemCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const RGBSystem = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6">Sistema RGB</h2>
    <p className="text-lg text-gray-600">
      El sistema RGB es fundamental para la visualización de colores en pantallas digitales.
    </p>
  </div>
);

const RYBSystem = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6">Sistema RYB</h2>
    <p className="text-lg text-gray-600">
      El sistema RYB es el modelo tradicional usado en arte y pintura.
    </p>
  </div>
);

const CMYKSystem = () => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-6">Sistema CMYK</h2>
    <p className="text-lg text-gray-600">
      El sistema CMYK es el estándar en impresión profesional.
    </p>
  </div>
);

const ColorNames: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center gradient-text">Sistemas de Color</h1>
      <nav className="mb-8">
        <ul className="flex flex-wrap justify-center gap-4">
          {[
            { path: 'rgb', name: 'RGB', icon: <Palette /> },
            { path: 'ryb', name: 'RYB', icon: <PaintBucket /> },
            { path: 'cmyk', name: 'CMYK', icon: <Pipette /> }
          ].map(({ path, name, icon }) => (
            <li key={path}>
              <Link 
                to={path} 
                className="inline-flex items-center px-6 py-3 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                {React.cloneElement(icon, { className: 'w-5 h-5 mr-2' })}
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        <Route path="rgb" element={<RGBSystem />} />
        <Route path="ryb" element={<RYBSystem />} />
        <Route path="cmyk" element={<CMYKSystem />} />
        <Route path="/" element={<ColorSystemIntro />} />
      </Routes>
    </div>
  );
};

export default ColorNames;