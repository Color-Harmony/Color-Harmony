import React from 'react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`transition-all duration-500 ease-out hover:scale-105 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  );
};