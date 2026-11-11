import React, { useMemo, useState } from "react";
import { Copy, Check, Eye, Code, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { render } from "pele";

interface MermaidBlockProps {
  chart: string;
  rawChildren?: React.ReactNode;
}

export const MermaidBlock: React.FC<MermaidBlockProps> = ({ chart, rawChildren }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"diagram" | "code">("diagram");
  const [scale, setScale] = useState(1);

  // Render diagram synchronously using Pele
  const renderResult = useMemo(() => {
    const trimmed = chart.trim();
    if (!trimmed) return null;
    try {
      const res = render(trimmed);
      return { success: true, svg: res.svg, type: res.type || "diagram" };
    } catch (err: any) {
      console.warn("Pele diagram render error:", err);
      return {
        success: false,
        error: err?.message || String(err),
        snippet: err?.snippet || "",
      };
    }
  }, [chart]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy mermaid code:", err);
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));
  const zoomReset = () => setScale(1);

  const isFailed = renderResult && !renderResult.success;
  const activeView = isFailed ? "code" : viewMode;

  return (
    <div
      style={{
        position: "relative",
        margin: "2.5rem 0",
        border: "2px solid hsl(var(--border))",
        boxShadow: "5px 5px 0 hsl(var(--border))",
        background: "hsl(var(--card))",
        overflow: "hidden",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          padding: "0.45rem 0.85rem",
          background: "hsl(var(--foreground))",
          color: "hsl(var(--background))",
          borderBottom: "2px solid hsl(var(--border))",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 900,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              padding: "2px 6px",
              border: "1.5px solid hsl(var(--border))",
            }}
          >
            MERMAID
          </span>
          {renderResult?.success && renderResult.type && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.85,
              }}
            >
              {renderResult.type}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          {!isFailed && (
            <>
              {/* Toggle Diagram / Code */}
              <div
                style={{
                  display: "flex",
                  border: "1px solid hsl(var(--background) / 0.3)",
                  padding: "1px",
                  background: "hsl(var(--foreground))",
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("diagram")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "2px 6px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeView === "diagram" ? "hsl(var(--background))" : "transparent",
                    color:
                      activeView === "diagram" ? "hsl(var(--foreground))" : "hsl(var(--background))",
                  }}
                  title="View Rendered Diagram"
                >
                  <Eye style={{ width: "11px", height: "11px" }} />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("code")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "2px 6px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      activeView === "code" ? "hsl(var(--background))" : "transparent",
                    color:
                      activeView === "code" ? "hsl(var(--foreground))" : "hsl(var(--background))",
                  }}
                  title="View Mermaid Syntax"
                >
                  <Code style={{ width: "11px", height: "11px" }} />
                  <span>Code</span>
                </button>
              </div>

              {/* Zoom controls for diagram view */}
              {activeView === "diagram" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    borderLeft: "1px solid hsl(var(--background) / 0.3)",
                    paddingLeft: "0.4rem",
                    marginLeft: "0.2rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={zoomIn}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "hsl(var(--background))",
                      cursor: "pointer",
                      padding: "2px",
                      display: "flex",
                    }}
                    title="Zoom in"
                    aria-label="Zoom in"
                  >
                    <ZoomIn style={{ width: "12px", height: "12px" }} />
                  </button>
                  <button
                    type="button"
                    onClick={zoomOut}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "hsl(var(--background))",
                      cursor: "pointer",
                      padding: "2px",
                      display: "flex",
                    }}
                    title="Zoom out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut style={{ width: "12px", height: "12px" }} />
                  </button>
                  {scale !== 1 && (
                    <button
                      type="button"
                      onClick={zoomReset}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "hsl(var(--background))",
                        cursor: "pointer",
                        padding: "2px",
                        display: "flex",
                      }}
                      title="Reset zoom"
                      aria-label="Reset zoom"
                    >
                      <RotateCcw style={{ width: "11px", height: "11px" }} />
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Copy button */}
          <button
            type="button"
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
            aria-label="Copy Mermaid syntax"
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
      </div>

      {/* Body */}
      {activeView === "diagram" && renderResult?.success ? (
        <div
          className="pele-diagram-wrapper custom-scrollbar"
          style={{
            overflowX: "auto",
            padding: "1.5rem",
            background: "hsl(var(--card))",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "140px",
          }}
        >
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              transition: "transform 120ms ease-out",
              maxWidth: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            dangerouslySetInnerHTML={{ __html: renderResult.svg }}
          />
        </div>
      ) : (
        <div style={{ background: "var(--terminal-background, #1f261c)" }}>
          {isFailed && (
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "hsl(var(--destructive) / 0.15)",
                borderBottom: "1px solid hsl(var(--border))",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "hsl(var(--foreground))",
              }}
            >
              <span style={{ fontWeight: 900, color: "hsl(var(--destructive))" }}>
                SYNTAX WARNING:
              </span>{" "}
              {renderResult.error}
            </div>
          )}
          {rawChildren ? (
            <pre
              className="custom-scrollbar"
              style={{
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
              {rawChildren}
            </pre>
          ) : (
            <pre
              className="custom-scrollbar"
              style={{
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
              <code>{chart.trim()}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default MermaidBlock;

