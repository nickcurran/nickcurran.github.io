import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer"

export const metadata: Metadata = {
    title: "Nick Curran",
    description: "Taking Care of Business, the home page of Nick Curran"
};

interface LayoutProps {
    children: React.ReactNode
}

export default function RootLayout(props: Readonly<LayoutProps>) {
    return (
        <html lang="en">
            <body>
                <main>
                    {props.children}
                </main>

                <Footer />
            </body>
        </html>
    )
}
