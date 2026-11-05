import React from "react";
import { cn } from "../lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<FloatingInputProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  className,
  ...props
}) => {
  const hasValue = value.trim().length > 0;

  return (
    <div className="relative w-full">
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        style={{
          transition: "background-color 9999s ease-in-out 0s",
        }}
        className={cn(
          `peer px-3.5 pt-4.5 pb-1 h-12 w-full outline-none rounded-lg 
          border-2 border-gray-500/30 bg-white transition-colors duration-200 
          focus:border-[2.5px] focus:border-gray-500/60`,
          className,
        )}
        {...props}
      />
      <label
        htmlFor={name}
        className={cn(
          "absolute top-3.5 left-4 text-gray-500 text-sm transition-all duration-200 pointer-events-none origin-left",
          hasValue
            ? "scale-75 -translate-y-2.5 text-gray-700"
            : "peer-focus:scale-75 peer-focus:-translate-y-2.5 peer-focus:text-gray-700",
        )}
      >
        {label}
      </label>
    </div>
  );
};
