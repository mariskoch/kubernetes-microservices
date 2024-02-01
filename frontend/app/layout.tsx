import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Kubernetes Microservices",
    description: "A Kubernetes Microservices Demo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className + ' bg-custom-gradient h-screen'}>{children}</body>
        </html>
    );
}
