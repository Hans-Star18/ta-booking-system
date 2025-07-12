import { twMerge } from 'tailwind-merge'

export default function TransactionStatusBadge({ status }) {
    const baseClass =
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium capitalize ring-1 ring-inset'

    switch (status) {
        case 'pending':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                    )}
                >
                    {status}
                </span>
            )
        case 'success':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-green-50 text-green-700 ring-green-600/20'
                    )}
                >
                    {status}
                </span>
            )
        case 'capture':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-green-50 text-green-700 ring-green-600/20'
                    )}
                >
                    {status}
                </span>
            )
        case 'settlement':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-green-50 text-green-700 ring-green-600/20'
                    )}
                >
                    {status}
                </span>
            )
        case 'expire':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-red-50 text-red-700 ring-red-600/20'
                    )}
                >
                    {status}
                </span>
            )
        case 'failed':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-red-50 text-red-700 ring-red-600/20'
                    )}
                >
                    {status}
                </span>
            )
        case 'refund':
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-blue-50 text-blue-700 ring-blue-600/20'
                    )}
                >
                    {status}
                </span>
            )
        default:
            return (
                <span
                    className={twMerge(
                        baseClass,
                        'bg-gray-50 text-gray-700 ring-gray-600/20'
                    )}
                >
                    {status}
                </span>
            )
    }
}
