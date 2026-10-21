import { Link } from "react-router-dom";
import { BookMarked, ArrowRight } from "lucide-react";

/**
 * Call-to-action banner for the Cheatsheet section — placed in the Blog & Portfolio page headers.
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
                pinned versions &middot; verified snippets
            </span>
            <ArrowRight className="h-3.5 w-3.5 text-badge-ink transition-transform group-hover:translate-x-0.5" />
        </Link>
    );
};

export default CheatsheetBanner;
