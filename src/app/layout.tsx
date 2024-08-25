import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import CartProviderContext from "./providers/cart.context.provider";

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
      <body>
        <CartProviderContext>
          <Navbar />
          <Toaster />
          {children}
        </CartProviderContext>
      </body>
    </html>
  );
}
