import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
    children: React.ReactNode;
    className?: string;
}

const CodeBlock = ({ children, className }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLDivElement>(null);

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
        <div className={`relative group ${className || ""}`}>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity 
                       bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>

            <div
                ref={codeRef}
                className="block overflow-x-auto p-4 bg-gray-800 text-gray-300 text-sm rounded-md font-mono whitespace-pre"
            >
                {children}
            </div>
        </div>
    );
};

export default CodeBlock;
