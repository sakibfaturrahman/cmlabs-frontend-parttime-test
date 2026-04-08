import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "mealio. | discover your next favorite recipe",
  description:
    "turn your simple ingredients into extraordinary culinary experiences with mealio.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full scroll-smooth antialiased",
        inter.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 selection:bg-red-100 selection:text-red-900">
        <div className="flex-1 flex flex-col relative">{children}</div>
      </body>
    </html>
  );
}
