"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "cn";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import { Input } from "./InputLayout";
import { Textarea } from "./TextariaLaout";
import axios from "axios";

interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

interface EmailFormProps {
  email: string;
  name: string;
  image: string;
  propertyTitle: string;
  propertyPrice: number;
}

export default function EmailForm({
  email,
  name,
  image,
  propertyTitle,
  propertyPrice,
}: EmailFormProps) {
  const [values, setValues] = useState<InputValues>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.phone || !values.message) {
      toast.error("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/send-email", {
        ownerEmail: email,
        ownerName: name,
        propertyTitle,
        propertyPrice,
        senderEmail: values.email,
        senderName: values.name,
        message: values.message,
        senderPhone: values.phone,
      });
      toast.success("Message send successfully");
      setValues({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 lg:mt-0 rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt="User"
          width={50}
          height={50}
          className="object-cover rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold text-[#111827]">{name}</h3>
          <p className="text-[#111827]/60">Property Agent</p>
        </div>
      </div>
      <form className="mt-8 space-y-4" onSubmit={sendEmail}>
        <div className="relative">
          <Input
            name="name"
            label="Your name"
            id="register-name"
            type="text"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="relative">
          <Input
            name="email"
            label="Your email"
            id="contact-email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="relative">
          <Input
            name="phone"
            label="Your phone"
            id="contact-phone"
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />
        </div>
        <div className="relative">
          <Textarea
            name="message"
            label="Your message"
            id="contact-message"
            value={values.message}
            onChange={(e) => setValues({ ...values, message: e.target.value })}
          />
        </div>
        <button
          className={cn(
            "bg-[#4f46e5] text-white text-[12px] py-3 w-full font-semibold cursor-pointer duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 will-change-transform rounded-lg",
            loading && "opacity-60 cursor-not-allowed hover:scale-100",
          )}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner size={15} className="animate-spin" />
              <span className="text-[15px]">Sending...</span>
            </>
          ) : (
            <>
              <FaPaperPlane size={15} />
              <span className="text-[15px]">Send Email</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
