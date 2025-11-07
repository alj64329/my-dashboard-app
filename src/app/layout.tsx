import type { Metadata } from "next";
import "../css/globals.css";

export const metadata: Metadata = {
  title: "Struck",
  description: "Struck - Simple management tool for your team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased max-w-[1800px] mx-auto'
      >
        {children}
      </body>
    </html>
  );
}
