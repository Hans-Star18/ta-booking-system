import { twMerge } from 'tailwind-merge'

export default function Button({
    children,
    variant = 'primary',
    className,
    onClick,
    type = 'button',
    disabled = false,
}) {
    const buttonClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
        success: 'bg-green-500 hover:bg-green-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
    }

    let baseClasses =
        'shadow-xs rounded-md transition px-4 py-3 text-sm cursor-pointer'

    return (
        <button
            onClick={onClick}
            className={twMerge(baseClasses, buttonClasses[variant], className)}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
