import { useEffect } from "react";
import { Button } from "./ui/button";
import { LuX } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      aria-hidden={isOpen}
      className={`fixed inset-0 z-50 flex items-center justify-center 
      px-4 transition-opacity duration-500 
      ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-all duration-500 bg-black/70
        ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl
          transform transition-all duration-500 py-5
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
      >
        <div
          className="flex items-center justify-between px-6 py-4
          border-b border-gray-300"
        >
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <Button
            aria-label="Close-modal"
            onClick={onClose}
            className="px-1 py-2 rounded-full bg-transparent hover:bg-gray-100 transition"
          >
            <LuX className="text-black size-6" />
          </Button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
