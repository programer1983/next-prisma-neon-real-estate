import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWith?: boolean;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  children,
  icon,
  iconPosition = "left",
  fullWith = false,
  loading = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return <button 
  disabled={loading || disabled}
  className={``}
  ></button>;
}
