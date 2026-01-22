import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Briefcase, User, Palette, Check, X } from "lucide-react";
import { useTheme } from '@/hooks/use-theme';
import { useState } from 'react';

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

const BottomNav = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [showThemeModal, setShowThemeModal] = useState(false);

    const isActive = (path: string) =>
        location.pathname === path ||
        (path === "/blog" && location.pathname.startsWith("/blog/")) ||
        (path === "/portfolio" && location.pathname.startsWith("/portfolio/"));

    const navItems = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/blog", icon: FileText, label: "Blog" },
        { path: "/portfolio", icon: Briefcase, label: "Portfolio" },
        { path: "/about", icon: User, label: "About" },
    ];

    return (
        <>
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="max-w-lg mx-auto bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-primary/5">
                    <div className="px-2 py-3">
                        <div className="flex items-center justify-around gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`relative flex flex-col items-center justify-center flex-1 py-2 px-2 rounded-2xl transition-all duration-300 ${active
                                            ? "text-primary"
                                            : "text-muted-foreground active:scale-95"
                                            }`}
                                    >
                                        {active && (
                                            <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-in fade-in zoom-in-95 duration-200"></div>
                                        )}
                                        <div className="relative">
                                            {active && (
                                                <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full animate-pulse"></div>
                                            )}
                                            <Icon
                                                size={20}
                                                className={`relative mb-1 transition-transform duration-300 ${active ? "scale-110" : ""
                                                    }`}
                                                strokeWidth={active ? 2.5 : 2}
                                            />
                                        </div>
                                        <span
                                            className={`text-[10px] font-semibold transition-all duration-300 ${active ? "opacity-100" : "opacity-70"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                        {active && (
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in zoom-in duration-200"></div>
                                        )}
                                    </Link>
                                );
                            })}
                            <button
                                onClick={() => setShowThemeModal(true)}
                                className="relative flex flex-col items-center justify-center flex-1 py-2 px-2 rounded-2xl text-muted-foreground active:scale-95 transition-all duration-300"
                            >
                                <Palette size={20} className="mb-1" strokeWidth={2} />
                                <span className="text-[10px] font-semibold opacity-70">
                                    Theme
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showThemeModal && (
                <div className="md:hidden fixed inset-0 z-[60]">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setShowThemeModal(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl border-t border-border max-h-[75vh] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                            <h3 className="font-semibold text-lg">Select Theme</h3>
                            <button
                                onClick={() => setShowThemeModal(false)}
                                className="p-2 rounded-lg hover:bg-accent active:scale-95 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto px-4 py-4 space-y-2">
                            {themes.map((t) => (
                                <button
                                    key={t.value}
                                    onClick={() => {
                                        setTheme(t.value as any);
                                        setShowThemeModal(false);
                                    }}
                                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition active:scale-[0.98] ${theme === t.value
                                        ? "bg-primary/10 text-primary border-2 border-primary/20"
                                        : "border-2 border-transparent hover:bg-accent"
                                        }`}
                                >
                                    <div
                                        className="w-8 h-8 rounded-lg border-2 shadow-sm flex-shrink-0"
                                        style={{
                                            backgroundColor: t.color,
                                            borderColor: t.border,
                                        }}
                                    />
                                    <span className="flex-1 font-medium text-base">
                                        {t.label}
                                    </span>
                                    {theme === t.value && (
                                        <Check className="w-5 h-5 flex-shrink-0" />
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