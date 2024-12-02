import React from 'react';

const Resources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recursos de Color</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Herramientas y Referencias Útiles</h2>
        <ul className="space-y-4">
          <ResourceItem
            title="Adobe Color"
            description="Crea esquemas de color y explora combinaciones creadas por la comunidad."
            url="https://color.adobe.com/"
          />
          <ResourceItem
            title="Coolors"
            description="Generador de paletas de colores y herramientas para diseñadores."
            url="https://coolors.co/"
          />
          <ResourceItem
            title="Color Hunt"
            description="Plataforma para descubrir y compartir paletas de colores."
            url="https://colorhunt.co/"
          />
          <ResourceItem
            title="Paletton"
            description="Herramienta avanzada para crear esquemas de color armoniosos."
            url="https://paletton.com/"
          />
          <ResourceItem
            title="ColorZilla"
            description="Extensión de navegador para capturar colores de cualquier página web."
            url="https://www.colorzilla.com/"
          />
        </ul>
      </div>
    </div>
  );
};

const ResourceItem: React.FC<{ title: string; description: string; url: string }> = ({ title, description, url }) => {
  return (
    <li>
      <h3 className="text-xl font-semibold mb-1">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          {title}
        </a>
      </h3>
      <p className="text-gray-600">{description}</p>
    </li>
  );
};

export default Resources;