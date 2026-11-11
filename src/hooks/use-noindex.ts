import { useEffect } from "react";

const ROBOTS_META = 'meta[name="robots"]';
const TITLE = "Page not found — Renaldy Hidayat";

/**
 * Marks the current document as non-indexable while it is mounted.
 *
 * The site is a client-rendered SPA, so a 404 route still answers with HTTP 200.
 * Without this a crawler would index the not-found page as a real one.
 */
export function useNoindex() {
    useEffect(() => {
        const previousTitle = document.title;
        const existing = document.querySelector<HTMLMetaElement>(ROBOTS_META);

        if (existing) {
            existing.content = "noindex";
        } else {
            const meta = document.createElement("meta");
            meta.name = "robots";
            meta.content = "noindex";
            document.head.appendChild(meta);
        }

        document.title = TITLE;

        return () => {
            document.title = previousTitle;
            if (existing) {
                existing.remove();
            } else {
                document.querySelector(ROBOTS_META)?.remove();
            }
        };
    }, []);
}
