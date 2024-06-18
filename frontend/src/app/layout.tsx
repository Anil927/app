import React from "react";
import ClientSideComponent from "./clientlayout";
import type { Metadata, Viewport } from "next";


export const metadata: Metadata = {
    title: "codeguru",
    description: "codeguru is a platform for developers to share their knowledge and learn from others.",
    category: "website",
    generator: "Next.js", // framework used
    // the big is here 
    manifest: "/manifest.json",
};

export const viewport: Viewport = {
    themeColor: "#1564c0",
    initialScale: 1,
    width: "device-width",
    height: "device-height",
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: "0px" }}>
                <ClientSideComponent>{children}</ClientSideComponent>
            </body>
        </html>
    );
}
