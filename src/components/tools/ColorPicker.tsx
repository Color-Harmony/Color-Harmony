import React, { useState } from 'react';
import { Sliders } from 'lucide-react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [color, setColor] = useState('#3498db');
  const [rgb, setRgb] = useState({ r: 52, g: 152, b: 219 });
  const [hsl, setHsl] = useState({ h: 204, s: 70, l: 53 });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor);
    
    const rgbValues = hexToRgb(newColor);
    if (rgbValues) {
      setRgb(rgbValues);
      setHsl(rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b));
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newRgb = { ...rgb, [channel]: value };
    setRgb(newRgb);
    const newColor = `#${newRgb.r.toString(16).padStart(2, '0')}${newRgb.g.toString(16).padStart(2, '0')}${newRgb.b.toString(16).padStart(2, '0')}`;
    setColor(newColor);
    onColorChange(newColor);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <Sliders className="h-8 w-8 text-blue-500 mr-2" />
        <h3 className="text-xl font-semibold">Selector Avanzado de Color</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-12 rounded cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor Hexadecimal
            </label>
            <input
              type="text"
              value={color.toUpperCase()}
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
            />
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RGB
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">R</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">G</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">B</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                    className="w-full p-1 border rounded"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HSL
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">H</label>
                  <input
                    type="text"
                    value={`${hsl.h}°`}
                    readOnly
                    className="w-full p-1 border rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">S</label>
                  <input
                    type="text"
                    value={`${hsl.s}%`}
                    readOnly
                    className="w-full p-1 border rounded bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">L</label>
                  <input
                    type="text"
                    value={`${hsl.l}%`}
                    readOnly
                    className="w-full p-1 border rounded bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};