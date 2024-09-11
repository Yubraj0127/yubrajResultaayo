"use client";

import { useState } from "react";
import Smenu from "@/components/Smenu";
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
              menuOpen ? "w-72" : "w-15"
            } transition-all duration-300`}
          >
            <Smenu setMenuOpen={setMenuOpen} />
          </div>
          <div className="flex-1">
            <main>{children}</main>
          </div>
        </div>
        <Copyright />
      </div>
    </html>
  );
}
