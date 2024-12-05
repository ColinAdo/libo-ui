import "@/styles/globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "@/redux/Provider";
import { Setup } from "@/components/utils";
import { Navbar, Footer } from "@/components/common";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Setup />
            <Navbar />
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8">
              {children}
            </div>
            <Footer />
            <Toaster position="top-center" richColors />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
