import "./globals.scss";
import { Inter } from "next/font/google";
import Navbar from "../components/navigation/Navbar";
import { GlobalRefsProvider } from "../Context/globalRefs.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Liam McKenna Resume",
  description: "Resume/CV of Liam McKenna",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={inter.className}>
        <GlobalRefsProvider>
          <Navbar />
          {children}
        </GlobalRefsProvider>
      </body>
    </html>
  );
}
