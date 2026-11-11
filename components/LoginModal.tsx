"use client";

import { useState } from "react";
import { useAuthModal } from "../store/useAuthModalStore";
import Modal from "./Modal";
import { cn } from "cn";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "../lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "../services/signInWithGoogle";

interface LoginValues {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export default function LoginModal() {
  const router = useRouter();
  const { openRegister, isLoginOpen, closeLogin } = useAuthModal();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const hasValue = Boolean(values.email);
  const hasPassword = Boolean(values.password);

  const validate = () => {
    const newErrors: LoginErrors = {};
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast.error(error.message as string);
        return;
      }
      toast.success("Login successful");
      router.refresh();
      setValues({ email: "", password: "" });
      closeLogin();
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
    <Modal title="Login" onClose={closeLogin} isOpen={isLoginOpen}>
      <div className="mt-6 mb-5 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500">Logun to your account</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="relative">
          <input
            name="email"
            id="login-email"
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
              hasValue
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
            id="login-password"
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
        onClick={signInWithGoogle}
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
        Don&apos;t have an account?{" "}
        <span
          className="text-[#4f46e5] font-semibold cursor-pointer 
          hover:underline"
          onClick={openRegister}
        >
          Register
        </span>
      </p>
    </Modal>
  );
}
