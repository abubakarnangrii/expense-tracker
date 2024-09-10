"use client";

import React from "react";

interface GroupFieldProps {
  name: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  min?: number;
}

const GroupField: React.FC<GroupFieldProps> = ({
  name,
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  min
}) => {
  return (
    <>
      <div className="gap-3 py-3">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-black/80 pb-2"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          className="mt-1 py-2 px-6 bg-slate-100 block w-full border-none ring-0 outline-none  shadow-sm  focus:ring-1 focus:ring-opacity-50"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1" >{error}</p>}
    </>
  );
};

export default GroupField;
