import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import {
    Terminal,
    Cpu,
    Database,
    Cloud,
    FileText,
    ArrowRight,
    Zap,
    Activity,
    Binary,
    Brain,
    BookOpen,
    Layers,
    ExternalLink,
    Mail,
    Linkedin,
    Github,
    Copy,
    Check,
    GraduationCap,
    Code2
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

// Observable, grounded metrics
const STATS = [
    { value: "78+", label: "Projects & Repos", desc: "Backend, systems & experiments" },
    { value: "20+", label: "Case Studies", desc: "Architecture notes & benchmarks" },
    { value: "5", label: "Core Languages", desc: "Go, Rust, Java, C & TypeScript" },
    { value: "100%", label: "Public & Open Source", desc: "Documented repos & blueprints" },
];

// Concise Profile Details
const PROFILE_SUMMARY = [
    {
        title: "Target Roles",
        content: "Junior Backend Engineer • Systems Engineer • Software Engineer (Go / Rust / Java)"
    },
    {
        title: "Primary Technologies",
        content: "Go (Golang), Rust, Java (Spring Boot / Quarkus), C (eBPF), PostgreSQL (SQLC), Apache Kafka, Docker"
    },
    {
        title: "Key Areas of Interest",
        content: "Distributed messaging (Kafka/RabbitMQ), transactional outbox patterns, eBPF telemetry, and systems programming"
    },
    {
        title: "Current Status",
        content: "Recent graduate looking for full-time junior engineering opportunities • Open to Remote, Hybrid, or On-site"
    }
];

// Engineering Approach
const LEARNING_PILLARS = [
    {
        area: "Systems & Low-Level Concepts",
        focus: "Understanding the Layers Underneath",
        description: "I enjoy understanding what happens below the framework abstraction. I’ve spent time exploring Linux kernel tracepoints, eBPF ring buffers, and memory management in C and Rust.",
    },
    {
        area: "Data Consistency & Messaging",
        focus: "Practicing Resilient Patterns",
        description: "Studying common distributed systems patterns by implementing transactional outbox patterns, Kafka consumer groups, idempotency handling, and concurrency primitives in Go.",
    },
    {
        area: "Applied AI & Foundations",
        focus: "Building to Learn Mechanisms",
        description: "To better understand modern machine learning architectures, I implemented a GPT-style transformer from scratch in pure Rust and built a small MLOps drift monitoring pipeline.",
    },
    {
        area: "Observability & SRE Stack",
        focus: "Practicing Production Patterns",
        description: "Practicing observability and reliability patterns commonly used in production systems, such as OpenTelemetry instrumentation, Jaeger tracing, Prometheus metrics, and circuit breakers.",
    }
];

// 4 Core Exploration Pillars
const CORE_PILLARS = [
    {
        title: "Microservices & Distributed Patterns",
        badge: "Backend",
        icon: Cpu,
        headline: "Asynchronous messaging and service communication",
        description:
            "Implemented multi-service architectures across Go, Rust (Axum), and Java (Quarkus/Spring). Explored asynchronous event streaming with Kafka and RabbitMQ, along with structured gRPC contracts.",
        proofPoints: [
            "Event decoupling with Apache Kafka and RabbitMQ",
            "Service implementations in Go, Rust (Axum), and Quarkus",
            "Practiced Outbox and Saga patterns for distributed transactions",
            "Type-safe persistence using SQLC and PostgreSQL"
        ],
        link: "/portfolio/microservice-ecommerce"
    },
    {
        title: "Kernel-Level Network Telemetry",
        badge: "Linux & Systems",
        icon: Binary,
        headline: "Exploring low-overhead OS-level observability",
        description:
            "Explored kernel-level network telemetry using eBPF kprobes and ring buffers in Linux C, learning how modern tools capture DNS and socket metrics without modifying user-space applications.",
        proofPoints: [
            "eBPF kprobes and tracepoints written in Linux C",
            "Streaming kernel event payloads through BPF ring buffers",
            "Capturing and parsing DNS traffic at the socket level",
            "Understanding Linux kernel tracing and memory boundaries"
        ],
        link: "/portfolio/ebpf-dns-network-monitoring"
    },
    {
        title: "Machine Learning & Foundations",
        badge: "Applied ML",
        icon: Brain,
        headline: "Studying architectures through hands-on implementation",
        description:
            "Built SanEdgeGPT in pure Rust to learn transformer mechanics, attention layers, and matrix calculations directly. Explored MLOps workflows by setting up automated feature drift monitoring.",
        proofPoints: [
            "SanEdgeGPT: Self-implemented transformer model in Rust",
            "Experiment tracking workflow with MLflow and ONNX runtime",
            "Population Stability Index (PSI) feature drift detector",
            "Modular services for AI-assisted workflows in the Piero project"
        ],
        link: "/portfolio/sanedgegpt"
    },
    {
        title: "Technical Writing & Architecture Notes",
        badge: "Research & Writing",
        icon: BookOpen,
        headline: "Documenting findings, tradeoffs, and system breakdowns",
        description:
            "Writing technical articles has been an essential part of my learning process. I document what I discover about Go concurrency, relational database schemas, and message broker comparisons.",
        proofPoints: [
            "Breakdowns of Go concurrency patterns and synchronization primitives",
            "Case studies on relational schemas (Airport and Booking systems)",
            "Tradeoff comparisons between NATS, RabbitMQ, and Kafka",
            "20+ written articles and technical breakdowns published on my blog"
        ],
        link: "/blog"
    }
];

// Selected portfolio projects
const SELECTED_PROJECTS = [
    {
        title: "Piero ERP & Cloud Lab",
        tag: "Modular Backend",
        stat: "Modular Setup",
        description: "Experimental ERP platform exploring AI-assisted workflows, runtime analysis, modular services, and cloud-like development environments.",
        link: "/portfolio/piero-erp-ai"
    },
    {
        title: "SanEdgeGPT: Transformer in Rust",
        tag: "Systems & ML",
        stat: "Pure Rust",
        description: "Implemented a generative transformer model from scratch in Rust without external machine learning frameworks to study core neural network mechanics.",
        link: "/portfolio/sanedgegpt"
    },
    {
        title: "eBPF DNS Network Monitor",
        tag: "Linux Kernel",
        stat: "Kernel C",
        description: "Explored low-overhead network telemetry using eBPF kprobes and ring buffers in Linux C to monitor DNS packet queries.",
        link: "/portfolio/ebpf-dns-network-monitoring"
    },
    {
        title: "Fraud Detection MLOps Pipeline",
        tag: "ML & Data",
        stat: "PSI Monitoring",
        description: "End-to-end machine learning project exploring experiment tracking with MLflow, ONNX inference, and automated data drift monitoring.",
        link: "/portfolio/fraud-detection-mlops"
    }
];

// Tech stack
const SKILL_CATEGORIES = [
    {
        title: "Languages Practiced",
        icon: Terminal,
        description: "Languages used across my projects and learning experiments.",
        skills: ["Go (Golang)", "Rust (2024)", "Java (JVM)", "C (Kernel / eBPF)", "Python", "TypeScript", "Node.js"],
    },
    {
        title: "Backend & API Protocols",
        icon: Cpu,
        description: "Frameworks and protocols explored in various architectures.",
        skills: ["gRPC / Protobuf", "Echo & Chi (Go)", "Axum (Rust)", "Quarkus & Spring Boot", "GraphQL", "FastAPI", "NestJS"],
    },
    {
        title: "Messaging & Streaming",
        icon: Zap,
        description: "Event-driven asynchronous communication mechanisms.",
        skills: ["Apache Kafka", "RabbitMQ", "NATS", "Transactional Outbox", "Event-Driven Patterns"],
    },
    {
        title: "Databases & Storage",
        icon: Database,
        description: "Relational persistence, migrations, and caching layers.",
        skills: ["PostgreSQL", "Redis", "SQLC (Type-Safe)", "GORM / Sea-ORM", "Goose Migrations", "SQLite"],
    },
    {
        title: "Observability & Telemetry",
        icon: Activity,
        description: "Patterns practiced to gain visibility into running services.",
        skills: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger Tracing", "Loki", "Rate Limiting"],
    },
    {
        title: "Systems & Low-Level",
        icon: Binary,
        description: "Explorations into operating system interfaces and tracing.",
        skills: ["eBPF (BPF Syscall)", "Linux Kernel Tracing", "Ring Buffers", "Raw Sockets"],
    },
    {
        title: "Containerization & Tools",
        icon: Cloud,
        description: "Tooling used to containerize and test projects locally.",
        skills: ["Docker & Compose", "Kubernetes (Minikube)", "NGINX", "Linux CLI", "Git / GitHub"],
    },
    {
        title: "Applied Machine Learning",
        icon: Brain,
        description: "Projects built to explore ML workflows and model fundamentals.",
        skills: ["Rust ML from scratch", "MLflow", "ONNX Runtime", "PSI Feature Drift", "Scikit-Learn"],
    }
];

const AboutSec = ({ title, badge, children, delay }: { title: string; badge?: string; children: React.ReactNode; delay: string }) => {
    const { ref, isVisible } = useReveal();
    return (
        <section
            ref={ref}
            className={`space-y-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ transitionDelay: delay }}
        >
            <div className="flex flex-wrap items-center gap-3">
                <span className="inline-block size-4 border-2 border-ink bg-badge shadow-retro-sm" />
                <h2 className="text-xl font-black tracking-tighter text-foreground md:text-2xl">
                    {title}
                </h2>
                {badge && (
                    <span className="border-2 border-ink bg-badge px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-badge-ink shadow-retro-sm">
                        {badge}
                    </span>
                )}
            </div>
            <div className="pl-2 md:pl-7">{children}</div>
        </section>
    );
};

const About = () => {
    const { theme } = useTheme();
    const [copiedEmail, setCopiedEmail] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("renaldyhidayatt@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    return (
        <Layout maxWidth="w-full">
            <main className="mx-auto max-w-6xl px-6 py-20 pb-20 md:pb-16">
                {/* ── Hero Profile Header ── */}
                <header className="relative mb-20">
                    <div className="grid items-center gap-12 md:grid-cols-[260px_1fr]">
                        {/* Profile photo in brutalist retro paper frame */}
                        <div className="group animate-scale-in mx-auto max-w-[260px] md:mx-0">
                            <div className="retro-paper -rotate-2 p-3 transition-transform duration-300 group-hover:rotate-0">
                                <img
                                    src={theme.includes("dark") ? "/dark.png" : "/light.png"}
                                    alt="Renaldy Hidayat"
                                    className="aspect-square w-full border-2 border-ink object-cover grayscale-[0.15] transition-all duration-300 group-hover:grayscale-0"
                                />
                                <div className="mt-3 flex items-center justify-between border-t-2 border-ink pt-2 font-mono text-[11px] font-black uppercase text-muted-foreground">
                                    <span>SYSTEM_ID: RH-01</span>
                                    <span className="inline-flex items-center gap-1 text-primary">
                                        <span className="inline-block size-2 animate-ping rounded-full bg-primary" />
                                        AVAILABLE
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-2">
                            <div className="animate-slide-up space-y-3">
                                <div className="inline-flex items-center gap-2 border-2 border-ink bg-badge px-3 py-1 text-xs font-black tracking-wide text-badge-ink shadow-retro-sm">
                                    <Terminal className="h-3.5 w-3.5" />
                                    BACKEND & SYSTEMS ENGINEER
                                </div>
                                <h1 className="text-4xl font-black leading-tight tracking-tighter text-foreground md:text-6xl">
                                    Renaldy <br />
                                    <span className="retro-highlight mt-1 inline-block">Hidayat</span>
                                </h1>
                                <p className="text-lg font-bold text-muted-foreground md:text-xl leading-snug">
                                    Building and experimenting with software projects across backend infrastructure, systems programming, and applied AI.
                                </p>
                            </div>

                            {/* Quick Action Bar */}
                            <div className="animate-slide-up flex flex-wrap gap-3" style={{ animationDelay: '0.15s' }}>
                                <Link
                                    to="https://drive.google.com/file/d/1GOsA4vVKi7JXENMA3wY4hGT-epE6Lv0Y/preview"
                                    target="_blank"
                                    className="retro-btn group whitespace-nowrap"
                                >
                                    <FileText className="h-4 w-4 transition-transform group-hover:rotate-6" />
                                    Resume (PDF)
                                </Link>
                                <button
                                    onClick={handleCopyEmail}
                                    className="retro-btn retro-btn-secondary group whitespace-nowrap"
                                >
                                    {copiedEmail ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                                    <span>{copiedEmail ? "Email Copied!" : "renaldyhidayatt@gmail.com"}</span>
                                </button>
                                <Link
                                    to="https://linkedin.com/in/renaldyhidayatt"
                                    target="_blank"
                                    className="retro-btn retro-btn-secondary group whitespace-nowrap"
                                >
                                    <Linkedin className="h-4 w-4" />
                                    <span>LinkedIn</span>
                                </Link>
                                <Link
                                    to="https://github.com/renaldyhidayatt"
                                    target="_blank"
                                    className="retro-btn retro-btn-secondary group whitespace-nowrap"
                                >
                                    <Github className="h-4 w-4" />
                                    <span>GitHub</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── Key Metrics Strip ── */}
                    <div className="animate-fade-in mt-12 grid grid-cols-2 gap-4 md:grid-cols-4" style={{ animationDelay: '0.25s' }}>
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="retro-card group p-5 transition-transform duration-200 hover:-translate-y-1"
                            >
                                <div className="font-mono text-2xl font-black text-primary md:text-3xl">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-xs font-black tracking-tight text-foreground">
                                    {stat.label}
                                </div>
                                <div className="mt-0.5 text-[11px] text-muted-foreground">
                                    {stat.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </header>

                {/* ── Content Sections ── */}
                <div className="space-y-24">

                    {/* 1. About Me / Profile Overview */}
                    <AboutSec title="About Me" badge="Background" delay="0s">
                        <div className="retro-paper p-6 md:p-8 space-y-6">
                            <div className="border-b-2 border-ink pb-4">
                                <h3 className="text-xl md:text-2xl font-black text-foreground">
                                    Profile & Focus
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                                    A quick overview of what I focus on and what I’m currently looking for.
                                </p>
                            </div>

                            {/* Summary grid */}
                            <div className="grid gap-4 md:grid-cols-2">
                                {PROFILE_SUMMARY.map((item) => (
                                    <div key={item.title} className="border-2 border-ink bg-surface p-4 shadow-retro-sm">
                                        <div className="font-mono text-[11px] font-black uppercase text-primary mb-1">
                                            {item.title}
                                        </div>
                                        <p className="text-xs md:text-sm font-semibold leading-relaxed text-foreground">
                                            {item.content}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Grounded narrative statement */}
                            <div className="border-2 border-ink bg-accent-light p-5 shadow-retro-sm">
                                <p className="text-sm md:text-base font-medium leading-relaxed text-foreground">
                                    I’m early in my professional career, so most of my engineering experience comes from independent projects and self-study. Through these projects, I’ve built a portfolio of backend services, explored low-level tracing with eBPF, and documented my findings in technical case studies. I’m looking for an opportunity to join an engineering team where I can learn from experienced engineers and gradually take on more responsibility.
                                </p>
                            </div>
                        </div>
                    </AboutSec>

                    {/* 2. Engineering Approach */}
                    <AboutSec title="How I Approach Engineering" badge="Mindset" delay="0.1s">
                        <div className="space-y-4">
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                I like understanding how things work underneath the abstraction. Here are some of the principles that guide my projects and self-study:
                            </p>

                            <div className="grid gap-4 md:grid-cols-2">
                                {LEARNING_PILLARS.map((pillar) => (
                                    <div key={pillar.area} className="retro-card p-6 flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <div className="inline-block border border-ink bg-badge px-2 py-0.5 font-mono text-[10px] font-black uppercase text-badge-ink">
                                                {pillar.area}
                                            </div>
                                            <h3 className="text-base font-black text-foreground">
                                                {pillar.focus}
                                            </h3>
                                            <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AboutSec>

                    {/* 3. Areas of Exploration */}
                    <AboutSec title="Areas of Exploration" badge="Technical Areas" delay="0.15s">
                        <div className="grid gap-6 md:grid-cols-2">
                            {CORE_PILLARS.map((pillar) => {
                                const Icon = pillar.icon;
                                return (
                                    <div key={pillar.title} className="retro-card group flex flex-col justify-between p-7">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="grid size-11 place-items-center border-2 border-ink bg-accent-light shadow-retro-sm transition-transform duration-200 group-hover:-rotate-6">
                                                    <Icon className="h-6 w-6 text-foreground" />
                                                </span>
                                                <span className="border-2 border-ink bg-badge px-2.5 py-0.5 font-mono text-[11px] font-black uppercase text-badge-ink">
                                                    {pillar.badge}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black tracking-tight text-foreground">
                                                    {pillar.title}
                                                </h3>
                                                <p className="mt-1 font-mono text-xs font-bold text-primary">
                                                    {pillar.headline}
                                                </p>
                                            </div>
                                            <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
                                                {pillar.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 border-t-2 border-ink pt-4">
                                            <div className="mb-4 space-y-1.5">
                                                {pillar.proofPoints.map((point) => (
                                                    <div key={point} className="flex items-start gap-2 font-mono text-xs text-foreground">
                                                        <span className="font-bold text-primary">▸</span>
                                                        <span>{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link
                                                to={pillar.link}
                                                className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-foreground hover:text-primary transition-colors mt-2"
                                            >
                                                <span>View Project Details</span>
                                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </AboutSec>

                    {/* 4. Selected Projects */}
                    <AboutSec title="Selected Projects" badge="Portfolio Highlights" delay="0.2s">
                        <div className="grid gap-5 sm:grid-cols-2">
                            {SELECTED_PROJECTS.map((project) => (
                                <Link
                                    key={project.title}
                                    to={project.link}
                                    className="retro-panel group block p-6 transition-all duration-200 hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="border border-ink bg-badge px-2 py-0.5 font-mono text-[10px] font-black uppercase text-badge-ink">
                                            {project.tag}
                                        </span>
                                        <span className="border border-ink bg-accent-light px-2 py-0.5 font-mono text-[10px] font-black text-foreground">
                                            {project.stat}
                                        </span>
                                    </div>
                                    <h3 className="mt-3 text-base font-black text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                                        <span>{project.title}</span>
                                        <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110 group-hover:text-primary" />
                                    </h3>
                                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                        {project.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/portfolio" className="retro-btn inline-flex items-center gap-2">
                                <Layers className="h-4 w-4" />
                                View All Portfolio Projects
                            </Link>
                            <Link to="/blog" className="retro-btn retro-btn-secondary inline-flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Read Technical Case Studies
                            </Link>
                        </div>
                    </AboutSec>

                    {/* 5. Complete Technology Stack Matrix */}
                    <AboutSec title="Technologies & Tools" badge="Technical Stack" delay="0.25s">
                        <div className="space-y-6">
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                                Technologies I have actively worked with through my projects, experiments, and technical notes:
                            </p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {SKILL_CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <div
                                            key={cat.title}
                                            className="retro-card group flex flex-col justify-between p-5"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="grid size-9 shrink-0 place-items-center border-2 border-ink bg-accent-light shadow-retro-sm transition-transform duration-200 group-hover:-rotate-6">
                                                        <Icon className="h-4 w-4 text-foreground" />
                                                    </span>
                                                    <h3 className="text-sm font-black tracking-tight text-foreground">
                                                        {cat.title}
                                                    </h3>
                                                </div>
                                                <p className="text-[11px] font-medium leading-relaxed text-muted-foreground">
                                                    {cat.description}
                                                </p>
                                            </div>
                                            <div className="mt-4 flex flex-wrap gap-1 border-t-2 border-ink pt-3">
                                                {cat.skills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="border border-ink bg-surface px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground transition-colors duration-150 hover:bg-accent-light hover:text-foreground"
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
                </div>
            </main>
        </Layout>
    );
};

export default About;
