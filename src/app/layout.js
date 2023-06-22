import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { GlobalRefsProvider } from "../Context/globalRefs.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Liam McKenna Resume",
  description: "Resume/CV of Liam McKenna",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalRefsProvider>
          <Navbar />
          {children}
        </GlobalRefsProvider>
      </body>
    </html>
  );
}
