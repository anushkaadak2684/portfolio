import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anushka Adak — Software Developer & Public Speaker",
  description:
    "Portfolio of Anushka Adak — Software Developer, Public Speaker, and 2× Smart India Hackathon Finalist. Building scalable software, AI-powered systems, and impactful digital experiences.",
  keywords: [
    "Anushka Adak",
    "Software Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Smart India Hackathon",
    "Portfolio",
  ],
  authors: [{ name: "Anushka Adak" }],
  openGraph: {
    title: "Anushka Adak — Software Developer & Public Speaker",
    description:
      "Building scalable software, AI-powered systems, and impactful digital experiences that solve real-world problems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
