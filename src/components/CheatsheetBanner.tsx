import { Link } from "react-router-dom";
import { BookMarked, ArrowRight } from "lucide-react";

/**
 * Banner ajakan ke section Cheatsheet — ditaruh di header halaman Blog & Portfolio.
 */
const CheatsheetBanner = () => {
    return (
        <Link
            to="/cheatsheet"
            className="group inline-flex items-center gap-3 border-2 border-ink bg-badge px-4 py-2 font-mono shadow-retro-sm transition-all hover:-translate-y-0.5 hover:shadow-retro"
        >
            <BookMarked className="h-4 w-4 text-badge-ink" />
            <span className="text-[10px] font-black uppercase tracking-widest text-badge-ink">
                Cheatsheet
            </span>
            <span className="hidden text-[10px] font-mono text-badge-ink/70 sm:inline">
                versi terkunci &middot; snippet terverifikasi
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-badge-ink transition-transform group-hover:translate-x-0.5" />
        </Link>
    );
};

export default CheatsheetBanner;
