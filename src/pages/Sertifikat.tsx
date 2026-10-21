import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import Layout from "@/components/Layout";
import {
    ShieldCheck,
    ShieldAlert,
    Swords,
    Award,
    ExternalLink,
    Download,
    FileText,
} from "lucide-react";

type Certificate = {
    file: string;
    title: string;
    issuer: string;
    year: string;
    icon: typeof Award;
};

const CERTIFICATES: Certificate[] = [
    {
        file: "blue-team_renaldyhidayat.pdf",
        title: "Blue Team Operations",
        issuer: "Security Training Program",
        year: "2026",
        icon: ShieldCheck,
    },
    {
        file: "ethical-hacking.pdf",
        title: "Ethical Hacking",
        issuer: "Offensive Security Track",
        year: "2026",
        icon: ShieldAlert,
    },
    {
        file: "redteam.pdf",
        title: "Red Team Engagements",
        issuer: "Adversary Simulation",
        year: "2026",
        icon: Swords,
    },
    {
        file: "RenaldyHidayat-CN1PMA202201-certificate-cisco.pdf",
        title: "CCNA 1",
        issuer: "Cisco Networking Academy",
        year: "2022",
        icon: Award,
    },
    {
        file: "RenaldyHidayat-CN2AZY202201-certificate_cisco.pdf",
        title: "CCNA 2",
        issuer: "Cisco Networking Academy",
        year: "2023",
        icon: Award,
    },
];

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
    const { ref, isVisible } = useReveal({ threshold: 0.1 });
    const Icon = cert.icon;
    const href = "/sertifikat/" + cert.file;

    const cardClass =
        "group h-full transition-[transform,opacity] duration-500 transform-gpu " +
        (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8");

    return (
        <div ref={ref} className={cardClass} style={{ transitionDelay: (index % 3) * 80 + "ms" }}>
            <article className="retro-card relative h-full p-5 flex flex-col justify-between overflow-hidden">
                <div className="relative flex items-start justify-between gap-3 mb-4">
                    <span className="grid size-12 place-items-center border-2 border-ink bg-badge text-badge-ink shadow-retro-sm">
                        <Icon className="size-6" />
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-2 border-ink px-2 py-1 bg-surface">
                        {cert.year}
                    </span>
                </div>

                <div className="relative flex-1 flex flex-col">
                    <h2 className="text-lg font-black tracking-tight text-foreground leading-snug">
                        {cert.title}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {cert.issuer}
                    </p>

                    <div className="pt-4 mt-4 flex items-center gap-2 border-t-2 border-ink">
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="retro-btn retro-btn-secondary inline-flex flex-1 items-center justify-center gap-2 text-xs"
                        >
                            <ExternalLink className="size-4" />
                            View
                        </a>
                        <a
                            href={href}
                            download
                            className="retro-btn inline-flex items-center justify-center gap-2 text-xs"
                            aria-label={"Download " + cert.title}
                        >
                            <Download className="size-4" />
                        </a>
                    </div>
                </div>
            </article>
        </div>
    );
};

const Sertifikat = () => {
    return (
        <Layout maxWidth="max-w-5xl">
            <header className="py-12 md:py-16 space-y-6">
                <div className="flex items-center gap-3">
                    <span className="retro-badge">credentials</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-2 border-ink px-2 py-1 bg-surface">
                        {CERTIFICATES.length} files
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground leading-none">
                    Sertifikat
                </h1>
                <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                    A collection of certifications and training credentials covering cybersecurity,
                    offensive &amp; defensive operations, and networking. Open any certificate to view
                    the full document or download it for your records.
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {CERTIFICATES.map((cert, index) => (
                    <CertificateCard key={cert.file} cert={cert} index={index} />
                ))}
            </section>

            <footer className="mt-10 flex items-center gap-3 border-2 border-ink bg-surface p-4 shadow-retro-sm">
                <FileText className="size-5 text-primary" />
                <p className="text-xs md:text-sm text-muted-foreground">
                    Certificates are stored locally and served as PDF documents.{" "}
                    <Link to="/about" className="font-black text-primary underline underline-offset-2">
                        Back to about
                    </Link>
                </p>
            </footer>
        </Layout>
    );
};

export default Sertifikat;
