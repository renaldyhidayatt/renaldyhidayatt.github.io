import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { ExternalLink, Award, Code2, Wrench, Terminal, Cpu, Database, Cloud, FileText, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const SkillBadge = ({ title, icon: Icon }: { title: string; icon: any }) => (
  <div className="group relative flex items-center gap-2 px-4 py-2 glass rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
    <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
    <span className="text-sm font-bold tracking-tight">{title}</span>
  </div>
);

const AboutSec = ({ title, children, delay }: { title: string; children: React.ReactNode; delay: string }) => {
    const { ref, isVisible } = useReveal();
    return (
        <section 
          ref={ref}
          className={`space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: delay }}
        >
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                {title}
            </h2>
            <div className="pl-11">{children}</div>
        </section>
    );
};

const About = () => {
    const { theme } = useTheme();

    return (
        <Layout>
            <main className="max-w-6xl mx-auto px-6 py-20 pb-20 md:pb-0 font-sans">
                {/* ── Cinematic Header ── */}
                <header className="mb-32 relative">
                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                        <div className="w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                    </div>

                    <div className="grid md:grid-cols-[240px_1fr] gap-12 items-center">
                        <div className="relative group animate-scale-in">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative aspect-square rounded-3xl overflow-hidden glass p-3 border-border/50 shadow-2xl">
                                <img
                                    src={theme === "dark" ? "/dark.png" : "/light.png"}
                                    alt="Renaldy Hidayat"
                                    className="w-full h-full rounded-2xl object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 glass rounded-full flex items-center justify-center border-primary/20 shadow-xl animate-float">
                                <Terminal className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        <div className="space-y-8 pt-4">
                            <div className="space-y-4 animate-slide-up">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
                                    <Award className="w-3.5 h-3.5" />
                                    Global Recognition
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-tight">
                                    Renaldy <br />
                                    <span className="text-primary italic">Hidayat</span>
                                </h1>
                                <p className="text-2xl text-muted-foreground font-medium flex items-center gap-3">
                                    <span className="w-12 h-[2px] bg-muted-foreground/30" />
                                    Backend Engineer
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex-1 min-w-[300px] p-6 glass-strong rounded-3xl border-primary/20 shadow-2xl">
                                    <p className="text-lg text-foreground italic leading-relaxed">
                                        "Ranked in the <span className="text-primary font-black not-italic">Top 1% of 500,000+ developers</span> worldwide on WakaTime in 2025."
                                    </p>
                                </div>
                                <Link
                                    to="https://drive.google.com/file/d/1GOsA4vVKi7JXENMA3wY4hGT-epE6Lv0Y/preview"
                                    target="_blank"
                                    className="group relative inline-flex items-center gap-3 px-8 py-6 text-sm font-black rounded-3xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-2xl hover:-translate-y-2 uppercase tracking-widest overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    Resume
                                    <FileText className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Content Sections ── */}
                <div className="space-y-32">
                    <AboutSec title="Origin" delay="0s">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    I am a software engineer specializing in backend development, with experience designing and building services that operate reliably in production environments.
                                </p>
                                <p>
                                    My work focuses on clear system boundaries, well-defined APIs, and architectures that remain understandable and maintainable as complexity grows.
                                </p>
                            </div>
                            <div className="p-8 glass rounded-3xl border border-primary/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Cpu className="w-24 h-24 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-foreground">Mission</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Building software that isn't just functional, but resilient, scalable, and operationally transparent.
                                </p>
                            </div>
                        </div>
                    </AboutSec>

                    <AboutSec title="Execution" delay="0.1s">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-8">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I work across multiple programming languages and platforms, selecting technologies based on suitability rather than trends.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { title: "Golang", icon: Terminal },
                                    { title: "Rust", icon: Cpu },
                                    { title: "Java", icon: Code2 },
                                    { title: "Python", icon: Terminal },
                                    { title: "NodeJS", icon: Wrench },
                                    { title: "TypeScript", icon: Wrench },
                                ].map((skill) => <SkillBadge key={skill.title} {...skill} />)}
                            </div>
                        </div>
                        <div className="glass p-8 rounded-3xl border-primary/20 space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <Database className="w-6 h-6" />
                                <h4 className="font-bold uppercase tracking-widest text-xs">Data Layer</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["PostgreSQL", "Redis", "Kafka", "RabbitMQ", "MongoDB"].map(t => (
                                    <span key={t} className="text-xs font-bold px-3 py-1 bg-background/50 rounded-lg border border-border/50">{t}</span>
                                ))}
                            </div>
                        </div>
                      </div>
                    </AboutSec>

                    <AboutSec title="Philosophy" delay="0.2s">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="group p-10 glass-strong rounded-[40px] border-border/50 hover:border-primary/50 transition-all duration-500">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Terminal className="w-8 h-8 text-primary" />
                                </div>
                                <h4 className="text-2xl font-black mb-4">Pragmatic Design</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    I approach software engineering with an emphasis on practicality and long-term impact. Design decisions are guided by real-world constraints, not idealized assumptions.
                                </p>
                            </div>
                            <div className="group p-10 glass-strong rounded-[40px] border-border/50 hover:border-primary/50 transition-all duration-500">
                                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Cloud className="w-8 h-8 text-secondary" />
                                </div>
                                <h4 className="text-2xl font-black mb-4">Operational Vision</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    I value continuous improvement through building, measuring, and refining systems. Scalability is built into the foundation, not bolted on.
                                </p>
                            </div>
                        </div>
                    </AboutSec>
                </div>

                <footer className="mt-40 mb-20 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="glass p-12 rounded-[50px] border-primary/10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">Let's build the <span className="text-primary">future</span> together.</h2>
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-xl font-bold text-primary hover:gap-4 transition-all duration-300"
                        >
                            View Projects
                            <ArrowRight className="w-6 h-6" />
                        </Link>
                    </div>
                </footer>
            </main>
        </Layout>
    );
};

export default About;