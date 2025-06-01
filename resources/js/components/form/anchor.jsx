import { Link } from '@inertiajs/react'
import { twMerge } from 'tailwind-merge'

export default function Anchor({
    children,
    variant = 'primary',
    className,
    disabled = false,
    href,
}) {
    const buttonClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
        success: 'bg-green-500 hover:bg-green-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
        info: 'bg-teal-500 hover:bg-teal-600 text-white',
    }

    let baseClasses =
        'shadow-xs rounded-md transition px-4 py-3 text-sm cursor-pointer'

    return (
        <Link
            href={href}
            className={twMerge(baseClasses, buttonClasses[variant], className)}
            disabled={disabled}
        >
            {children}
        </Link>
    )
}
