import { LucideIcon } from 'lucide-react';

export interface ColorCategory {
  name: string;
  colors: string[];
  description: string;
  image?: string;
}

export interface ColorTheme {
  category: string;
  image: string;
  themes: ColorCategory[];
}

export interface ColorSystem {
  title: string;
  description: string;
  icon: LucideIcon;
  premium?: boolean;
  details: string[];
  applications: string[];
  advantages: string[];
  disadvantages: string[];
}