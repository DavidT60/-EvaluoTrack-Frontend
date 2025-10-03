import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  className = '',
  disabled = false
}) => {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary'
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;