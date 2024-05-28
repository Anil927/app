'use client'
import React, { useEffect } from "react"
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
            <body style={{margin: "0px"}}>
                {
                    pathname !== '/' ? <SideNav /> : <SplashScreen />
                }
                {children}
            </body>
    </html>
  )
}
