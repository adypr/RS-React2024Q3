import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeContextType } from '../models/data.interface';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme =
      typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
