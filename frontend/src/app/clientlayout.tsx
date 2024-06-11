// src/app/components/ClientSideComponent.tsx
'use client';

import React from "react";
import { usePathname } from "next/navigation";
import SideNav from '@/app/components/sidenav/sidenav';
import SplashScreen from "@/app/components/splashscreen/splashscreen";

const ClientSideComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <>
      {/* {(pathname !== '/' && pathname !== '/auth') ? <SideNav /> : <SplashScreen />} */}
      {pathname !== '/' && pathname !== '/auth' ? <SideNav />: pathname !== '/auth' ? <SplashScreen /> : null}
      {children}
    </>
  );
};

export default ClientSideComponent;
