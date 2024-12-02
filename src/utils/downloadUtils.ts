export const downloadColors = (colors: string[], filename: string) => {
  // Create text content with color information
  const content = colors.map(color => {
    const rgb = hexToRGB(color);
    return `Color: ${color}\nRGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\n`;
  }).join('\n');
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};