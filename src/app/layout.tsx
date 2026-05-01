import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@xterm/xterm/css/xterm.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Israel Araújo | Full Stack Engineer",
  description:
    "Full Stack Software Engineer specializing in Python, TypeScript, Go & Rust. Open source contributor to Zed Editor (23k+ stars). Building production systems with AI, microservices, and cloud architecture.",
  keywords: [
    "software engineer",
    "full stack developer",
    "python",
    "typescript",
    "go",
    "rust",
    "AI",
    "open source",
    "remote",
  ],
  openGraph: {
    title: "Israel Araújo | Full Stack Engineer",
    description:
      "Full Stack Engineer building production systems with Python, TypeScript, Go & Rust. Open source contributor. AI enthusiast.",
    url: "https://israeldeveloper.com.br",
    type: "website",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
