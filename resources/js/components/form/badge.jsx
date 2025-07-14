import { twMerge } from 'tailwind-merge'

export default function Badge({ children, variant = 'primary', className }) {
    const badgeClasses = {
        primary: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        danger: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        info: 'bg-indigo-100 text-indigo-800',
        light: 'bg-gray-100 text-gray-800',
        dark: 'bg-gray-800 text-white',
    }

    let baseClasses = 'text-xs font-medium px-3 py-1 rounded-sm'

    return (
        <span
            className={twMerge(baseClasses, badgeClasses[variant], className)}
        >
            {children}
        </span>
    )
}
