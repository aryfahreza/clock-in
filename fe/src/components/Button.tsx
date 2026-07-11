import type { ButtonHTMLAttributes, ComponentType } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant?: 'filled' | 'outlined';
    color?: 'primary' | 'warning' | 'success' | 'danger';
    fullWidth?: boolean,
    icon?: ComponentType<{ size?: number; className?: string }>;
};

export default function Button({ 
    label, 
    variant = 'filled', 
    color = 'primary', 
    className = '', 
    fullWidth = false,
    icon: Icon,
    ...props 
}: Readonly<Props>) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const widthStyle = fullWidth ? "w-full" : "w-auto";

    const variants = {
        filled: {
            primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
            warning: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500",
            success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
            danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
        },
        outlined: {
            primary: "border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
            warning: "border border-amber-500 text-amber-600 hover:bg-amber-50 focus:ring-amber-500",
            success: "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",
            danger: "border border-rose-600 text-rose-600 hover:bg-rose-50 focus:ring-rose-500",
        }
    };

    return (
        <button 
            className={`${baseStyles} ${widthStyle} ${variants[variant][color]} ${className}`} 
            {...props}
        >
            {Icon && <Icon size={16} className="shrink-0 mr-2" />}
            <span>{label}</span>
        </button>
    );
}