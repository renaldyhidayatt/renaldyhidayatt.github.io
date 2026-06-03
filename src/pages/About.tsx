import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { Terminal, Cpu, Database, Cloud, FileText, ArrowRight, Users, Zap, Activity, Binary, Brain } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const SKILL_CATEGORIES = [
    {
        title: "Systems & Core Languages",
        icon: Terminal,
        description: "Compiled languages for systems programming, high-performance concurrency, and type-safe backend logic.",
        skills: ["Go (Golang)", "Rust (2024)", "Java (JVM)", "Python", "C (Kernel/eBPF)", "TypeScript", "NodeJS"]
    },
    {
        title: "Microservices & API Architecture",
        icon: Cpu,
        description: "High-throughput inter-service communication protocols, structured serialization, and routing gateways.",
        skills: ["gRPC / Protobuf", "GraphQL (gqlgen)", "RESTful APIs", "Quarkus", "SpringBoot", "Echo (Go)", "Axum / Actix (Rust)", "NestJS", "FastAPI"]
    },
    {
        title: "Enterprise Event Streaming",
        icon: Zap,
        description: "Decoupled asynchronous orchestration, distributed commit logs, and high-volume message queues.",
        skills: ["Apache Kafka", "RabbitMQ", "Event-Driven Arch", "Kafka Exporter", "Pub/Sub Systems"]
    },
    {
        title: "Data Systems & Caching",
        icon: Database,
        description: "Relational persistence, ultra-low latency in-memory stores, and type-safe database schemas.",
        skills: ["PostgreSQL", "Redis Caching", "SQLC (Type-Safe)", "Sea-ORM / GORM", "Goose Migrations", "MongoDB", "SQLite"]
    },
    {
        title: "Observability & SRE Stack",
        icon: Activity,
        description: "Multi-pillar telemetry instrumentation, distributed trace mapping, and auto-alert systems.",
        skills: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger Tracing", "Loki & Promtail", "Circuit Breakers", "Rate Limiters"]
    },
    {
        title: "Kernel Space & Systems",
        icon: Binary,
        description: "Kernel-level tracing, raw socket monitoring, and hardware-level performance engineering.",
        skills: ["eBPF (BPF Syscall)", "Linux Kernel space", "BPF Ring Buffers", "Network Monitoring", "System Telemetry"]
    },
    {
        title: "Cloud Native & Orchestration",
        icon: Cloud,
        description: "Declarative infrastructure deployment, horizontal pod autoscaling, and isolated local development clusters.",
        skills: ["Kubernetes (K8s)", "Docker", "Docker Compose", "Minikube", "HPA & PVC configs", "NGINX Ingress"]
    },
    {
        title: "AI & MLOps Platforms",
        icon: Brain,
        description: "Decoupled training pipelines, experiment registries, real-time feature drift analysis, and runtime SLM isolation.",
        skills: ["MLflow (Registry)", "XGBoost / Scikit-Learn", "ONNX Inference Engine", "PSI Drift Monitoring", "ModelGuard (SHA-256)", "LlmOutputFilter", "Gradio & Streamlit", "Ollama / DeepSeek"]
    }
];

const AboutSec = ({ title, children, delay }: { title: string; children: React.ReactNode; delay: string }) => {
    const { ref, isVisible } = useReveal();
    return (
        <section
            ref={ref}
            className={`space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
            style={{ transitionDelay: delay }}
        >
            <h2 className="text-xl md:text-2xl font-bold tracking-tighter text-foreground flex items-center gap-3">
                <span className="w-6 h-1 bg-primary/50 rounded-full" />
                {title}
            </h2>
            <div className="pl-11">{children}</div>
        </section>
    );
};

const About = () => {
    const { theme } = useTheme();

    return (
        <Layout maxWidth="w-full">
            <main className="max-w-6xl mx-auto px-6 py-20 pb-20 md:pb-0 font-sans">
                {/* ── Cinematic Header ── */}
                <header className="mb-32 relative">
                    <div className="absolute inset-0 -z-10 flex items-center justify-center">
                        <div className="w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
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
                        </div>

                        <div className="space-y-8 pt-4">
                            <div className="space-y-4 animate-slide-up">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                                    <Terminal className="w-3.5 h-3.5" />
                                    Software Engineering
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-tight">
                                    Renaldy <br />
                                    <span className="text-primary italic">Hidayat</span>
                                </h1>
                                <p className="text-2xl text-muted-foreground font-medium flex items-center gap-3">
                                    <span className="w-12 h-[2px] bg-muted-foreground/30" />
                                    Backend Engineer
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                                <div className="flex-1 min-w-[300px] p-6 glass rounded-3xl border border-border/50 shadow-lg">
                                    <p className="text-lg text-muted-foreground italic leading-relaxed">
                                        "Believes that code is a craft that requires constant learning and patience."
                                    </p>
                                </div>
                                <Link
                                    to="https://drive.google.com/file/d/1GOsA4vVKi7JXENMA3wY4hGT-epE6Lv0Y/preview"
                                    target="_blank"
                                    className="group relative inline-flex items-center gap-3 px-8 py-6 text-sm font-bold rounded-3xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-2xl hover:-translate-y-2 uppercase tracking-widest overflow-hidden"
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
                    <AboutSec title="My Journey" delay="0s">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    I am a software engineer focused on backend development. I enjoy the process of designing systems and seeing how they evolve over time.
                                </p>
                                <p>
                                    My goal is to build software that is simple to understand, easy to maintain, and reliable for its users. I believe in writing code not just for machines, but for people.
                                </p>
                            </div>
                            <div className="p-8 glass rounded-3xl border border-border/50 relative overflow-hidden">
                                <h3 className="text-xl font-bold mb-4 text-foreground">Aspirations</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To contribute to projects that solve real problems while continuously improving my own skills and technical understanding.
                                </p>
                            </div>
                        </div>
                    </AboutSec>

                    <AboutSec title="My Craft" delay="0.1s">
                        <div className="space-y-6">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I design and implement reliable architectures, low-level monitoring systems, and secure AI-augmented services. Here is a detailed breakdown of the specialized capabilities and technologies I leverage:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                                {SKILL_CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <div
                                            key={cat.title}
                                            className="group relative p-6 glass rounded-3xl border border-border/50 hover:border-primary/30 hover:bg-card/40 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
                                        >
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="font-bold text-base text-foreground tracking-tight">{cat.title}</h3>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed font-medium">{cat.description}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border/20">
                                                {cat.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="text-[10px] font-bold px-2.5 py-1 bg-background/30 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </AboutSec>

                    <AboutSec title="Core Values" delay="0.2s">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="group p-8 glass rounded-[32px] border-border/50 hover:border-primary/30 transition-all duration-500">
                                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                                    <Terminal className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">Pragmatism</h4>
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    Solving problems based on what is needed today, while keeping an eye on what might be needed tomorrow.
                                </p>
                            </div>
                            <div className="group p-8 glass rounded-[32px] border-border/50 hover:border-primary/30 transition-all duration-500">
                                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-xl font-bold mb-4">Collaboration</h4>
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    Sharing knowledge and working together to build better systems and better communities.
                                </p>
                            </div>
                        </div>
                    </AboutSec>
                </div>

                <footer className="mt-40 mb-20 text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="glass p-12 rounded-[40px] border-border/50 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tighter">I'm always open to <span className="text-primary italic">new conversations</span> and learning opportunities.</h2>
                        <Link
                            to="/portfolio"
                            className="inline-flex items-center gap-2 text-lg font-bold text-primary hover:gap-4 transition-all duration-300"
                        >
                            Explore My Work
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </footer>
            </main>
        </Layout>
    );
};

export default About;