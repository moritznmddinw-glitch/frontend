import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ballerina",
  description: "Community and utilities platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-white`}>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen px-3 py-7 sm:py-10 bg-white max-w-5xl mx-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
