import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nick Curran",
    description: "Taking Care of Business, the home page of Nick Curran"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
