import React from 'react';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="transition-opacity duration-300 ease-in-out">
      {children}
    </div>
  );
};