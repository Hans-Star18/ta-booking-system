import { twMerge } from 'tailwind-merge'

export default function ValidationFeedback({ message, className = '' }) {
    if (!message) {
        return null
    }

    return (
        <span
            className={twMerge('mt-1 text-sm text-red-500 italic', className)}
        >
            {message}
        </span>
    )
}
