import { useEffect, useState, useRef } from "react";
import { TrendingUp, Code2, Zap, Flame, Calendar, Award, Target, Activity, BarChart3, Binary, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { useReveal } from "@/hooks/use-reveal";

const STATS_URL = "https://gist.githubusercontent.com/renaldyhidayatt/92e3466d7423c34c0b15f48979ff29c6/raw/triforce_stats.json";

const emptyStats = {
    xp: 0,
    level: 0,
    chars_typed: 0,
    lines_typed: 0,
    sessions: 0,
    time_coding: 0,
    last_session_start: 0,
    achievements: {},
    chars_by_language: {},
    daily_activity: {},
    current_streak: 0,
    longest_streak: 0
};

const AnimatedCount = ({ value, duration = 2000 }: { value: number | string, duration?: number }) => {
    const [count, setCount] = useState(0);
    const target = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    
    useEffect(() => {
        let start = 0;
        const end = target;
        const totalSteps = duration / 16;
        const increment = end / totalSteps;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        
        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{typeof value === 'string' ? count.toLocaleString() : count}</span>;
};

const StatCard = ({ icon: Icon, label, value, gradient, index }: any) => {
    const { ref, isVisible } = useReveal();
    return (
        <div 
            ref={ref}
            className={`group relative rounded-3xl p-8 glass border border-border/50 hover:border-primary/50 transition-[transform,opacity] duration-700 transform-gpu shadow-2xl shadow-primary/5 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ 
                transitionDelay: `${index * 100}ms`,
                willChange: "transform, opacity"
            }}
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative flex flex-col h-full space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</span>
                    <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        <Icon className="w-5 h-5" />
                    </div>
                </div>
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-foreground tabular-nums">
                    <AnimatedCount value={value} />
                </div>
                <div className="absolute -bottom-1 -right-1 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="w-24 h-24" />
                </div>
            </div>
        </div>
    );
};

const LanguageBar = ({ lang, value, percentage, index }: any) => {
    const { ref, isVisible } = useReveal();
    return (
        <div 
          ref={ref}
          className={`space-y-3 transition-[transform,opacity] duration-700 transform-gpu ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          style={{ 
            transitionDelay: `${index * 50}ms`,
            willChange: "transform, opacity"
          }}
        >
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-black uppercase tracking-tighter text-foreground">{lang}</span>
                </div>
                <span className="text-xs font-bold text-muted-foreground tabular-nums">{value.toLocaleString()} chars</span>
            </div>
            <div className="h-3 w-full bg-accent/30 rounded-full overflow-hidden border border-border/40 p-[2px]">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: isVisible ? `${percentage}%` : '0%' }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </div>
            </div>
        </div>
    );
};

const Stats = () => {
    const [stats, setStats] = useState(emptyStats);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch(STATS_URL, { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                setStats({
                    ...data,
                    time_coding: Math.round(data.time_coding / 3600),
                });
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <main className="max-w-6xl mx-auto px-6 py-20">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                            <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="max-w-6xl mx-auto px-6 py-20 pb-20 md:pb-0 font-sans">
                <header className="mb-20 space-y-10 text-center relative">
                    <div className="absolute inset-0 -z-10 bg-primary/5 blur-[120px] rounded-full" />
                    <div className="space-y-4 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
                            <Activity className="w-3.5 h-3.5" />
                            System Telemetry
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-tight">
                            Engineering <span className="text-primary italic">Metrics</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Real-time telemetry from my development environment, reflecting thousands of hours of architectural design and code execution.
                        </p>
                    </div>
                </header>

                {/* ── Main Stat Grid ── */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        icon={TrendingUp}
                        label="Dev Level"
                        value={stats.level}
                        gradient="from-blue-500/10 to-cyan-500/10"
                        index={0}
                    />
                    <StatCard
                        icon={Zap}
                        label="Total XP"
                        value={stats.xp}
                        gradient="from-purple-500/10 to-pink-500/10"
                        index={1}
                    />
                    <StatCard
                        icon={Activity}
                        label="Code Sessions"
                        value={stats.sessions}
                        gradient="from-green-500/10 to-emerald-500/10"
                        index={2}
                    />
                    <StatCard
                        icon={Clock}
                        label="Execution Hours"
                        value={stats.time_coding}
                        gradient="from-orange-500/10 to-red-500/10"
                        index={3}
                    />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                   <div className="group relative p-8 glass-strong rounded-[40px] border-border/50 hover:border-primary/50 transition-all duration-500">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                                <Flame className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Current Streak</p>
                                <p className="text-4xl font-black text-foreground">{stats.current_streak} <span className="text-lg text-muted-foreground">Days</span></p>
                            </div>
                        </div>
                   </div>
                   <div className="group relative p-8 glass-strong rounded-[40px] border-border/50 hover:border-primary/50 transition-all duration-500">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                                <Award className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Longest Streak</p>
                                <p className="text-4xl font-black text-foreground">{stats.longest_streak} <span className="text-lg text-muted-foreground">Days</span></p>
                            </div>
                        </div>
                   </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── Heatmap section ── */}
                    <section className="lg:col-span-2">
                        <div className="p-10 glass rounded-[50px] border-border/50 relative overflow-hidden group h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BarChart3 className="w-32 h-32" />
                            </div>
                            <div className="relative space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black tracking-tighter text-foreground">
                                        Commit Frequency
                                    </h2>
                                </div>
                                <ActivityHeatmap dailyActivity={stats.daily_activity} />
                                <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-xs text-muted-foreground italic">
                                    <Target className="w-4 h-4 text-primary" />
                                    Data represents interactive editor sessions and local binary executions.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── Language section ── */}
                    <section className="lg:col-span-1">
                        <div className="p-10 glass rounded-[50px] border-border/50 relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Binary className="w-32 h-32" />
                            </div>
                            <div className="relative space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black tracking-tighter text-foreground">
                                        Stack Usage
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    {(() => {
                                        const entries = Object.entries(stats.chars_by_language)
                                            .sort(([, a], [, b]) => (b as any) - (a as any));
                                        const maxValue = (entries[0]?.[1] as any) ?? 1;
                                        return entries.slice(0, 10).map(([lang, value], index) => {
                                            const percentage = Math.min(100, ((value as any) / maxValue) * 100);
                                            return <LanguageBar key={lang} lang={lang} value={value} percentage={percentage} index={index} />;
                                        });
                                    })()}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="mt-20 p-8 glass-strong rounded-[32px] border-primary/10 text-sm text-muted-foreground flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <Activity className="w-6 h-6 text-primary flex-shrink-0" />
                    <p className="leading-relaxed italic">
                        The metrics above are autonomously aggregated from local telemetry and production logs. They serve as a proof-of-focus, visualizing the thousands of invisible engineering steps behind every project in my portfolio.
                    </p>
                </footer>
            </main>
        </Layout>
    );
};

// ── Heatmap Component (Redesigned) ──
const ActivityHeatmap = ({ dailyActivity }: any) => {
    if (!dailyActivity) return null;

    const getJakartaDateString = (date = new Date()) => {
        return date.toLocaleDateString('en-CA', { timeZone: 'Asia/Jakarta' });
    };

    const todayJakartaStr = getJakartaDateString();
    const currentYear = parseInt(todayJakartaStr.substring(0, 4));
    const startDateStr = `${currentYear}-01-01`;

    const daysMap = new Map();
    const startDate = new Date(`${startDateStr}T00:00:00+07:00`);
    const d = new Date(startDate);

    while (getJakartaDateString(d) <= todayJakartaStr) {
        const dateStr = getJakartaDateString(d);
        daysMap.set(dateStr, 0);
        d.setDate(d.getDate() + 1);
    }

    Object.entries(dailyActivity).forEach(([date, value]) => {
        if (daysMap.has(date)) daysMap.set(date, value);
    });

    const allDays = Array.from(daysMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, value]) => ({
            date,
            value,
            dayOfWeek: new Date(date + 'T12:00:00+07:00').getDay()
        }));

    const weeks = [];
    let currentWeek = [];

    if (allDays.length > 0) {
        const firstDayOfWeek = allDays[0].dayOfWeek;
        for (let i = 0; i < firstDayOfWeek; i++) currentWeek.push(null);
    }

    allDays.forEach((day) => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) currentWeek.push(null);
        weeks.push(currentWeek);
    }

    const colors = [
        "bg-accent dark:bg-accent/40 border-transparent",
        "bg-primary/20 dark:bg-primary/10 border-primary/20",
        "bg-primary/40 dark:bg-primary/30 border-primary/30",
        "bg-primary/70 dark:bg-primary/60 border-primary/50",
        "bg-primary dark:bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]",
    ];

    const getLevel = (v: number) => {
        if (v === 0) return 0;
        if (v < 100) return 1;
        if (v < 1000) return 2;
        if (v < 5000) return 3;
        return 4;
    };

    return (
        <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex gap-2 min-w-max">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-2">
                        {week.map((day : any, dayIndex) => (
                            <div
                                key={dayIndex}
                                title={day ? `${day.date}: ${day.value} chars` : ''}
                                className={`h-4 w-4 rounded-[4px] border transition-all duration-300 ${
                                    day ? `${colors[getLevel(day.value)]} hover:scale-125 hover:rotate-3 cursor-pointer` : 'bg-transparent border-transparent'
                                }`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;