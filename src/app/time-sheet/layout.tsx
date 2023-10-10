import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer';
import AppNavbar from "@/components/navBar/AppNavBar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-gray-200">
            <AppNavbar></AppNavbar>
            {children}
            <Footer></Footer>
        </div>
    )
}
