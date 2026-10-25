"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Marketplace", href: "/marketplace" },
];

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isTransparent = variant === "transparent";

  return (
    <section
      className={`top-0 left-0 z-50 w-full
      ${isTransparent ? "absolute" : "sticky border-b border-black/5 bg-card"}
  `}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <nav
          className={`flex items-center justify-between h-20 
            ${isTransparent ? "mt-6 rounded-3xl border border-white/10 bg-white/5 px-6 backdrop-blur-2xl" : "px-0"}`}
        >
          <Link href="/" className="flex items-center font-semibold text-2xl">
            <span
              className={isTransparent ? "text-gray-300 " : "text-[#111827]"}
            >
              Next
            </span>
            <span className="bg-[#4f46e5] text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
              Estate
            </span>
          </Link>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition hover:text-[#4f46e5] 
                  ${isTransparent ? "text-white/80" : "text-text/70"}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Button
              className={`group bg-white text-black text-[12px] p-5 font-semibold hover:bg-white duration-300 hover:scale-[1.05] will-change-transform
                 ${!isTransparent ? "border border-black/15 hover:border-black/30" : ""}`}
            >
              <span className="group-hover:text-[#4f46e5] ">Login</span>
            </Button>
            <Button
              className={`group bg-white text-black text-[12px] p-5 font-semibold hover:bg-white duration-300 hover:scale-[1.05] will-change-transform 
                ${!isTransparent ? "border border-black/15 hover:border-black/30" : ""}`}
            >
              <span className="group-hover:text-[#4f46e5]">
                <FaHome />
              </span>
              <span className="group-hover:text-[#4f46e5]">Add Property</span>
            </Button>
          </div>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition lg:hidden 
            ${isTransparent ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-background text-text"}`}
          >
            {isOpen ? (
              <IoClose className="size-6" />
            ) : (
              <HiOutlineMenuAlt3 className="size-6" />
            )}
          </Button>
        </nav>
        <MobileMenu
          isOpen={isOpen}
          isTransparent={isTransparent}
          navLinks={navLinks}
        />
      </div>
    </section>
  );
}
