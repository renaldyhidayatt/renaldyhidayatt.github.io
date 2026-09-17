import { useRef, useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

const CodeBlock = ({ children, className, ...props }: any) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLPreElement>(null);

    // Try to find the language from children (which is the <code> element output by rehype)
    let language = "";
    if (children?.props?.["data-language"]) {
        language = children.props["data-language"];
    } else if (children?.props?.className?.startsWith("language-")) {
        language = children.props.className.replace("language-", "");
    } else if (className?.startsWith("language-")) {
        language = className.replace("language-", "");
    }

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

    return (
        <div
            style={{
                position: "relative",
                margin: "2rem 0",
                border: "2px solid hsl(var(--border))",
                boxShadow: "4px 4px 0 hsl(var(--border))",
                overflow: "hidden",
                background: "var(--terminal-background, #1f261c)",
            }}
        >
            {/* Header bar */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.4rem 0.85rem",
                    background: "hsl(var(--foreground))",
                    borderBottom: "2px solid hsl(var(--border))",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Terminal style={{ width: "14px", height: "14px", color: "hsl(var(--background))", flexShrink: 0 }} />
                    {language && (
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                fontWeight: 900,
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                color: "hsl(var(--background))",
                            }}
                        >
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "hsl(var(--background))",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px 6px",
                        outline: "none",
                    }}
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check style={{ width: "12px", height: "12px" }} />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy style={{ width: "12px", height: "12px" }} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code body */}
            <pre
                ref={codeRef}
                className={`custom-scrollbar ${className || ""}`}
                {...props}
                style={{
                    ...props.style,
                    display: "block",
                    overflowX: "auto",
                    padding: "1.1rem 1.25rem",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-mono)",
                    whiteSpace: "pre",
                    color: "var(--terminal-text, #d9e3b8)",
                    background: "transparent",
                    margin: 0,
                }}
            >
                {children}
            </pre>
        </div>
    );
};

export default CodeBlock;
