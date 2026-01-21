import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme =
  | 'light'
  | 'dark'
  | 'gruvbox-light'
  | 'gruvbox-dark'
  | 'everforest-light'
  | 'everforest-dark'
  | 'tokyo-night'
  | 'tokyo-storm'
  | 'tokyo-moon'
  | 'molokai-light'
  | 'molokai-dark'
  | 'catppuccin-latte'
  | 'catppuccin-frappe'
  | 'catppuccin-macchiato'
  | 'catppuccin-mocha';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove(
      'light', 'dark',
      'gruvbox-light', 'gruvbox-dark',
      'everforest-light', 'everforest-dark',
      'tokyo-night', 'tokyo-storm', 'tokyo-moon',
      'molokai-light', 'molokai-dark',
      'catppuccin-latte', 'catppuccin-frappe',
      'catppuccin-macchiato', 'catppuccin-mocha'
    );

    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);

    const existingFavicons = document.querySelectorAll('link[rel="icon"]');
    existingFavicons.forEach(favicon => favicon.remove());

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/x-icon';

    const isDarkTheme = theme.includes('dark');
    favicon.href = isDarkTheme ? '/favicon_dark.ico' : '/favicon_light.ico';

    document.head.appendChild(favicon);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};