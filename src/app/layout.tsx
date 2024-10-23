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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalStateContextProvider>
          <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        </GlobalStateContextProvider>
      </body>
    </html>
  );
}
