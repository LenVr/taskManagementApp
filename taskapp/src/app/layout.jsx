"use client";

import useFirebaseAuth from "@/hooks/firebaseAuth";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";

export default function RootLayout({ children }) {
  useFirebaseAuth();
  return (
    <html lang="en">
      <body className="page-container">
        <Navbar />
        <main className="content">{children}</main>
      </body>
    </html>
  );
}