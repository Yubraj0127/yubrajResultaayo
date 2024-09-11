"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import Dnav from "../../components/Dnav";
import Copyright from "../../components/Mini Component/Copyright";

export default function RootLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <html lang="en">
      <div className="flex flex-col min-h-screen">
        <Dnav />
        <div className="flex flex-1 mt-20">
          <div
            className={`${
              menuOpen ? "w-72 z-10" : "w-15 z-10"
            } transition-all duration-300`}
          >
            <Menu setMenuOpen={setMenuOpen} />
          </div>
          <div className="flex-1 z-0">
            <main>{children}</main>
          </div>
        </div>
        <Copyright />
      </div>
    </html>
  );
}
