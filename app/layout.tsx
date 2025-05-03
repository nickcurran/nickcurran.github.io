import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer"

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
                <main>
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}
