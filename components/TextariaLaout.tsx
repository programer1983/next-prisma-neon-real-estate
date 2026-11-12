import React from "react";
import { cn } from "../lib/utils";

interface FloatingTextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<FloatingTextareaProps> = ({
  label,
  name,
  value,
  onChange,
  //   type = "text",
  className,
  ...props
}) => {
  const hasValue = value.trim().length > 0;

  return (
    <div className="relative w-full">
      <textarea
        name={name}
        id={name}
        // type={type}
        value={value}
        onChange={onChange}
        style={{
          transition: "background-color 9999s ease-in-out 0s",
        }}
        className={cn(
          `peer px-3.5 pt-4.5 pb-1 w-full outline-none rounded-lg 
          border-2 border-gray-500/30 bg-white transition-colors duration-200 
          focus:border-[2.5px] focus:border-gray-500/60 h-37.5 resize-none`,
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
