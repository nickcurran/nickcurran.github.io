import type { Metadata } from "next";
import "./globals.css";
import Link
 from "next/link";
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
                <div className="flex flex-col min-h-screen">
                    <main className="flex-1">
                        {props.children}
                    </main>
                    
                    <footer className="w-full p-8 text-center text-xs">
                        <div className="flex justify-between text-gray-300 dark:text-gray-700">
                            <div className="">© 2025 <Link href="/">Nick Curran</Link></div>
                            <div>Icons by <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icon8</a></div>
                        </div>
                    </footer>
                </div>
            </body>
        </html>
    )
}
