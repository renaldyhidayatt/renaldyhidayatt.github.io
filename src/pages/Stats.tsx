import { useEffect, useState } from "react";
import { TrendingUp, Code2, Zap, Flame, Calendar, Award } from "lucide-react";

const STATS_URL = "https://gist.githubusercontent.com/renaldyhidayatt/92e3466d7423c34c0b15f48979ff29c6/raw/triforce_stats.json";

const emptyStats = {
    xp: 141488,
    level: 38,
    chars_typed: 48502,
    lines_typed: 31836,
    sessions: 182,
    time_coding: 320926,
    last_session_start: 1767466260292,
    achievements: {
        level_10: true,
        polyglot_5: true,
        level_25: true,
        polyglot_3: true,
        sessions_100: true,
        sessions_10: true,
        time_10h: true,
        level_5: true,
        sessions_50: true,
        level_50: true,
        time_1h: true,
        first_10000: true,
        first_1000: true,
        polyglot_10: true,
        first_100: true,
        longest_streak_7: true,
        lines_1000: true,
        lines_10000: true
    },
    chars_by_language: {
        go: 4900,
        css: 131,
        typescriptreact: 601,
        java: 2585,
        sh: 149,
        markdown: 40,
        python: 87,
        lua: 118,
        xml: 84,
        yaml: 290,
        toml: 45,
        rust: 29752,
        javascript: 39
    },
    daily_activity: {
        "2026-01-03": 3260,
        "2026-01-02": 13235,
        "2026-01-01": 1181,
    },
    current_streak: 6,
    longest_streak: 7
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
            <main className="max-w-5xl mx-auto px-6 py-16">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-muted-foreground font-medium">Loading stats...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-5xl mx-auto px-6 py-16 pb-20 md:pb-0 font-sans">
            <header className="mb-12 space-y-6">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight">
                        Engineering Stats
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        A high-level snapshot of long-term coding activity reflecting consistent hands-on work across backend, infrastructure, and systems-oriented engineering.
                    </p>
                </div>
            </header>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<TrendingUp className="w-5 h-5" />}
                    label="Level"
                    value={stats.level}
                    gradient="from-blue-500/10 to-cyan-500/10"
                />
                <StatCard
                    icon={<Zap className="w-5 h-5" />}
                    label="XP"
                    value={stats.xp.toLocaleString()}
                    gradient="from-purple-500/10 to-pink-500/10"
                />
                <StatCard
                    icon={<Code2 className="w-5 h-5" />}
                    label="Sessions"
                    value={stats.sessions}
                    gradient="from-green-500/10 to-emerald-500/10"
                />
                <StatCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Hours Coding"
                    value={stats.time_coding}
                    gradient="from-orange-500/10 to-red-500/10"
                />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <StreakCard
                    icon={<Flame className="w-6 h-6" />}
                    label="Current Streak"
                    value={`${stats.current_streak} days`}
                    subtitle="Keep it going!"
                />
                <StreakCard
                    icon={<Award className="w-6 h-6" />}
                    label="Longest Streak"
                    value={`${stats.longest_streak} days`}
                    subtitle="Personal record"
                />
            </section>

            <section className="mb-12">
                <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-primary">
                                Daily Engineering Activity
                            </h2>
                        </div>

                        <ActivityHeatmap dailyActivity={stats.daily_activity} />

                        <p className="text-sm text-muted-foreground max-w-2xl">
                            Activity intensity aggregated per day. Values represent local editor activity and should be interpreted as directional indicators of consistency.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <div className="p-8 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                <Code2 className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-primary">
                                Language Distribution
                            </h2>
                        </div>

                        <div className="space-y-4 max-w-2xl">
                            {(() => {
                                const entries = Object.entries(stats.chars_by_language)
                                    .sort(([, a], [, b]) => b - a);

                                const maxValue = entries[0]?.[1] ?? 1;

                                return entries.map(([lang, value], index) => {
                                    const percentage = Math.min(100, (value / maxValue) * 100);

                                    return (
                                        <div
                                            key={lang}
                                            className="group/lang"
                                            style={{ animationDelay: `${index * 30}ms` }}
                                        >
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-foreground capitalize font-medium group-hover/lang:text-primary transition-colors">
                                                    {lang}
                                                </span>
                                                <span className="text-muted-foreground tabular-nums">
                                                    {value.toLocaleString()} chars
                                                </span>
                                            </div>

                                            <div className="h-3 bg-accent rounded-full overflow-hidden border border-border">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out group-hover/lang:from-primary group-hover/lang:to-primary"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="p-6 bg-accent/50 rounded-xl border border-border text-sm text-muted-foreground max-w-3xl">
                <p className="leading-relaxed">
                    These metrics are derived from local editor telemetry and reflect personal coding activity over time. They are presented intentionally at a high level and should be viewed as a private feedback mechanism — not as a measure of output quality or comparative performance.
                </p>
            </footer>
        </main>
    );
};

const StatCard = ({ icon, label, value, gradient }) => (
    <div className={`group relative rounded-xl border bg-card px-6 py-5 shadow-sm border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

        <div className="relative space-y-2">
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground font-medium">{label}</div>
                <div className="text-primary/60 group-hover:text-primary transition-colors">{icon}</div>
            </div>
            <div className="text-3xl font-bold text-primary tabular-nums">{value}</div>
        </div>
    </div>
);

const StreakCard = ({ icon, label, value, subtitle }) => (
    <div className="group relative rounded-xl border bg-card p-6 shadow-sm border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                <div className="text-primary">{icon}</div>
            </div>
            <div className="flex-1">
                <div className="text-sm text-muted-foreground font-medium mb-1">{label}</div>
                <div className="text-2xl font-bold text-primary tabular-nums mb-1">{value}</div>
                <div className="text-xs text-muted-foreground">{subtitle}</div>
            </div>
        </div>
    </div>
);

const ActivityHeatmap = ({ dailyActivity }) => {
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
        if (daysMap.has(date)) {
            daysMap.set(date, value);
        }
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
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push(null);
        }
    }

    allDays.forEach((day) => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push(null);
        }
        weeks.push(currentWeek);
    }

    const monthLabels = [];
    const monthsShown = new Set();

    weeks.forEach((week, weekIndex) => {
        const firstDay = week.find(d => d !== null);
        if (firstDay && !monthsShown.has(firstDay.date.substring(0, 7))) {
            const date = new Date(firstDay.date + 'T12:00:00+07:00');
            monthLabels.push({
                month: date.toLocaleDateString('en', { month: 'short', timeZone: 'Asia/Jakarta' }),
                weekIndex
            });
            monthsShown.add(firstDay.date.substring(0, 7));
        }
    });

    const getLevel = (v) => {
        if (v === 0) return 0;
        if (v < 100) return 1;
        if (v < 1000) return 2;
        if (v < 5000) return 3;
        return 4;
    };

    const colors = [
        "bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700",
        "bg-emerald-200 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-800",
        "bg-emerald-400 dark:bg-emerald-700 border-emerald-500 dark:border-emerald-600",
        "bg-emerald-600 dark:bg-emerald-500 border-emerald-700 dark:border-emerald-400",
        "bg-emerald-800 dark:bg-emerald-400 border-emerald-900 dark:border-emerald-300",
    ];

    const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

    return (
        <div className="overflow-x-auto pb-2">
            <div className="inline-block min-w-full">
                <div className="flex mb-3 pl-8">
                    {monthLabels.map(({ month, weekIndex }, idx) => (
                        <div
                            key={weekIndex}
                            className="text-xs font-medium text-muted-foreground"
                            style={{
                                marginLeft: weekIndex === 0 ? 0 : `${(weekIndex - (monthLabels[idx - 1]?.weekIndex || 0)) * 16}px`
                            }}
                        >
                            {month}
                        </div>
                    ))}
                </div>

                <div className="flex gap-1">
                    <div className="flex flex-col gap-1 mr-2 text-xs text-muted-foreground font-medium">
                        {dayLabels.map((label, i) => (
                            <div key={i} className="h-[13px] flex items-center justify-end pr-1" style={{ minWidth: '28px' }}>
                                {label}
                            </div>
                        ))}
                    </div>

                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    title={day ? `${day.date}: ${day.value} chars` : ''}
                                    className={`h-[13px] w-[13px] rounded border ${day ? colors[getLevel(day.value)] : 'bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                                        } transition-all hover:ring-2 hover:ring-primary/50 hover:scale-110 cursor-pointer`}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-end mt-4 text-xs text-muted-foreground gap-2 font-medium">
                    <span>Less</span>
                    {colors.map((color, i) => (
                        <div key={i} className={`h-[13px] w-[13px] rounded border ${color}`} />
                    ))}
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default Stats;