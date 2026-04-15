import { useRef, useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLDivElement>(null);

    const language = className?.replace("language-", "") || "";

    const handleCopy = async () => {
        try {
            const text = codeRef.current?.innerText ?? "";
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    // Inline code (no language class)
    if (!className) {
        return (
            <code className="px-1.5 py-0.5 rounded-md bg-accent text-primary font-mono text-[0.875em] font-medium border border-border/60">
                {children}
            </code>
        );
    }

    return (
        <div className="relative group my-8 rounded-2xl overflow-hidden border border-border/60 shadow-sm">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-card border-b border-border/60">
                <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                    {language && (
                        <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-green-500" />
                            <span className="font-medium">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="font-medium">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code body */}
            <div
                ref={codeRef}
                className="block overflow-x-auto p-5 bg-[hsl(var(--card)/0.6)] text-foreground text-[13px] leading-relaxed font-mono whitespace-pre custom-scrollbar"
            >
                {children}
            </div>
        </div>
    );
};

export default CodeBlock;
