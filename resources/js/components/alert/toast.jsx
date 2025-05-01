import {
    InformationCircleIcon,
    CheckCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function Toast({ message, type, id }) {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (message != null) {
            setIsOpen(true)
            const timer = setTimeout(() => {
                setIsOpen(false)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [id])

    const icon = {
        info: <InformationCircleIcon className="size-5" />,
        success: <CheckCircleIcon className="size-5" />,
        error: <XCircleIcon className="size-5" />,
    }

    const colorClass = {
        info: 'bg-blue-100 text-blue-500',
        success: 'bg-green-100 text-green-500',
        error: 'bg-red-100 text-red-500',
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        isOpen && (
            <div className="fixed top-5 right-5 z-50 flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-gray-500 shadow-sm">
                <div
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorClass[type]}`}
                >
                    {icon[type]}
                </div>
                <div className="ms-3 text-sm font-normal">{message}</div>
                <button
                    type="button"
                    className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
                    onClick={handleClose}
                >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="size-5" />
                </button>
            </div>
        )
    )
}
