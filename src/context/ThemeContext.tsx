import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeContextType } from '../models/data.interface';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme =
        typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
      setTheme((savedTheme as Theme) || 'light');
    }
  }, []);

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (theme === null) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
