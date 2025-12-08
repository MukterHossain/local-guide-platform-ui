import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <PublicNavbar />
            <main className="flex-1 container mx-auto w-full px-4 py-4">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
};

export default CommonLayout;