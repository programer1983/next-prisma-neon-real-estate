"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "cn";
import { FaPaperPlane } from "react-icons/fa";

interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

export default function EmailForm() {
  const [values, setValues] = useState<InputValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const hasName = Boolean(values.name);
  const hasEmail = Boolean(values.email);
  const hasPhone = Boolean(values.phone);
  const hasMessage = Boolean(values.message);

  return (
    <div className="mt-6 lg:mt-0 rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src="/images/avatar.png"
          alt="User"
          width={50}
          height={50}
          className="object-cover rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold text-[#111827]">Jon Dorian</h3>
          <p className="text-[#111827]/60">Property Agent</p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="relative">
          <input
            name="name"
            id="register-name"
            type="text"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className="peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg 
            border-2 border-gray-500/30 bg-white transition-colors duration-200 
            focus:border-[2.5px] focus:border-gray-500/60"
          />
          <label
            htmlFor="register-name"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasName
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your name
          </label>
        </div>
        <div className="relative">
          <input
            name="email"
            id="contact-email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className="peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg 
            border-2 border-gray-500/30 bg-white transition-colors duration-200 
            focus:border-[2.5px] focus:border-gray-500/60"
          />
          <label
            htmlFor="contact-email"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasEmail
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your email
          </label>
        </div>
        <div className="relative">
          <input
            name="phone"
            id="contact-phone"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className="peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg 
            border-2 border-gray-500/30 bg-white transition-colors duration-200 
            focus:border-[2.5px] focus:border-gray-500/60"
          />
          <label
            htmlFor="contact-phone"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasPhone
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your phone
          </label>
        </div>
        <div className="relative">
          <textarea
            name="message"
            id="contact-message"
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className="peer px-3.5 pt-4.5 pb-1 w-full outline-none rounded-lg 
            border-2 border-gray-500/30 bg-white transition-colors duration-200 
            focus:border-[2.5px] focus:border-gray-500/60 resize-none h-50"
          />
          <label
            htmlFor="contact-message"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left z-10",
              hasMessage
                ? "scale-75 -translate-y-3.5 top-3.5 left-3 bg-white px-1.5 text-gray-700"
                : "top-3.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-focus:top-3.5 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-gray-700",
            )}
          >
            Your message
          </label>
        </div>
        <button
          className="bg-[#4f46e5] text-white text-[12px] py-3 w-full 
          font-semibold cursor-pointer  duration-300 hover:scale-[1.02] 
          flex items-center justify-center gap-2 will-change-transform
          rounded-lg"
        >
          <span>
            <FaPaperPlane size={15} />
          </span>
          <span className="text-[15px]">Add Message</span>
        </button>
      </div>
    </div>
  );
}
