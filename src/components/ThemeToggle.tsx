import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useState, useRef, useEffect } from 'react';

const themes = [
    { value: 'retro', label: 'Retro Brutalism', color: '#f1e8d3', border: '#29261f' },
    { value: 'dark', label: 'Retro Dark', color: '#1c1b18', border: '#eee7d8' },
    { value: 'light', label: 'Retro Light', color: '#f1e8d3', border: '#29261f' },
    { value: 'gruvbox-light', label: 'Gruvbox Light', color: '#fbf1c7', border: '#d5c4a1' },
    { value: 'gruvbox-dark', label: 'Gruvbox Dark', color: '#282828', border: '#504945' },
    { value: 'everforest-light', label: 'Everforest Light', color: '#fdf6e3', border: '#e7e5d4' },
    { value: 'everforest-dark', label: 'Everforest Dark', color: '#2d353b', border: '#485156' },
    { value: 'tokyo-night', label: 'Tokyo Night', color: '#1a1b26', border: '#292e42' },
    { value: 'tokyo-storm', label: 'Tokyo Storm', color: '#24283b', border: '#3d4462' },
    { value: 'tokyo-moon', label: 'Tokyo Moon', color: '#222436', border: '#323752' },
    { value: 'molokai-light', label: 'Molokai Light', color: '#fefaf9', border: '#e4deda' },
    { value: 'molokai-dark', label: 'Molokai Dark', color: '#1b1d1e', border: '#393939' },
    { value: 'catppuccin-latte', label: 'Catppuccin Latte', color: '#eff1f5', border: '#ccd0da' },
    { value: 'catppuccin-frappe', label: 'Catppuccin Frappé', color: '#232634', border: '#3e4255' },
    { value: 'catppuccin-macchiato', label: 'Catppuccin Macchiato', color: '#1e2030', border: '#494d64' },
    { value: 'catppuccin-mocha', label: 'Catppuccin Mocha', color: '#181825', border: '#313244' },
] as const;

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                aria-label="Change theme"
                className="grid size-10 place-items-center border-2 border-ink bg-surface shadow-retro-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-accent-light hover:shadow-retro active:translate-y-0 active:shadow-retro-sm"
            >
                <Palette className="h-5 w-5 text-foreground" />
            </button>
            <div
                className={`absolute right-0 z-50 mt-3 w-64 border-2 border-ink bg-surface shadow-retro transition-all duration-150 ${open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
                    }`}
            >
                <ThemeList theme={theme} onSelect={setTheme} onClose={() => setOpen(false)} />
            </div>
        </div>
    );
};

const ThemeList = ({
    theme,
    onSelect,
    onClose,
}: {
    theme: string;
    onSelect: (v: any) => void;
    onClose: () => void;
}) => (
    <div className="max-h-[400px] overflow-y-auto p-2">
        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Select Theme
        </div>
        {themes.map((t) => (
            <button
                key={t.value}
                onClick={() => {
                    onSelect(t.value);
                    onClose();
                }}
                className={`mb-1 flex w-full items-center gap-3 border-2 px-3 py-2.5 text-left transition-all duration-150 ${theme === t.value
                    ? 'border-ink bg-accent-light text-foreground shadow-retro-sm'
                    : 'border-transparent hover:bg-accent-light'
                    }`}
            >
                <span
                    className="h-6 w-6 shrink-0 border-2 border-ink"
                    style={{ backgroundColor: t.color }}
                />
                <span className="flex-1 text-sm font-bold">{t.label}</span>
                {theme === t.value && <Check className="h-4 w-4" />}
            </button>
        ))}
    </div>
);

export default ThemeToggle;
