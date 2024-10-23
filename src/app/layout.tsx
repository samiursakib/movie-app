import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalStateContextProvider } from "./providers/GlobalStateContextProvider";

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
        <GlobalStateContextProvider>{children}</GlobalStateContextProvider>
      </body>
      y32`14q1sw323efr543454321432345f5fr55rtfr54321``1432 1`EQW `543T543R4`
    </html>
  );
}
