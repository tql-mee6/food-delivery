import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "FoodExpress — доставка еды из ресторанов",
  description: "Закажите еду из любимых ресторанов с быстрой доставкой",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<html
  lang="ru"
  data-scroll-behavior="smooth"
  className={`${manrope.variable} ${inter.variable}`}
  style={{ backgroundColor: "#fef7ee", colorScheme: "light" }}
>
  <head>
    <meta name="theme-color" content="#fef7ee" />
  </head>
  <body
    className="min-h-screen flex flex-col relative"
    style={{ color: "#1c1917" }}
  >
    <SmoothScroll>
      <Header />
      <div className="flex-1 relative z-10">{children}</div>
      <Footer />
    </SmoothScroll>
  </body>
</html>
  );
}