import React from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
}

const AuthInput = ({ label, id, required = true, className = '', ...props }: AuthInputProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-dark mb-2" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        className={`w-full px-5 py-4 bg-surface shadow-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body ${className}`}
        {...props}
      />
    </div>
  );
};

export default AuthInput;
