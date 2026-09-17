import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

interface LayoutProps {
    children: React.ReactNode;
    maxWidth?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, maxWidth = "max-w-4xl" }) => {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent">
            <Navbar />
            <main className={`${maxWidth} mx-auto px-6 pb-20 md:pb-0 animate-fade-in`}>
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default Layout;
