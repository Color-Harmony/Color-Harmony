import React, { useState } from 'react';
import { Download, Palette, Info, Droplet, Sun, Moon, Crown, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ColorPicker } from '../components/tools/ColorPicker';
import { ColorExtractor } from '../components/tools/ColorExtractor';
import { PaletteGenerator } from '../components/tools/PaletteGenerator';
import { PremiumThemeSelector } from '../components/harmonies/PremiumThemeSelector';
import { premiumThemes } from '../data/premiumThemes';
import { useAuth } from '../contexts/AuthContext';
import { ColorCategory } from '../types/color';

const Palettes: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#3498db');
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<ColorCategory | null>(null);
  const { hasMembership } = useAuth();

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Herramientas de Color</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explora nuestras herramientas profesionales para trabajar con colores.
          Desde selección precisa hasta extracción y generación de paletas.
        </p>
      </div>

      {/* Color Tools */}
      <div className="space-y-12 mb-12">
        <ColorPicker onColorChange={handleColorChange} />
        <ColorExtractor />
        <PaletteGenerator />
      </div>

      {/* Premium Theme Categories */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-6">Categorías de Color</h2>
        
        {hasMembership ? (
          <PremiumThemeSelector
            selectedCategory={selectedCategory}
            selectedTheme={selectedTheme}
            premiumThemes={premiumThemes}
            onCategoryChange={setSelectedCategory}
            onThemeChange={setSelectedTheme}
          />
        ) : (
          <div className="text-center py-12">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Contenido Premium</h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Para acceder a nuestra exclusiva colección de categorías de color y paletas premium, 
              únete a nuestra comunidad de miembros premium y desbloquea todas las funcionalidades.
            </p>
            <Link
              to="/membership"
              className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Crown className="w-5 h-5 mr-2" />
              Obtener Membresía Premium
            </Link>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Info className="w-6 h-6 mr-2 text-blue-500" />
          Consejos para Usar las Herramientas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Selector Avanzado</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Usa el selector de color para elegir colores con precisión</li>
              <li>• Ajusta los valores RGB para control fino</li>
              <li>• Observa los valores HSL para entender mejor el color</li>
              <li>• Copia el código hexadecimal para usar en tu diseño</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Extractor y Generador</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Sube imágenes para extraer paletas de color</li>
              <li>• Usa el generador para crear combinaciones armoniosas</li>
              <li>• Experimenta con diferentes tipos de armonías</li>
              <li>• Guarda tus paletas favoritas para usar más tarde</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palettes;