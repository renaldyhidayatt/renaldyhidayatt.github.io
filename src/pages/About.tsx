import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";

const About = () => {
    const { theme } = useTheme();

    return (
        <Layout>
            <main className="max-w-3xl mx-auto px-6 py-12 pb-20 md:pb-0">
                <header className="mb-16">
                    <div className="md:grid md:grid-cols-[auto_1fr] md:gap-8 items-center">
                        <img
                            src={theme === "dark" ? "/dark.png" : "/light.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                        />
                        <div className="mt-6 md:mt-0">
                            <h1 className="text-3xl font-serif font-light text-primary mb-2">
                                About Me
                            </h1>
                            <p className="text-lg text-muted-foreground font-light mb-4">
                                Backend engineer with a focus on system reliability, scalability,
                                and maintainable architecture.
                            </p>
                            <Link
                                to="https://drive.google.com/file/d/1EVEu6ileCpoY0L-FF_zcg33y-PsggsRa/preview"
                                target="_blank"
                                className="inline-block px-4 py-2 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/80 transition"
                            >
                                View CV
                            </Link>
                        </div>
                    </div>
                </header>

                <section className="space-y-12">
                    <div>
                        <h2 className="text-xl font-serif text-primary mb-4">Background</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                My name is Renaldy Hidayat. I am a software engineer specializing
                                in backend development, with experience designing and building
                                services that operate reliably in production environments.
                            </p>
                            <p>
                                My work focuses on clear system boundaries, well-defined APIs,
                                and architectures that remain understandable and maintainable
                                as complexity grows.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-serif text-primary mb-4">Professional Interests</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                I am particularly interested in backend and distributed systems
                                where performance, reliability, and operational visibility are
                                critical.
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Backend system design and service-oriented architecture</li>
                                <li>Distributed and event-driven systems</li>
                                <li>Message brokers and streaming platforms</li>
                                <li>Observability, monitoring, and tracing in production</li>
                                <li>Building internal tools to support engineering teams</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-serif text-primary mb-4">Technical Skills</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                I work across multiple programming languages and platforms,
                                selecting technologies based on suitability rather than trends.
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Golang, Rust, Java, Python, PHP, TypeScript</li>
                                <li>REST, gRPC, and GraphQL APIs</li>
                                <li>Kafka, RabbitMQ, Redis</li>
                                <li>PostgreSQL, MySQL, MongoDB</li>
                                <li>Docker, Kubernetes, Prometheus, OpenTelemetry</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-serif text-primary mb-4">Current Focus</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Currently, I am focused on improving backend reliability through
                                better observability, performance tuning, and architectural
                                refinement for services operating under load.
                            </p>
                            <p>
                                I also continue to explore new tools and approaches by building
                                small-scale internal systems, dashboards, and command-line utilities.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-serif text-primary mb-4">Engineering Approach</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                I approach software engineering with an emphasis on practicality
                                and long-term impact. Design decisions are guided by real-world
                                constraints, not idealized assumptions.
                            </p>
                            <p>
                                I value continuous improvement through building, measuring,
                                and refining systems, and I aim to share knowledge when it can
                                help teams make better technical decisions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default About;

