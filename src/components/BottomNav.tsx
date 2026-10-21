import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Briefcase, User, Award, Palette, Check, X, BookMarked } from "lucide-react";
import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';

const themes = [
    { value: 'retro', label: 'Retro Brutalism', color: '#f1e8d3', border: '#29261f' },
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

const BottomNav = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [showThemeModal, setShowThemeModal] = useState(false);

    const isActive = (path: string) =>
        location.pathname === path ||
        (path === "/blog" && location.pathname.startsWith("/blog/")) ||
        (path === "/cheatsheet" && location.pathname.startsWith("/cheatsheet/")) ||
        (path === "/portfolio" && location.pathname.startsWith("/portfolio/"));

    const navItems = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/blog", icon: FileText, label: "Blog" },
        { path: "/cheatsheet", icon: BookMarked, label: "Cheat" },
        { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
        { path: "/sertifikat", icon: Award, label: "Sertifikat" },
        { path: "/about", icon: User, label: "About" },
    ];

    return (
        <>
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="retro-shadow mx-auto max-w-lg border-2 border-ink bg-surface">
                    <div className="flex items-stretch justify-around gap-1 px-2 py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex flex-1 flex-col items-center justify-center gap-1 border-2 px-2 py-2 transition-all duration-150 ${
                                        active
                                            ? "border-ink bg-badge text-badge-ink shadow-retro-sm"
                                            : "border-transparent text-muted-foreground active:translate-y-0.5"
                                    }`}
                                >
                                    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                                    <span className="text-[10px] font-black uppercase tracking-wider">
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => setShowThemeModal(true)}
                            className="flex flex-1 flex-col items-center justify-center gap-1 border-2 border-transparent px-2 py-2 text-muted-foreground transition-all duration-150 active:translate-y-0.5"
                        >
                            <Palette size={20} strokeWidth={2} />
                            <span className="text-[10px] font-black uppercase tracking-wider">
                                Theme
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {showThemeModal && (
                <div className="md:hidden fixed inset-0 z-[60]">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setShowThemeModal(false)}
                    />
                    <div className="animate-slide-up absolute bottom-0 left-0 right-0 max-h-[75vh] border-t-2 border-ink bg-surface shadow-retro-lg flex flex-col">
                        <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
                            <h3 className="text-base font-black uppercase tracking-wider">Select Theme</h3>
                            <button
                                onClick={() => setShowThemeModal(false)}
                                className="grid size-9 place-items-center border-2 border-ink bg-surface shadow-retro-sm transition-colors hover:bg-accent-light"
                                aria-label="Close theme selector"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-2 overflow-y-auto px-4 py-4">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => {
                                        setTheme(t.value as any);
                                        setShowThemeModal(false);
                                    }}
                                    className={`flex w-full items-center gap-4 border-2 px-4 py-3.5 text-left transition-all duration-150 ${
                                        theme === t.value
                                            ? "border-ink bg-accent-light text-foreground shadow-retro-sm"
                                            : "border-transparent hover:bg-accent-light"
                                    }`}
                                >
                                    <span
                                        className="h-8 w-8 shrink-0 border-2 border-ink"
                                        style={{ backgroundColor: t.color }}
                                    />
                                    <span className="flex-1 text-base font-bold">
                                        {t.label}
                                    </span>
                                    {theme === t.value && (
                                        <Check className="h-5 w-5 shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="h-6 flex-shrink-0" />
                    </div>
                </div>
            )}
        </>
    );
};

export default BottomNav;
