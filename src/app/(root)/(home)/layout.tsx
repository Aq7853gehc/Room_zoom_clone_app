import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ROOM",
  description: "Video calling app",
  icons:{
    icon:"/icons/logo.svg"
  }
}

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex flex-1 flex-col min-h-screen px-6 pb-6 pt-28 max-md:pb-6 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
      Footer
    </main>
  );
};

export default HomeLayout;
