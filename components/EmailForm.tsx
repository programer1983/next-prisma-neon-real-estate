"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

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

  const hasValue = Boolean(values.name);

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
          <Input
            name="name"
            id="contact-name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            className="peer pt-8 pb-4  border-gray-500/30 border-2 focus:border-none"
          />
          <label
            htmlFor="contact-name"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasValue
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your name
          </label>
        </div>
        <div className="relative">
          <Input
            name="email"
            id="contact-email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            className="peer pt-8 pb-4  border-gray-500/30 border-2 focus:border-none"
          />
          <label
            htmlFor="contact-email"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasValue
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your email
          </label>
        </div>
        <div className="relative">
          <Input
            name="phone"
            id="contact-phone"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            className="peer pt-8 pb-4  border-gray-500/30 border-2 focus:border-none"
          />
          <label
            htmlFor="contact-phone"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasValue
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your phone
          </label>
        </div>
        <div className="relative">
          <Textarea
            name="message"
            id="contact-message"
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
            className="peer pt-8 pb-4  border-gray-500/30 border-2 focus:border-none resize-none"
          />
          <label
            htmlFor="contact-message"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasValue
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your message
          </label>
        </div>
      </div>
    </div>
  );
}
