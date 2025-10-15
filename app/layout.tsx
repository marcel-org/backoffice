import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { RuntimeConfigScript } from "./runtime-config";

export const metadata: Metadata = {
  title: "Marcel Admin",
  description: "Admin dashboard for Marcel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <RuntimeConfigScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}