import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium'
  const cls = variant === 'primary' ? `${base} bg-[var(--primary-500)] text-white hover:opacity-95` : `${base} bg-transparent text-[var(--text)]`
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}

export default Button
