import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { getCertificate, certificateUrl } from "@/data/certificates";
import { ArrowLeft, ExternalLink, Download, FileText, ShieldCheck } from "lucide-react";

const SertifikatDetail = () => {
    const { slug } = useParams();
    const cert = getCertificate(slug);

    if (!cert) {
        return (
            <Layout maxWidth="max-w-3xl">
                <div className="py-24 text-center space-y-6">
                    <span className="inline-grid size-16 place-items-center border-2 border-ink bg-surface shadow-retro-sm mx-auto">
                        <FileText className="size-8 text-muted-foreground" />
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">
                        Sertifikat tidak ditemukan
                    </h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Sertifikat yang kamu cari tidak ada atau sudah dipindahkan.
                    </p>
                    <Link to="/sertifikat" className="retro-btn retro-btn-secondary inline-flex items-center gap-2 text-xs">
                        <ArrowLeft className="size-4" />
                        Kembali ke daftar sertifikat
                    </Link>
                </div>
            </Layout>
        );
    }

    const Icon = cert.icon;
    const href = certificateUrl(cert);

    return (
        <Layout maxWidth="max-w-5xl">
            <div className="pt-8">
                <Link
                    to="/sertifikat"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    All certificates
                </Link>
            </div>

            <header className="py-8 md:py-10 space-y-6">
                <div className="flex items-start gap-4">
                    <span className="grid size-14 shrink-0 place-items-center border-2 border-ink bg-badge text-badge-ink shadow-retro-sm">
                        <Icon className="size-7" />
                    </span>
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="retro-badge">credential</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground border-2 border-ink px-2 py-1 bg-surface">
                                {cert.year}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground leading-none">
                            {cert.title}
                        </h1>
                        <p className="text-sm md:text-base font-bold text-muted-foreground">
                            Issued by {cert.issuer}
                        </p>
                    </div>
                </div>

                <p className="max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                    {cert.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="retro-btn inline-flex items-center gap-2 text-xs"
                    >
                        <ExternalLink className="size-4" />
                        Open PDF in new tab
                    </a>
                    <a
                        href={href}
                        download={cert.file}
                        className="retro-btn retro-btn-secondary inline-flex items-center gap-2 text-xs"
                    >
                        <Download className="size-4" />
                        Download PDF
                    </a>
                </div>
            </header>

            <section className="mb-10">
                <div className="mb-3 flex items-center gap-3">
                    <ShieldCheck className="size-4 text-primary" />
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Document preview
                    </h2>
                    <div className="h-[2px] flex-1 bg-border" />
                </div>

                <div className="retro-card overflow-hidden">
                    <object data={href} type="application/pdf" className="block w-full h-[70vh] md:h-[80vh]">
                        <div className="p-8 text-center space-y-4">
                            <FileText className="size-10 mx-auto text-muted-foreground" />
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                                Browser kamu tidak bisa menampilkan PDF langsung di halaman ini.
                                Buka di tab baru atau unduh filenya lewat tombol di atas.
                            </p>
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-btn retro-btn-secondary inline-flex items-center gap-2 text-xs"
                            >
                                <ExternalLink className="size-4" />
                                Open PDF in new tab
                            </a>
                        </div>
                    </object>
                </div>
            </section>
        </Layout>
    );
};

export default SertifikatDetail;
