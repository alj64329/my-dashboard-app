import type { Metadata } from "next";
import "../css/globals.css";
import { UserProvider } from "../context/UserContext";
import {config} from "@fortawesome/fontawesome-svg-core"
import '@fortawesome/fontawesome-svg-core/styles.css'
import AutoLogout from "../components/AutoLogout";
config.autoAddCss= false

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
        <UserProvider>
          {children}
        </UserProvider>
        <AutoLogout/>
      </body>
    </html>
  );
}
