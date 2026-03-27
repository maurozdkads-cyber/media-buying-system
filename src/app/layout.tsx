import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Buying System",
  description: "Testing, execution, and learning management for media buying",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Sidebar />
        <main className="ml-60 min-h-screen p-6 transition-all duration-200">
          {children}
        </main>
      </body>
    </html>
  );
}
