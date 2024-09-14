import React from "react";

const Button: React.FC<{
  type?: 'submit' | 'button' | 'reset';
  disabled: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ type, disabled, children,onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary text-white py-2 px-4  mt-4 relative h-10 w-full ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
