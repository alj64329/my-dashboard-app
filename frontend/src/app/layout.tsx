import type { Metadata } from "next";
import "../css/globals.css";
import { Karla, Kumbh_Sans, Nunito_Sans } from 'next/font/google'
import { UserProvider } from "../context/UserContext";
import {config} from "@fortawesome/fontawesome-svg-core"
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ToastContainer } from "react-toastify";
config.autoAddCss= false

export const metadata: Metadata = {
  title: "Struck",
  description: "Struck - Simple management tool for your team",
};

const karla = Karla({
  subsets: ['latin'],
  weight: ['200','300','400','500','600','700','800'],
  style: ['normal','italic'],
  display: 'swap',
})

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200','300','400','500','600','700','800','900','1000'],
  style: ['normal','italic'],
  variable: '--font-nunitoSans', // optional: for CSS variables
  display: 'swap',
})

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
        <ToastContainer />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
