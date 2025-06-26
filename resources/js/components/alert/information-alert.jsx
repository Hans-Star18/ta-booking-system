import { EyeIcon, InformationCircleIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

export default function InformationAlert({
    title,
    message,
    variant = 'primary',
    actionButtonText = 'View more',
    closeButtonText = 'Dismiss',
    className,
    actionButtonOnClick,
    closeButtonOnClick,
    actionButtonIcon = <EyeIcon className="me-2 h-4 w-4" />,
}) {
    const alertClasses = {
        primary: 'border-blue-300 bg-blue-50 text-blue-800',
        secondary: 'border-gray-300 bg-gray-50 text-gray-800',
        success: 'border-green-300 bg-green-50 text-green-800',
        danger: 'border-red-300 bg-red-50 text-red-800',
        warning: 'border-yellow-300 bg-yellow-50 text-yellow-800',
    }

    const buttonClasses = {
        primary: 'bg-blue-800 hover:bg-blue-900 focus:ring-blue-200',
        secondary: 'bg-gray-800 hover:bg-gray-900 focus:ring-gray-200',
        success: 'bg-green-800 hover:bg-green-900 focus:ring-green-200',
        danger: 'bg-red-800 hover:bg-red-900 focus:ring-red-200',
        warning: 'bg-yellow-800 hover:bg-yellow-900 focus:ring-yellow-200',
    }

    const closeButtonTextClasses = {
        primary: 'text-blue-800',
        secondary: 'text-gray-800',
        success: 'text-green-800',
        danger: 'text-red-800',
        warning: 'text-yellow-800',
    }

    const icons = {
        primary: <InformationCircleIcon className="me-2 h-6 w-6 shrink-0" />,
    }

    let baseClasses = 'mb-4 rounded-lg border p-4'

    return (
        <div className={twMerge(baseClasses, alertClasses[variant], className)}>
            <div className="flex items-center">
                {icons[variant]}
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">{title}</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">{message}</div>
            <div className="flex">
                <button
                    type="button"
                    className={twMerge(
                        'me-2 inline-flex cursor-pointer items-center rounded-lg px-3 py-1.5 text-center text-xs font-medium text-white focus:ring-4 focus:outline-none',
                        buttonClasses[variant]
                    )}
                    onClick={actionButtonOnClick}
                >
                    {actionButtonIcon}
                    {actionButtonText}
                </button>
                <button
                    type="button"
                    className={twMerge(
                        'cursor-pointer rounded-lg border !bg-transparent px-3 py-1.5 text-center text-xs font-medium focus:ring-4 focus:outline-none',
                        buttonClasses[variant],
                        closeButtonTextClasses[variant]
                    )}
                    onClick={closeButtonOnClick}
                >
                    {closeButtonText}
                </button>
            </div>
        </div>
    )
}
