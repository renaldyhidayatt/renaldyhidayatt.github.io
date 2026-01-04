import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

const STATS_URL = "https://gist.githubusercontent.com/renaldyhidayatt/92e3466d7423c34c0b15f48979ff29c6/raw/triforce_stats.json";

const emptyStats: any = {
    "xp": 141488,
    "level": 38,
    "chars_typed": 48502,
    "lines_typed": 31836,
    "sessions": 182,
    "time_coding": 320926,
    "last_session_start": 1767466260292,
    "achievements": {
        "level_10": true,
        "polyglot_5": true,
        "level_25": true,
        "polyglot_3": true,
        "sessions_100": true,
        "sessions_10": true,
        "time_10h": true,
        "level_5": true,
        "sessions_50": true,
        "level_50": true,
        "time_1h": true,
        "first_10000": true,
        "first_1000": true,
        "polyglot_10": true,
        "first_100": true,
        "longest_streak_7": true,
        "lines_1000": true,
        "lines_10000": true
    },
    "chars_by_language": {
        "go": 4900,
        "css": 131,
        "typescriptreact": 601,
        "java": 2585,
        "sh": 149,
        "markdown": 40,
        "python": 87,
        "lua": 118,
        "xml": 84,
        "yaml": 290,
        "toml": 45,
        "rust": 29752,
        "javascript": 39
    },
    "daily_activity": {
        "2026-01-03": 3260,
        "2026-01-02": 13235,
        "2026-01-01": 1181,
    },
    "current_streak": 6,
    "longest_streak": 7
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
                <main className="max-w-2xl mx-auto px-6 py-12">
                    <div className="text-center text-muted-foreground">Loading stats...</div>
                </main>
            </Layout>
        );
    }


    return (
        <Layout>
            <main className="max-w-4xl mx-auto px-6 py-12 pb-20 md:pb-0">
                <header className="mb-16">
                    <h1 className="text-3xl font-serif font-light text-primary mb-4">
                        Engineering Stats Overview
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        A high-level snapshot of long-term coding activity.
                        The data reflects consistent hands-on work across
                        backend, infrastructure, and systems-oriented
                        engineering, and is primarily used as a personal
                        benchmark for continuous improvement.
                    </p>
                </header>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <StatCard label="Level" value={stats.level} />
                    <StatCard label="XP" value={stats.xp.toLocaleString()} />
                    <StatCard label="Sessions" value={stats.sessions} />
                    <StatCard label="Hours Coding" value={stats.time_coding} />
                    <StatCard label="Current Streak" value={`${stats.current_streak} days`} />
                    <StatCard label="Longest Streak" value={`${stats.longest_streak} days`} />
                </section>

                <section className="mb-20">
                    <h2 className="text-xl font-serif text-primary mb-6">
                        Daily Engineering Activity
                    </h2>
                    <ActivityHeatmap dailyActivity={stats.daily_activity} />
                    <p className="mt-4 text-sm text-muted-foreground max-w-xl">
                        Activity intensity aggregated per day. The values
                        represent local editor activity rather than commits,
                        and should be interpreted as directional indicators
                        of consistency rather than absolute productivity.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-serif text-primary mb-6">
                        Language Distribution
                    </h2>
                    <div className="space-y-4 max-w-xl">
                        {Object.entries(stats.chars_by_language).map(([lang, value]: any) => (
                            <div key={lang}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted-foreground">{lang}</span>
                                    <span className="text-muted-foreground">
                                        {value.toLocaleString()} chars
                                    </span>
                                </div>
                                <div className="h-2 bg-muted rounded">
                                    <div
                                        className="h-2 bg-primary rounded"
                                        style={{
                                            width: `${(value / stats.chars_by_language.rust) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="mt-20 text-sm text-muted-foreground max-w-2xl">
                    <p>
                        These metrics are derived from local editor telemetry
                        and reflect personal coding activity over time. They
                        are presented intentionally at a high level and should
                        be viewed as a private feedback mechanism — not as a
                        measure of output quality or comparative performance.
                    </p>
                </footer>
            </main>
        </Layout>
    );
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
    <div className="rounded-xl border bg-card px-6 py-5 shadow-sm">
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className="text-2xl font-light text-primary">{value}</div>
    </div>
);

const ActivityHeatmap = ({ dailyActivity }: { dailyActivity: any }) => {
    if (!dailyActivity) return null;

    const getJakartaDateString = (date: Date = new Date()) => {
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

    const weeks: any[][] = [];
    let currentWeek: any[] = [];

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

    const monthLabels: { month: string; weekIndex: number }[] = [];
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

    const getLevel = (v: number) => {
        if (v === 0) return 0;
        if (v < 100) return 1;
        if (v < 1000) return 2;
        if (v < 5000) return 3;
        return 4;
    };

    const colors = [
        "bg-gray-200 dark:bg-gray-800",
        "bg-green-200 dark:bg-green-900",
        "bg-green-400 dark:bg-green-700",
        "bg-green-600 dark:bg-green-500",
        "bg-green-800 dark:bg-green-400",
    ];

    const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];


    return (
        <div className="overflow-x-auto pb-2">
            <div className="inline-block min-w-full">
                <div className="flex mb-2 pl-8">
                    {monthLabels.map(({ month, weekIndex }) => (
                        <div
                            key={weekIndex}
                            className="text-xs text-muted-foreground"
                            style={{ marginLeft: weekIndex === 0 ? 0 : `${(weekIndex - (monthLabels[monthLabels.indexOf({ month, weekIndex }) - 1]?.weekIndex || 0)) * 14}px` }}
                        >
                            {month}
                        </div>
                    ))}
                </div>
                <div className="flex gap-[2px]">
                    <div className="flex flex-col gap-[2px] mr-2 text-xs text-muted-foreground">
                        {dayLabels.map((label, i) => (
                            <div key={i} className="h-[11px] flex items-center justify-end pr-1" style={{ minWidth: '28px' }}>
                                {label}
                            </div>
                        ))}
                    </div>

                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px]">
                            {week.map((day, dayIndex) => (
                                <div
                                    key={dayIndex}
                                    title={day ? `${day.date}: ${day.value} chars` : ''}
                                    className={`h-[11px] w-[11px] rounded-sm ${day ? colors[getLevel(day.value)] : 'bg-gray-100 dark:bg-gray-800'
                                        } transition-colors hover:ring-1 hover:ring-gray-400`}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-end mt-4 text-xs text-muted-foreground gap-1">
                    <span>Less</span>
                    {colors.map((color, i) => (
                        <div key={i} className={`h-[11px] w-[11px] rounded-sm ${color}`} />
                    ))}
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default Stats;