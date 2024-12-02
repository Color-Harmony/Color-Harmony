import React, { useState, useRef } from 'react';
import { Droplet, Upload, Download, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDownloadStore } from '../../stores/downloadStore';
import { downloadColors } from '../../utils/downloadUtils';

interface ExtractedColor {
  color: string;
  percentage: number;
}

export const ColorExtractor: React.FC = () => {
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hasMembership } = useAuth();
  const { canDownload, recordDownload } = useDownloadStore();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setPreviewImage(e.target?.result as string);
        extractColors(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const extractColors = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image to canvas
    ctx.drawImage(img, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Create color map
    const colorMap = new Map<string, number>();
    const totalPixels = pixels.length / 4;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    // Sort colors by frequency and get top 5
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color, count]) => ({
        color,
        percentage: Math.round((count / totalPixels) * 100)
      }));

    setExtractedColors(sortedColors);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDownload = () => {
    if (!hasMembership && !canDownload()) {
      alert('Has alcanzado el límite de descargas. Por favor, espera 3 minutos o actualiza a la membresía premium.');
      return;
    }

    if (extractedColors.length > 0) {
      const colors = extractedColors.map(color => color.color);
      downloadColors(colors, 'extracted-colors');
      if (!hasMembership) {
        recordDownload();
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <Droplet className="h-8 w-8 text-blue-500 mr-2" />
        <h3 className="text-xl font-semibold">Extractor de Color</h3>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <div className="space-y-4">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Cambiar Imagen
            </label>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Arrastra y suelta una imagen aquí o
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Seleccionar Archivo
            </label>
          </>
        )}
      </div>

      {extractedColors.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3">Colores Extraídos</h4>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {extractedColors.map((color, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-full h-16 rounded-lg mb-1"
                  style={{ backgroundColor: color.color }}
                />
                <span className="text-xs text-gray-600">
                  {color.color.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 block">
                  {color.percentage}%
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full mt-4"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar Colores
            {!hasMembership && <Lock className="w-4 h-4 ml-2" />}
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};