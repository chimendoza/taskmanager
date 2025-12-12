"use client";
import clsx from "clsx";

import { FC } from "react";


interface ButtonProps{
  className?:string,
  children:React.ReactNode
  disabled?:boolean,
  variant?: "success" | "info" | "danger";
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ disabled=false,variant = "info", className, children, onClick, ...props }) => {
  const baseClasses = "px-10 py-2 rounded font-medium transition-colors cursor-pointer";

  const variantClasses = clsx(
    {
    "bg-green-500 hover:bg-green-600 text-white": variant === "success",
    "bg-cyan-500 hover:bg-cyan-600 text-white": variant === "info",
    "bg-red-500 hover:bg-red-600 text-white": variant === "danger",
    'pointer-events-none':disabled==true
  });

  return (
    <button
      className={clsx(baseClasses, variantClasses, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
