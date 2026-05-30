import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import MagneticCursor from "./components/MagneticCursor";

export const metadata: Metadata = {
  title: "Rinaldi Udra Suhanda | Software Engineer & AI Specialist",
  description: "Software Engineer specializing in Artificial Intelligence, Machine Learning, and Full-Stack Development",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanline">
        <MagneticCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
