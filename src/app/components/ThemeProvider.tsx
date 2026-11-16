import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GlobalStyles, magma, ThemeContext as MagmaThemeContext } from 'react-magma-dom';

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    border: string;
    background: string;
    surface: string;
  };
}

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Single neutral theme
const neutralTheme: Theme = {
  id: 'neutral',
  name: 'Neutral',
  colors: {
    primary: '#666666',
    secondary: '#999999',
    accent: '#888888',
    text: '#333333',
    textLight: '#666666',
    border: '#d0d0d0',
    background: '#ffffff',
    surface: '#f5f5f5'
  }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme] = useState<Theme>(neutralTheme);

  const setTheme = () => {
    // Theme setting disabled - always use neutral theme
  };

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Set color variables
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });

    const magmaSemanticColors = {
      '--magma-info-bg': magma.colors.blue100,
      '--magma-info-border': magma.colors.info,
      '--magma-info-text': magma.colors.blue900,
      '--magma-success-bg': magma.colors.green100,
      '--magma-success-border': magma.colors.success,
      '--magma-success-text': magma.colors.green900,
      '--magma-warning-bg': magma.colors.yellow100,
      '--magma-warning-border': magma.colors.warning,
      '--magma-warning-text': magma.colors.yellow1000,
      '--magma-danger-bg': magma.colors.red100,
      '--magma-danger-border': magma.colors.danger,
      '--magma-danger-text': magma.colors.red900,
      '--magma-semantic-body': magma.colors.neutral1200,
    };
    Object.entries(magmaSemanticColors).forEach(([key, value]) => root.style.setProperty(key, value));
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      <MagmaThemeContext.Provider value={magma}>
        <GlobalStyles />
        {children}
      </MagmaThemeContext.Provider>
    </ThemeContext.Provider>
  );
}
