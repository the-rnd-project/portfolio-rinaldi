import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import MagneticCursor from "./components/MagneticCursor";

export const metadata: Metadata = {
  title: "Rinaldi Udra Suhanda | Software Engineer & AI Master's Candidate",
  description: "Informatics graduate and Artificial Intelligence master's candidate with experience in software engineering, Python, Flask, RESTful APIs, Laravel, Flutter, and user-centered digital solutions.",
  icons: {
    icon: "/icon.svg",
  },
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
