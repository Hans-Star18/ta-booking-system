import { twMerge } from 'tailwind-merge'

export function HelperText({ message, className }) {
    return (
        <p className={twMerge('mt-1 text-xs text-gray-500 italic', className)}>
            {message}
        </p>
    )
}
