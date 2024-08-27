import type { Metadata } from "next";
import Navbar from "@/components/NavBar/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import CartProviderContext from "@/providers/cart.context.provider";

export var metadata: Metadata = {
  title: "Enatega",
  description: "Created by Ahmad Raza Khokhar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="flex flex-col justify-between h-[100vh] w-full">
        <CartProviderContext>
          <Navbar />
          <Toaster />
          {children}
          <Footer/>
        </CartProviderContext>
      </body>
    </html>
  );
}
