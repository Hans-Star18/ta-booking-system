import { twMerge } from 'tailwind-merge'

export default function Label({
    htmlFor = null,
    className = '',
    required = false,
    children,
}) {
    return (
        <label
            htmlFor={htmlFor}
            className={twMerge(
                'mb-1.5 block text-sm font-medium text-gray-700',
                className
            )}
        >
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    )
}
