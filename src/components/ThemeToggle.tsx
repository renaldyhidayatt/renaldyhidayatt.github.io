import { Palette, Check, X } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useState, useRef, useEffect } from 'react';

const themes = [
    { value: 'light', label: 'Light', color: '#ffffff', border: '#e5e5e5' },
    { value: 'dark', label: 'Dark', color: '#1a1b26', border: '#414868' },
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
                className="p-3 rounded-lg bg-card border border-border hover:bg-accent active:scale-95 transition"
            >
                <Palette className="w-5 h-5 text-foreground" />
            </button>
            <div
                className={`absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-50 transition-all ${open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
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
    onSelect: (v: string) => void;
    onClose: () => void;
}) => (
    <div className="p-2 max-h-[400px] overflow-y-auto">
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
            Select Theme
        </div>
        {themes.map((t) => (
            <button
                key={t.value}
                onClick={() => {
                    onSelect(t.value as any);
                    onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition ${theme === t.value ? 'bg-primary/10 text-primary' : 'hover:bg-accent'
                    }`}
            >
                <div
                    className="w-6 h-6 rounded-md border-2"
                    style={{ backgroundColor: t.color, borderColor: t.border }}
                />
                <span className="flex-1 text-sm font-medium text-left">{t.label}</span>
                {theme === t.value && <Check className="w-4 h-4" />}
            </button>
        ))}
    </div>
);

export default ThemeToggle;