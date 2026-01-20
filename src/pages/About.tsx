import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { ExternalLink, Award, Code2, Wrench } from "lucide-react";

const About = () => {
    const { theme } = useTheme();

    return (
        <Layout>
            <main className="max-w-5xl mx-auto px-6 py-16 pb-20 md:pb-0">
                <header className="mb-20">
                    <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start">
                        <div className="relative">
                            <img
                                src={theme === "dark" ? "/dark.png" : "/light.png"}
                                alt="Renaldy Hidayat"
                                className="w-44 h-44 rounded-2xl object-cover border-2 border-border shadow-xl"
                            />
                            <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-primary/10 rounded-full blur-2xl"></div>
                        </div>
                        <div className="space-y-6 pt-2">
                            <div className="space-y-3">
                                <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                                    Renaldy Hidayat
                                </h1>
                                <p className="text-xl text-muted-foreground font-medium">
                                    Backend Engineer
                                </p>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-base text-foreground leading-relaxed">
                                    Ranked in the <span className="font-semibold text-primary">Top 1% of 500,000+ developers worldwide</span> on WakaTime in 2025
                                </p>
                            </div>
                            <Link
                                to="https://drive.google.com/file/d/1GOsA4vVKi7JXENMA3wY4hGT-epE6Lv0Y/preview"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
                            >
                                View Resume
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="space-y-16">
                    <section className="space-y-5">
                        <h2 className="text-2xl font-bold text-primary border-l-4 border-primary pl-4">
                            Background
                        </h2>
                        <div className="space-y-4 text-base text-foreground leading-relaxed pl-4">
                            <p>
                                I am a software engineer specializing in backend development, with experience designing and building services that operate reliably in production environments.
                            </p>
                            <p>
                                My work focuses on clear system boundaries, well-defined APIs, and architectures that remain understandable and maintainable as complexity grows.
                            </p>
                            <p>
                                In 2025, my development activity ranked in the top 1% globally among over 500,000 developers tracked by WakaTime, reflecting consistent long-term focus on backend and infrastructure work.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-5">
                        <h2 className="text-2xl font-bold text-primary border-l-4 border-primary pl-4">
                            Professional Interests
                        </h2>
                        <div className="space-y-4 pl-4">
                            <p className="text-base text-foreground leading-relaxed">
                                I am particularly interested in backend and distributed systems where performance, reliability, and operational visibility are critical.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    "Backend system design and service-oriented architecture",
                                    "Distributed and event-driven systems",
                                    "Message brokers and streaming platforms",
                                    "Observability, monitoring, and tracing in production",
                                    "Building internal tools to support engineering teams"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
                                        <Code2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="space-y-5">
                        <h2 className="text-2xl font-bold text-primary border-l-4 border-primary pl-4">
                            Technical Skills
                        </h2>
                        <div className="space-y-6 pl-4">
                            <p className="text-base text-foreground leading-relaxed">
                                I work across multiple programming languages and platforms, selecting technologies based on suitability rather than trends.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                        <Wrench className="w-4 h-4" />
                                        Languages & Frameworks
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Golang", "Rust", "Java", "Python", "PHP", "TypeScript"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-accent text-foreground border border-border rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                        <Wrench className="w-4 h-4" />
                                        APIs & Protocols
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["REST", "gRPC", "GraphQL"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-accent text-foreground border border-border rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                        <Wrench className="w-4 h-4" />
                                        Message Queues & Cache
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Kafka", "RabbitMQ", "Redis"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-accent text-foreground border border-border rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                        <Wrench className="w-4 h-4" />
                                        Databases
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["PostgreSQL", "MySQL", "MongoDB"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-accent text-foreground border border-border rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3 sm:col-span-2">
                                    <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                        <Wrench className="w-4 h-4" />
                                        Infrastructure & Observability
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Docker", "Kubernetes", "Prometheus", "OpenTelemetry"].map((tech) => (
                                            <span key={tech} className="px-3 py-1.5 text-sm font-medium bg-accent text-foreground border border-border rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="space-y-5">
                        <h2 className="text-2xl font-bold text-primary border-l-4 border-primary pl-4">
                            Current Focus
                        </h2>
                        <div className="space-y-4 text-base text-foreground leading-relaxed pl-4">
                            <p>
                                Currently, I am focused on improving backend reliability through better observability, performance tuning, and architectural refinement for services operating under load.
                            </p>
                            <p>
                                I also continue to explore new tools and approaches by building small-scale internal systems, dashboards, and command-line utilities.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-5">
                        <h2 className="text-2xl font-bold text-primary border-l-4 border-primary pl-4">
                            Engineering Approach
                        </h2>
                        <div className="space-y-4 text-base text-foreground leading-relaxed pl-4">
                            <p>
                                I approach software engineering with an emphasis on practicality and long-term impact. Design decisions are guided by real-world constraints, not idealized assumptions.
                            </p>
                            <p>
                                I value continuous improvement through building, measuring, and refining systems, and I aim to share knowledge when it can help teams make better technical decisions.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
};

export default About;