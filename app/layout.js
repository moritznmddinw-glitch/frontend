import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Ballerina",
  description: "Community and utilities platform",
  other: { heleket: "a08412d3" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-neutral-50`}>
        <Header />
        <div className="flex flex-row min-h-screen">
          <aside className="hidden md:block w-64 bg-white border-r border-neutral-200 shadow-sm">
            {/* Sidebar akan di-render di sini untuk desktop */}
            {/* ...import Sidebar dan render di sini... */}
          </aside>
          <main className="flex-1 pt-16 px-4 py-8 max-w-5xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
