import { Mail, Github, Linkedin, Send } from "lucide-react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="hidden md:block border-t border-border mt-24">
            <div className="max-w-3xl mx-auto px-6 py-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-5">
                        <a
                            href="mailto:renaldyhidayatt@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Email"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Mail className="h-5 w-5" />
                        </a>

                        <a
                            href="https://github.com/renaldyhidayatt"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </a>

                        <a
                            href="https://linkedin.com/in/renaldyhidayatt"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                        </a>

                        <a
                            href="https://t.me/QuickHandle"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Telegram"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Send className="h-5 w-5" />
                        </a>
                    </div>

                    <div className="h-px w-24 bg-border" />

                    <p className="text-sm text-muted-foreground">
                        © {year} Renaldy Hidayat. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
