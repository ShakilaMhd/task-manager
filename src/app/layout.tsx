import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Inter } from "next/font/google";
import { Vazirmatn } from "next/font/google";
// import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/query-provider";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

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

// const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "تسک منیجر | من",
  description: "تسک منیرج برای کنترل کردن تسک های شما",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      // className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
