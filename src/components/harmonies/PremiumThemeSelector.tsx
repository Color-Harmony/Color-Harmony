import React from 'react';
import { Image } from 'lucide-react';
import { ColorCategory, ColorTheme } from '../../types/color';

interface PremiumThemeSelectorProps {
  selectedCategory: string;
  selectedTheme: ColorCategory | null;
  premiumThemes: ColorTheme[];
  onCategoryChange: (category: string) => void;
  onThemeChange: (theme: ColorCategory | null) => void;
}

export const PremiumThemeSelector: React.FC<PremiumThemeSelectorProps> = ({
  selectedCategory,
  selectedTheme,
  premiumThemes,
  onCategoryChange,
  onThemeChange,
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumThemes.map((theme) => (
          <button
            key={theme.category}
            onClick={() => onCategoryChange(theme.category)}
            className={`relative overflow-hidden rounded-lg transition-all ${
              selectedCategory === theme.category ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <img
              src={theme.image}
              alt={theme.category}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-xl font-bold text-center px-4">
                {theme.category}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select
              value={selectedTheme?.name || ""}
              onChange={(e) => {
                const theme = premiumThemes
                  .find(t => t.category === selectedCategory)
                  ?.themes.find(th => th.name === e.target.value);
                onThemeChange(theme || null);
              }}
              className="p-3 border rounded-md bg-white shadow-sm"
            >
              <option value="">Selecciona un tema</option>
              {premiumThemes
                .find(t => t.category === selectedCategory)
                ?.themes.map(theme => (
                  <option key={theme.name} value={theme.name}>
                    {theme.name}
                  </option>
                ))}
            </select>
          </div>

          {selectedTheme && (
            <div className="mt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedTheme.image}
                    alt={selectedTheme.name}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">{selectedTheme.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedTheme.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {selectedTheme.colors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-20 h-20 rounded-lg shadow-md mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm text-gray-600">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};