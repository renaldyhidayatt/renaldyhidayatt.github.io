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
        <div className="relative group my-8 rounded-lg overflow-hidden border border-[#3c3c3c] bg-[#1e1e1e] shadow-md">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#cccccc]" />
                    {language && (
                        <span className="text-[12px] font-mono text-[#cccccc] uppercase tracking-wider">
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-[#cccccc] hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-[#3c3c3c]"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 text-green-500" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3" />
                            <span className="group-hover:opacity-100 opacity-80">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code body */}
            <pre
                ref={codeRef}
                className={`block overflow-x-auto p-4 text-[#d4d4d4] text-[14px] leading-relaxed font-mono whitespace-pre custom-scrollbar selection:bg-[#264f78] ${className || ""}`}
                {...props}
                style={{ ...props.style, backgroundColor: "transparent" }}
            >
                {children}
            </pre>
        </div>
    );
};

export default CodeBlock;
