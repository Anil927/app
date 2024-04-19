'use client'
import SideNav from "./components/sidenav/sidenav"
import { usePathname } from "next/navigation"
import SplashScreen from "./components/splashscreen/page"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const pathname = usePathname()

    return (
        <html lang="en">
            <body>
                {
                    pathname !== '/' ? <SideNav /> : <SplashScreen />
                }
                {children}
            </body>
        </html>
    )
}
