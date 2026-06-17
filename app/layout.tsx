import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Raj Mane — AI/CV Developer & Engineer",
  description:
    "Portfolio of Raj Mane — Computer Science engineer specializing in AI, Computer Vision, and Full-Stack Development. Hackathon winner, CGPA 9.88/10.",
  keywords: [
    "Raj Mane",
    "developer",
    "AI",
    "computer vision",
    "full stack",
    "portfolio",
    "engineer",
  ],
  authors: [{ name: "Raj Mane" }],
  openGraph: {
    title: "Raj Mane — AI/CV Developer & Engineer",
    description:
      "AI, Computer Vision, and Full-Stack Development. 3x Hackathon Winner.",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
