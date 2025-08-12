import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center relative">
      <Navbar />

      <main className="max-w-[1200px] py-4 md:py-12 w-full h-full flex flex-1">
        <span className="hidden md:block">
          <Sidebar />
        </span>

        <div className="flex-1">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
  