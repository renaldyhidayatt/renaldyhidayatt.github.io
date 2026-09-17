import React, {
  Component,
  StrictMode,
  useEffect,
  useState,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application render error", error, info.componentStack);
  }

  handleReload = () => window.location.reload();

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <section
          className="retro-card w-full max-w-xl p-8 text-center"
          role="alert"
        >
          <p className="retro-badge mx-auto mb-5">
            runtime recovery mode
          </p>
          <h1 className="mb-3 text-2xl font-black tracking-tight">
            The interface hit an unexpected state.
          </h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Refresh the app to recover the latest portfolio shell. Your route and saved theme are preserved.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="retro-btn"
          >
            Reload application
          </button>
        </section>
      </main>
    );
  }
}

// ── ScrollProgress ─────────────────────────────────────────────────────────
// Solid brutalist bar pinned to the top edge
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(Math.max(next, 0), 1));
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[110] h-[6px] origin-left bg-badge"
      style={{
        transform: `scaleX(${progress})`,
        boxShadow: "0 3px 0 var(--shadow)",
      }}
      aria-hidden="true"
    />
  );
}

function GlobalInteractionLayer() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      root.dataset.motion = reducedMotion.matches ? "reduced" : "full";
    };

    const markKeyboardNavigation = (event: KeyboardEvent) => {
      if (["Tab", "Enter", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        root.dataset.input = "keyboard";
      }
    };

    const markPointerNavigation = () => {
      root.dataset.input = "pointer";
    };

    syncMotionPreference();

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", syncMotionPreference);
    } else {
      reducedMotion.addListener(syncMotionPreference);
    }
    window.addEventListener("keydown", markKeyboardNavigation, { passive: true });
    window.addEventListener("pointerdown", markPointerNavigation, { passive: true });

    return () => {
      if (typeof reducedMotion.removeEventListener === "function") {
        reducedMotion.removeEventListener("change", syncMotionPreference);
      } else {
        reducedMotion.removeListener(syncMotionPreference);
      }
      window.removeEventListener("keydown", markKeyboardNavigation);
      window.removeEventListener("pointerdown", markPointerNavigation);
    };
  }, []);

  return null;
}

// ── BootHandoff ────────────────────────────────────────────────────────────
// Retro terminal boot sequence
function BootHandoff() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 0 : 4200;
    let frame = 0;
    let hideTimeout: number | undefined;

    const finish = () => {
      setProgress(100);
      if (reducedMotion) {
        setVisible(false);
        return;
      }
      setExiting(true);
      hideTimeout = window.setTimeout(() => setVisible(false), 400);
    };

    const tick = (now: number) => {
      if (duration === 0) {
        finish();
        return;
      }

      const raw = (now - startedAt) / duration;
      const eased = raw < 1 ? 1 - Math.pow(1 - raw, 3) : 1;
      const nextProgress = Math.min(eased * 100, 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (hideTimeout !== undefined) window.clearTimeout(hideTimeout);
    };
  }, []);

  if (!visible) return null;

  const stage =
    progress < 22 ? 0 :
    progress < 48 ? 1 :
    progress < 72 ? 2 :
    progress < 90 ? 3 : 4;

  const messages = [
    "initializing retro engine",
    "loading experiences & systems",
    "rendering stories & code",
    "polishing the pixels",
    "ready to ship · · ·",
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background px-4 transition-all ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
      style={{ transition: "opacity 0.4s ease" }}
    >
      <div className="w-[min(480px,calc(100%-0px))]">
        <div className="retro-terminal">
          <div className="retro-terminal-bar">
            <i />
            <i />
            <i />
            <span>renaldy@portfolio:~$</span>
          </div>

          <div className="relative z-20 min-h-[132px] space-y-2 p-5 font-mono text-xs md:text-sm">
            <p>
              <span className="text-[var(--terminal-muted)]">$</span> ./boot --mode=retro
            </p>
            <p key={stage}>
              <span className="text-[var(--terminal-muted)]">&gt;</span> {messages[stage]}
              <span className="terminal-cursor">_</span>
            </p>
            <p>
              <span className="text-[var(--terminal-muted)]">&gt;</span> {Math.round(progress)}% complete
            </p>
          </div>
        </div>

        {/* Hard-edged progress bar */}
        <div className="retro-shadow-sm mt-6 h-6 border-2 border-ink bg-surface">
          <div
            className="h-full bg-badge transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <span>booting the retro web</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

function AppShell() {
  return (
    <AppErrorBoundary>
      <GlobalInteractionLayer />
      <ScrollProgress />
      <App />
      <BootHandoff />
    </AppErrorBoundary>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Unable to find the application root element.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppShell />
  </StrictMode>,
);
