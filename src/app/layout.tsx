import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./provider/QueryClientProvider";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Hangman game built using Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
