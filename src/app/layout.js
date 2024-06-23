import { Nunito } from "next/font/google";
import "./globals.css";
import  { Toaster } from 'react-hot-toast';

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "facepedia",
  description: "Develop by Amit Prajapati",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
      <Toaster />
        {children}
      </body>
    </html>
  );
}
