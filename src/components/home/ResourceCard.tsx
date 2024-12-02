import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
    >
      <h3 className="text-xl font-semibold mb-2 flex items-center justify-center">
        {title}
        <ExternalLink className="h-4 w-4 ml-2" />
      </h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </a>
  );
};