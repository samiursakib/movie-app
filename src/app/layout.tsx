import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalStateContextProvider } from "./providers/GlobalStateContextProvider";
import { QueryClientProviderWrapper } from "./providers/QueryClientProviderWrapper";

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
  title: "Movie App",
  description: "The largest movie database for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-300 dark`}
      >
        <GlobalStateContextProvider>
          <QueryClientProviderWrapper>
            <div className="bg-[#edede9] text-blue-950 dark:text-slate-300 dark:bg-slate-950 min-h-screen">
              <Navbar />
              {children}
            </div>
          </QueryClientProviderWrapper>
        </GlobalStateContextProvider>
      </body>
    </html>
  );
}
