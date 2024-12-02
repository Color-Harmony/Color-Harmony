import React, { useState, useRef, useEffect } from 'react';
import { Info, Palette, Droplet } from 'lucide-react';

const ColorTable: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#3498db');
  const [hue, setHue] = useState(210); // Valor inicial para azul
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);

  // Convertir HEX a RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Convertir RGB a HSL
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

  // Convertir RGB a CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    c = Math.round(((c - k) / (1 - k)) * 100) || 0;
    m = Math.round(((m - k) / (1 - k)) * 100) || 0;
    y = Math.round(((y - k) / (1 - k)) * 100) || 0;
    k = Math.round(k * 100);

    return { c, m, y, k };
  };

  // Dibujar la tabla de colores
  const drawColorTable = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Crear gradiente de saturación y luminosidad
    for (let y = 0; y < height; y++) {
      const saturation = y / height;
      for (let x = 0; x < width; x++) {
        const lightness = 1 - (x / width);
        ctx.fillStyle = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  // Dibujar la barra de matiz
  const drawHueBar = () => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Crear gradiente de matiz
    for (let y = 0; y < height; y++) {
      const hue = (y / height) * 360;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(0, y, width, 1);
    }
  };

  // Manejar clic en la tabla de colores
  const handleTableClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const saturation = (y / canvas.height) * 100;
    const lightness = 100 - (x / canvas.width) * 100;
    
    setSelectedColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  };

  // Manejar clic en la barra de matiz
  const handleHueClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = hueCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newHue = (y / canvas.height) * 360;
    
    setHue(newHue);
  };

  // Efectos para dibujar los canvas
  useEffect(() => {
    drawColorTable();
    drawHueBar();
  }, [hue]);

  const rgb = hexToRgb(selectedColor);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Tabla de Colores</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explora y analiza colores en diferentes formatos. Nuestra tabla de colores te permite
          seleccionar cualquier color y ver sus valores en RGB, HSL, CMYK y más.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-500" />
            ¿Por qué son importantes los sistemas de color?
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>• RGB: Ideal para pantallas y diseño digital</li>
            <li>• CMYK: Estándar en impresión profesional</li>
            <li>• HSL: Intuitivo para ajustes de diseño</li>
            <li>• HEX: Formato web universal</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-blue-500" />
            Usos Comunes
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>• Diseño web y desarrollo frontend</li>
            <li>• Diseño gráfico y branding</li>
            <li>• Impresión y materiales físicos</li>
            <li>• Consistencia en diferentes medios</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Tabla de colores principal */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Selector de Color</h3>
            <div className="flex space-x-4">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="border rounded cursor-crosshair"
                onClick={handleTableClick}
              />
              <canvas
                ref={hueCanvasRef}
                width={30}
                height={300}
                className="border rounded cursor-pointer"
                onClick={handleHueClick}
              />
            </div>
          </div>

          {/* Información del color seleccionado */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">Color Seleccionado</h3>
            <div className="space-y-4">
              <div className="h-24 rounded-lg shadow-inner" style={{ backgroundColor: selectedColor }} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">HEX</label>
                  <input
                    type="text"
                    value={selectedColor.toUpperCase()}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">RGB</label>
                  <input
                    type="text"
                    value={rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : 'N/A'}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">HSL</label>
                  <input
                    type="text"
                    value={hsl ? `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` : 'N/A'}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CMYK</label>
                  <input
                    type="text"
                    value={cmyk ? `${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%` : 'N/A'}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Droplet className="w-5 h-5 mr-2 text-blue-500" />
          Consejos para la Selección de Colores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-semibold mb-2">Para Diseño Digital:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Usa RGB para mayor precisión en pantalla</li>
              <li>Considera el contraste para la accesibilidad</li>
              <li>Mantén consistencia con los valores hexadecimales</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Para Impresión:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Utiliza CMYK para resultados precisos</li>
              <li>Verifica la saturación del color</li>
              <li>Considera el tipo de papel y acabado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorTable;