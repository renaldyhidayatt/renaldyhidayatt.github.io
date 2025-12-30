import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
    return (
        <Layout>
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-20 pb-20 md:pb-0">
                <h1 className="text-7xl font-bold text-primary mb-6">
                    404
                </h1>
                {/* Pesan error utama menggunakan teks muted */}
                <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <p className="text-md text-muted-foreground mb-10">
                    Maybe you mistyped the URL or the page has been moved.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors font-medium"
                >
                    Go back to Homepage
                </Link>
            </main>
        </Layout>
    );
};

export default NotFound;
