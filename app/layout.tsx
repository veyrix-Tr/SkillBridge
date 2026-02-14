import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillBridge - Career Guidance Platform",
  description: "SkillBridge: Bridging the gap between education and career success with AI-powered guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
          {children}
      </body>
    </html>
  );
}
