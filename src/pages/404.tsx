import { Link } from "react-router-dom";
import { Home, Search, FileQuestion } from "lucide-react";
import Layout from "@/components/Layout";

const NotFound = () => {
    return (
        <Layout>
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20 pb-32 md:pb-20 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 animate-in zoom-in duration-500">
                        <FileQuestion className="w-12 h-12 text-primary" strokeWidth={1.5} />
                    </div>
                    <div className="relative mb-6">
                        <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700">
                            404
                        </h1>
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-2xl animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 animate-in slide-in-from-bottom-5 duration-700 delay-100">
                        Page Not Found
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground mb-3 animate-in slide-in-from-bottom-6 duration-700 delay-200">
                        The page you're looking for seems to have wandered off into the digital void.
                    </p>

                    <p className="text-sm text-muted-foreground/80 mb-10 animate-in slide-in-from-bottom-7 duration-700 delay-300">
                        It might have been moved, deleted, or perhaps it never existed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom-8 duration-700 delay-400">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95"
                        >
                            <Home className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                            Back to Home
                        </Link>

                        <Link
                            to="/blog"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-card border-2 border-border text-foreground rounded-xl hover:bg-accent transition-all duration-300 font-semibold hover:scale-105 active:scale-95"
                        >
                            <Search className="w-5 h-5 transition-transform group-hover:rotate-12" />
                            Browse Blog
                        </Link>
                    </div>
                    <div className="mt-12 pt-8 border-t border-border/50 animate-in fade-in duration-700 delay-500">
                        <p className="text-sm text-muted-foreground mb-4">
                            Lost? Here are some helpful links:
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                to="/"
                                className="text-sm text-primary hover:underline hover:text-primary/80 transition"
                            >
                                Home
                            </Link>
                            <span className="text-muted-foreground/40">•</span>
                            <Link
                                to="/blog"
                                className="text-sm text-primary hover:underline hover:text-primary/80 transition"
                            >
                                Blog
                            </Link>
                            <span className="text-muted-foreground/40">•</span>
                            <Link
                                to="/portfolio"
                                className="text-sm text-primary hover:underline hover:text-primary/80 transition"
                            >
                                Portfolio
                            </Link>
                            <span className="text-muted-foreground/40">•</span>
                            <Link
                                to="/about"
                                className="text-sm text-primary hover:underline hover:text-primary/80 transition"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            </main>
        </Layout>
    );
};

export default NotFound;