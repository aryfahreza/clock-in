import { type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    error?: string;
};

export default function Input({ 
    id,
    label, 
    error, 
    className = '', 
    type = 'text', 
    ...props 
}: Readonly<Props>) {

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label 
                htmlFor={id} 
                className="text-xs font-semibold text-slate-700 tracking-wide"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                className={`
                    w-full px-3 py-2 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-400
                    transition-all focus:outline-none focus:ring-2
                    ${error 
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' 
                        : 'border-slate-200 focus:border-primary-500 focus:ring-primary-100'
                    }
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200
                    ${className}
                `}
                {...props}
            />
            {error && (
                <span className="text-xs text-rose-600 font-medium">
                    {error}
                </span>
            )}
        </div>
    );
}