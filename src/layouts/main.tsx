import React, { PropsWithChildren } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full h-screen bg-black'>
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
