"use client";

import { FcGoogle } from "react-icons/fc";
import { useAuthModal } from "../store/useAuthModalStore";
import Modal from "./Modal";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "cn";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

export default function RegisterModal() {
  const router = useRouter();
  const { openLogin, isRegisterOpen, closeRegister } = useAuthModal();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });

  const hasName = Boolean(values.name);
  const hasEmail = Boolean(values.email);
  const hasPassword = Boolean(values.password);

  const validate = () => {
    const newErrors: RegisterErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    } else if (values.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters!";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const { error } = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Registration successful");
      router.refresh();
      setValues({ name: "", email: "", password: "" });
      closeRegister();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
      <div className="mt-6 mb-5 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome to RealEstate
        </h2>
        <p className="text-sm text-gray-500">Create an account</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="relative">
          <input
            name="name"
            id="register-name"
            type="text"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            disabled={loading}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className={cn(
              "peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg bg-white transition-colors duration-200 focus:border-[2.5px] focus:border-gray-500/60",
              errors.name
                ? "border-2 border-red-500 focus:border-red-500"
                : "border-2 border-gray-500/30",
            )}
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
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 absolute -bottom-4.5 left-1">
              {errors.name}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            name="email"
            id="register-email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            disabled={loading}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className={cn(
              "peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg bg-white transition-colors duration-200 focus:border-[2.5px] focus:border-gray-500/60",
              errors.email
                ? "border-2 border-red-500 focus:border-red-500"
                : "border-2 border-gray-500/30",
            )}
          />
          <label
            htmlFor="login-email"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasEmail
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your email
          </label>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 absolute -bottom-4.5 left-1">
              {errors.email}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            name="password"
            id="register-password"
            value={values.password}
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            disabled={loading}
            style={{
              transition: "background-color 9999s ease-in-out 0s",
            }}
            className={cn(
              "peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg bg-white transition-colors duration-200 focus:border-[2.5px] focus:border-gray-500/60",
              errors.password
                ? "border-2 border-red-500 focus:border-red-500"
                : "border-2 border-gray-500/30",
            )}
          />
          <label
            htmlFor="login-password"
            className={cn(
              "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
              hasPassword
                ? "scale-75 -translate-y-2.5 text-gray-700"
                : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
            )}
          >
            Your password
          </label>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 absolute -bottom-4.5 left-1">
              {errors.password}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-2 w-full bg-blue-600 text-white rounded-lg
          transition duration-500 cursor-pointer disabled:opacity-50 hover:bg-blue-400"
        >
          <div className="flex items-center justify-center gap-2">
            <span>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </span>
            <span>{loading ? "Loading..." : "Continue"}</span>
          </div>
        </button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-600">Or</span>
        </div>
      </div>
      <button
        className="w-full bg-transparent flex items-center justify-center 
        gap-1.5 rounded-[10px] py-3 ring-2 ring-gray-500/30 hover:ring-gray-500/60 
        transition duration-500 cursor-pointer disabled:opacity-50"
        disabled={loading}
      >
        <FcGoogle className="size-5" />
        <span className="font-semibold text-black text-sm">
          Continue with Google
        </span>
      </button>
      <p className="text-gray-400 text-center text-sm mt-6">
        Already have an account?{" "}
        <span
          className="text-[#4f46e5] font-semibold cursor-pointer 
          hover:underline"
          onClick={openLogin}
        >
          Login
        </span>
      </p>
    </Modal>
  );
}
