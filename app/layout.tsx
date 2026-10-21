import type { Metadata } from "next";
import { Oswald, Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FoodExpress — горячая еда из ресторанов",
  description: "Закажите еду из любимых ресторанов с быстрой доставкой",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${oswald.variable} ${manrope.variable}`}
      style={{ backgroundColor: "#0f0d0c", colorScheme: "dark" }}
    >
      <head>
        <meta name="theme-color" content="#0f0d0c" />
      </head>
      <body className="min-h-screen flex flex-col relative">
        <SmoothScroll>
          <Header />
          <div className="flex-1 relative z-10">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
