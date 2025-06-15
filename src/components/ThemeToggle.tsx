import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gruvbox-bg-soft hover:bg-gruvbox-bg-hard transition-colors border border-gruvbox-gray"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-gruvbox-fg" />
      ) : (
        <Moon className="h-4 w-4 text-gruvbox-fg" />
      )}
    </button>
  );
};

export default ThemeToggle;