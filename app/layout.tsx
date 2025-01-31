import "@/styles/globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import Provider from "@/redux/Provider";
import { Inter } from "next/font/google";
import { Setup } from "@/components/utils";
import { Navbar, Footer } from "@/components/common";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Libo",
  description: "Library web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Provider>
          <Setup />
          <div className="mx-auto max-h-7xl px-2 sm:px-6 lg:px-8 mt-6">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Toaster position="top-center" richColors />
            </ThemeProvider>
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
