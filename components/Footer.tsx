"use client";

import Link from "next/link";
import { navLinks } from "./Navbar";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[ #f8fafc]">
      <div
        className="mx-auto flex max-w-7xl flex-col items-center justify-between
            gap-4 px-5 py-5 text-center lg:flex-row lg:px-12"
      >
        <Link href="/" className="flex items-center font-semibold text-2xl">
          <span className="text-[#111827]">Next</span>
          <span className="bg-[#4f46e5] text-white px-2 py-1 rounded-tr-2xl rounded-bl-2xl">
            Estate
          </span>
        </Link>
        <div className="flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition hover:text-[#4f46e5] 
             text-[#111827]/70"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <p className="text-sm text-[#111827]/60 ">&copy; 2026 NextEstate</p>
      </div>
    </footer>
  );
}
