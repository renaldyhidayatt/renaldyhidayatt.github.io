import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 pb-20 md:pb-0">
                {children}
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default Layout;
