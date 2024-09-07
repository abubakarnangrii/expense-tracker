import React from "react";

const Button: React.FC<{
  type?: string;
  disabled: boolean;
  children: React.ReactNode;
}> = ({ type, disabled, children }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-primary text-white py-2 px-4  mt-4 relative h-10 w-full ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
