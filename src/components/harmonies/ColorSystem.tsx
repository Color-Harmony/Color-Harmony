import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ColorSystemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  premium?: boolean;
}

export const ColorSystem: React.FC<ColorSystemProps> = ({ title, description, icon: Icon, details, premium }) => {
  return (
    <div className="p-6 rounded-lg transition-all bg-white border-2 border-transparent hover:border-blue-500">
      <div className="flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 text-center">{description}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((detail, index) => (
          <li key={index} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600">{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};