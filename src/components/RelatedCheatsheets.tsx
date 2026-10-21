import { Link } from "react-router-dom";
import { BookMarked, Flame } from "lucide-react";
import { relatedCheatsheets } from "@/utils/mdx";

interface Props {
    tags?: string[];
    title?: string;
    limit?: number;
}

/**
 * Blok "Related Cheatsheets" — dipakai di halaman detail Blog & Portfolio.
 * Skor relevansi = jumlah tag yang sama antara konten dan cheatsheet.
 */
const RelatedCheatsheets = ({ tags = [], title = "Related Cheatsheets", limit = 3 }: Props) => {
    const sheets = relatedCheatsheets(tags, limit);
    if (sheets.length === 0) return null;

    return (
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <span
                    className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5"
                    style={{
                        border: "2px solid hsl(var(--border))",
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                    }}
                >
                    <span className="inline-flex items-center gap-1.5">
                        <BookMarked className="w-3 h-3" />
                        {title}
                    </span>
                </span>
                <div className="h-[2px] flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {sheets.map((sheet: any) => (
                    <Link
                        key={sheet.slug}
                        to={`/cheatsheet/${sheet.slug}`}
                        className="group block p-5 bg-card transition-all duration-150 hover:-translate-y-0.5"
                        style={{ border: "2px solid hsl(var(--border))", boxShadow: "3px 3px 0 hsl(var(--border))" }}
                    >
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                                {sheet.version && (
                                    <span
                                        className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-primary text-primary-foreground"
                                        style={{ border: "1.5px solid hsl(var(--border))", fontFamily: "var(--font-mono)" }}
                                    >
                                        {sheet.version}
                                    </span>
                                )}
                                {sheet.status === "verified" && (
                                    <span
                                        className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-secondary text-secondary-foreground inline-flex items-center gap-1"
                                        style={{ border: "1.5px solid hsl(var(--border))", fontFamily: "var(--font-mono)" }}
                                    >
                                        <Flame className="w-2.5 h-2.5" />
                                        Verified
                                    </span>
                                )}
                            </div>

                            <h3
                                className="text-base font-black text-foreground line-clamp-2 uppercase group-hover:text-primary transition-colors"
                                style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem" }}
                            >
                                {sheet.title}
                            </h3>

                            <p
                                className="text-[12px] text-muted-foreground line-clamp-3 leading-relaxed"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {sheet.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedCheatsheets;
