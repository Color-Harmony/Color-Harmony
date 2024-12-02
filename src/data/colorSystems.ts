import { Palette, PaintBucket, Pipette } from 'lucide-react';
import { ColorSystem } from '../types/color';

export const colorSystems: Record<string, ColorSystem> = {
  rgb: {
    title: 'Sistema RGB',
    description: 'Sistema aditivo usado en pantallas digitales. Combina Rojo, Verde y Azul.',
    icon: Palette,
    details: [
      "Basado en la mezcla de luz",
      "Cada color se forma combinando Rojo, Verde y Azul",
      "Valores de 0 a 255 para cada canal",
      "Usado en monitores, TV y dispositivos móviles",
      "Permite crear 16.7 millones de colores",
      "Ideal para diseño digital y web"
    ],
    applications: [
      "Diseño web y desarrollo frontend",
      "Interfaces de usuario digitales",
      "Gráficos para redes sociales",
      "Presentaciones digitales",
      "Videojuegos y animaciones",
      "Aplicaciones móviles"
    ],
    advantages: [
      "Amplia gama de colores disponibles",
      "Estándar en dispositivos digitales",
      "Precisión en la reproducción de color",
      "Fácil de entender y usar",
      "Compatible con todos los navegadores"
    ],
    disadvantages: [
      "Limitado a medios digitales",
      "No aplicable directamente a impresión",
      "Puede variar entre dispositivos",
      "Requiere calibración de pantalla",
      "Consumo de energía en dispositivos"
    ]
  },
  ryb: {
    title: 'Sistema RYB',
    description: 'Sistema sustractivo usado en pintura y arte. Utiliza Rojo, Amarillo y Azul.',
    icon: PaintBucket,
    premium: true,
    details: [
      "Sistema tradicional de pintura",
      "Colores primarios: Rojo, Amarillo y Azul",
      "Base para la teoría del color artística",
      "Usado en bellas artes y educación artística",
      "Permite mezclas naturales y orgánicas",
      "Ideal para pintura y medios tradicionales"
    ],
    applications: [
      "Pintura artística tradicional",
      "Ilustración manual",
      "Educación artística",
      "Diseño de moda",
      "Decoración de interiores",
      "Artesanía y manualidades"
    ],
    advantages: [
      "Resultados naturales y orgánicos",
      "Ideal para mezclas manuales",
      "Facilita el aprendizaje artístico",
      "Mayor control en técnicas tradicionales",
      "Permite experimentación creativa"
    ],
    disadvantages: [
      "Limitado a medios físicos",
      "Difícil reproducción exacta",
      "Requiere experiencia práctica",
      "Proceso más lento",
      "Materiales más costosos"
    ]
  },
  cmyk: {
    title: 'Sistema CMYK',
    description: 'Sistema usado en impresión profesional. Combina Cian, Magenta, Amarillo y Negro.',
    icon: Pipette,
    details: [
      "Sistema de impresión profesional",
      "Basado en la sustracción de luz",
      "Usa tintas Cian, Magenta, Amarillo y Negro",
      "Valores en porcentajes de 0 a 100",
      "Estándar en la industria gráfica",
      "Garantiza reproducción precisa en papel"
    ],
    applications: [
      "Impresión profesional",
      "Publicaciones impresas",
      "Packaging y etiquetas",
      "Material publicitario",
      "Tarjetas de presentación",
      "Catálogos y revistas"
    ],
    advantages: [
      "Ideal para impresión profesional",
      "Colores consistentes en papel",
      "Estándar de la industria",
      "Gran variedad de sustratos",
      "Control preciso de color"
    ],
    disadvantages: [
      "Gama de colores más limitada que RGB",
      "Mayor costo de producción",
      "Requiere calibración específica",
      "Proceso más complejo",
      "Limitado a medios impresos"
    ]
  }
};