import { Mail, Github, Linkedin, Send, MessageSquare, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const Footer = () => {
    const year = new Date().getFullYear();
    const { ref, isVisible } = useReveal();

    const socialLinks = [
        { 
            icon: Github, 
            href: "https://github.com/renaldyhidayatt", 
            label: "GitHub",
            color: "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        },
        { 
            icon: Linkedin, 
            href: "https://linkedin.com/in/renaldyhidayatt", 
            label: "LinkedIn",
            color: "hover:text-[#0077B5] hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.5)]"
        },
        { 
            icon: Mail, 
            href: "mailto:renaldyhidayatt@gmail.com", 
            label: "Email",
            color: "hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
        },
        { 
            icon: Send, 
            href: "https://t.me/QuickHandle", 
            label: "Telegram",
            color: "hover:text-[#229ED9] hover:drop-shadow-[0_0_8px_rgba(34,158,217,0.5)]"
        },
    ];

    return (
        <footer className="relative mt-32 pb-12 overflow-hidden">
            {/* Background cinematic glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-150" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/5 blur-[120px] -z-10 rounded-full" />

            <div className="max-w-6xl mx-auto px-6">
                {/* CTA Section */}
                <div 
                    ref={ref}
                    className={`glass-strong rounded-[40px] p-12 mb-20 border border-primary/10 transition-[transform,opacity] duration-1000 transform-gpu text-center relative overflow-hidden group ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    }`}
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                            <MessageSquare className="w-3 h-3" />
                            Next Project
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground max-w-3xl mx-auto leading-tight">
                            Got a <span className="text-primary italic">vision?</span> Let's build the future together.
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <a 
                                href="mailto:renaldyhidayatt@gmail.com"
                                className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 group"
                            >
                                Start a Conversation
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-border/40">
                    <div className="space-y-2 text-center md:text-left">
                        <p className="text-xl font-black tracking-tighter text-foreground">
                            Renaldy<span className="text-primary">.</span>Hidayat
                        </p>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            © {year} All Rights Reserved
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                className={`text-muted-foreground transition-all duration-300 transform hover:scale-125 ${link.color}`}
                            >
                                <link.icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>

                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-muted-foreground leading-relaxed italic">
                            Building better systems,<br />one byte at a time.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
