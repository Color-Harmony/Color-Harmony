import React, { useState } from 'react';
import { Palette, Download, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDownloadStore } from '../../stores/downloadStore';
import { downloadColors } from '../../utils/downloadUtils';

interface ColorHarmony {
  name: string;
  colors: string[];
}

export const PaletteGenerator: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#3498db');
  const [harmonyType, setHarmonyType] = useState<string>('complementary');
  const { hasMembership } = useAuth();
  const { canDownload, recordDownload } = useDownloadStore();

  const calculateHarmony = (color: string, type: string): ColorHarmony => {
    const hex2hsv = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      
      let h = 0;
      if (d !== 0) {
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
          case g: h = ((b - r) / d + 2) * 60; break;
          case b: h = ((r - g) / d + 4) * 60; break;
        }
      }
      
      const s = max === 0 ? 0 : d / max;
      const v = max;
      
      return { h, s, v };
    };

    const hsv2hex = (h: number, s: number, v: number): string => {
      h = ((h % 360) + 360) % 360;
      
      const f = (n: number) => {
        const k = (n + h / 60) % 6;
        return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
      };
      
      const r = Math.round(f(5) * 255);
      const g = Math.round(f(3) * 255);
      const b = Math.round(f(1) * 255);
      
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    const { h, s, v } = hex2hsv(color);
    let colors: string[] = [color];
    
    switch (type) {
      case 'complementary':
        colors.push(hsv2hex((h + 180) % 360, s, v));
        break;
      case 'triadic':
        colors.push(hsv2hex((h + 120) % 360, s, v));
        colors.push(hsv2hex((h + 240) % 360, s, v));
        break;
      case 'tetradic':
        colors.push(hsv2hex((h + 90) % 360, s, v));
        colors.push(hsv2hex((h + 180) % 360, s, v));
        colors.push(hsv2hex((h + 270) % 360, s, v));
        break;
      case 'analogous':
        colors.push(hsv2hex((h + 30) % 360, s, v));
        colors.push(hsv2hex((h - 30 + 360) % 360, s, v));
        break;
      case 'split-complementary':
        colors.push(hsv2hex((h + 150) % 360, s, v));
        colors.push(hsv2hex((h + 210) % 360, s, v));
        break;
    }

    return {
      name: type.charAt(0).toUpperCase() + type.slice(1),
      colors
    };
  };

  const harmony = calculateHarmony(baseColor, harmonyType);

  const handleDownload = () => {
    if (!hasMembership && !canDownload()) {
      alert('Has alcanzado el límite de descargas. Por favor, espera 3 minutos o actualiza a la membresía premium.');
      return;
    }

    if (harmony.colors.length > 0) {
      downloadColors(harmony.colors, `${harmony.name}-palette`);
      if (!hasMembership) {
        recordDownload();
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <Palette className="h-8 w-8 text-blue-500 mr-2" />
        <h3 className="text-xl font-semibold">Generador de Paletas</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Base
          </label>
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-full h-12 rounded cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Armonía
          </label>
          <select
            value={harmonyType}
            onChange={(e) => setHarmonyType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="complementary">Complementario</option>
            <option value="triadic">Triádico</option>
            <option value="tetradic">Tetrádico</option>
            <option value="analogous">Análogo</option>
            <option value="split-complementary">Complementario Dividido</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">{harmony.name}</h4>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {harmony.colors.map((color, index) => (
            <div key={index} className="text-center">
              <div
                className="w-full h-16 rounded-lg mb-1"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600">{color.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full mt-4"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar Paleta
          {!hasMembership && <Lock className="w-4 h-4 ml-2" />}
        </button>
      </div>
    </div>
  );
};