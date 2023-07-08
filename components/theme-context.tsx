import { createContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light'); // Default theme is light

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;

    if (localTheme) { // If a theme is saved in localStorage
      document.body.className = `${localTheme}-theme`;
      setTheme(localTheme);
    } else { // If no theme is saved in localStorage, check the system preference
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme = prefersDark ? 'dark' : 'light';
      document.body.className = `${defaultTheme}-theme`;
      setTheme(defaultTheme);
    }
  }, []);

  const setMode = (mode: Theme) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      setMode('dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      setMode('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
