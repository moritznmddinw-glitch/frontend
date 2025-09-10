import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-white`}
        suppressHydrationWarning>
        <div className="app-container grid grid-cols-[18rem_1fr] grid-rows-[auto_1fr] min-h-dvh">
          <div className="col-span-2">
            <Header />
          </div>
          <div>
            <Sidebar />
          </div>
          <main className="content p-4">{children}</main>
          <ProfileSidebar />
        </div>
      </body>
    </html>
  );
}
