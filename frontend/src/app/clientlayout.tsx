// src/app/components/ClientSideComponent.tsx
'use client';

import React from "react";
import { usePathname } from "next/navigation";
import SideNav from '@/components/sidenav/sidenav';
import SplashScreen from "@/components/splashscreen/splashscreen";

import "@/app/globals.css";

// import {AdjustFontFallback} from 'next/font'

// const dm_sans = DM_Sans({
//   display: "swap",
//   subsets: ["latin"],
//   weight: ["500"],
// });

const ClientSideComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      <style jsx global>{`
        :root {
          --dm-font: ${dm_sans.style.fontFamily};
        }
      `}</style>
      {/* {(pathname !== '/' && pathname !== '/auth') ? <SideNav /> : <SplashScreen />} */}
      {pathname !== '/' && pathname !== '/auth' && pathname !== '/auth/resetpassword' ? <SideNav /> : pathname !== '/auth' && pathname !== '/auth/resetpassword' ? <SplashScreen /> : null}
      {children}
    </>
  );
};

export default ClientSideComponent;
