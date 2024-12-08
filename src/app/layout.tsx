import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";

import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const inter = Inter({ subsets: ["cyrillic"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
