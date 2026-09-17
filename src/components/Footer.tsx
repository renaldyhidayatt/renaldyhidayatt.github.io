import { Mail, Github, Linkedin, Send, ArrowUpRight, ArrowUp, Terminal, FileText } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const Footer = () => {
    const year = new Date().getFullYear();
    const { ref, isVisible } = useReveal();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const socialLinks = [
        {
            icon: Github,
            href: "https://github.com/renaldyhidayatt",
            label: "GitHub",
        },
        {
            icon: Linkedin,
            href: "https://linkedin.com/in/renaldyhidayatt",
            label: "LinkedIn",
        },
        {
            icon: Mail,
            href: "mailto:renaldyhidayatt@gmail.com",
            label: "Email",
        },
        {
            icon: Send,
            href: "https://t.me/QuickHandle",
            label: "Telegram",
        },
    ];

    return (
        <footer className="relative mt-32 overflow-hidden pb-12">
            <div className="mx-auto max-w-6xl px-6">
                {/* CTA panel */}
                <div
                    ref={ref}
                    className={`retro-paper relative mb-16 p-8 text-center transition-[transform,opacity] duration-700 md:p-12 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                >
                    <div className="relative mx-auto max-w-2xl space-y-4">
                        {/* Status badge */}
                        <div className="inline-flex items-center gap-2 border-2 border-ink bg-badge px-3 py-1 font-mono text-xs font-bold text-badge-ink shadow-retro-sm">
                            <Terminal className="h-3.5 w-3.5" />
                            <span>STATUS: OPEN TO ENGINEERING OPPORTUNITIES</span>
                        </div>

                        <h2 className="text-2xl font-black tracking-tight text-foreground md:text-3xl lg:text-4xl">
                            Looking for a team to <br className="hidden sm:inline" />
                            learn, build, and contribute.
                        </h2>

                        <p className="mx-auto max-w-lg text-xs leading-relaxed text-muted-foreground md:text-sm">
                            Fresh graduate focused on backend and systems engineering through hands-on projects and self-study.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <a
                                href="https://drive.google.com/file/d/1GOsA4vVKi7JXENMA3wY4hGT-epE6Lv0Y/preview"
                                target="_blank"
                                rel="noreferrer"
                                className="retro-btn retro-btn-secondary group"
                            >
                                <FileText className="h-4 w-4" />
                                <span>View Resume</span>
                            </a>
                            <a
                                href="mailto:renaldyhidayatt@gmail.com?subject=Engineering%20Opportunity%20-%20Renaldy%20Hidayat"
                                className="retro-btn group"
                            >
                                <Mail className="h-4 w-4" />
                                <span>Get in Touch</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-6 border-t-2 border-ink pt-8 md:flex-row">
                    <div className="space-y-1.5 text-center md:text-left">
                        <p className="flex items-center justify-center gap-1 text-lg font-black tracking-tight text-foreground md:justify-start">
                            Renaldy<span className="text-primary">.</span>Hidayat
                            <span className="retro-badge-neutral ml-2">v2.0</span>
                        </p>
                        <p className="text-[11px] font-medium tracking-wide text-muted-foreground">
                            © {year} • Engineered with precision & craft
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                className="grid size-11 place-items-center border-2 border-ink bg-surface text-muted-foreground shadow-retro-sm transition-all duration-150 hover:-translate-y-1 hover:bg-accent-light hover:text-foreground hover:shadow-retro"
                            >
                                <link.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>

                    {/* Back to top button */}
                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="retro-btn retro-btn-secondary group !px-4 !py-2"
                        aria-label="Back to top"
                    >
                        <span>Back to top</span>
                        <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
