import { Link } from '@inertiajs/react'
import { useState } from 'react'
import UserDropdown from '@/components/header/user-dropdown'
import {
    Bars3CenterLeftIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

export default function OrganizerHeader({ onClick, onToggle }) {
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false)

    const toggleApplicationMenu = () => {
        setApplicationMenuOpen(!isApplicationMenuOpen)
    }

    return (
        <header className="sticky top-0 z-99999 flex w-full border-gray-200 bg-white lg:border-b">
            <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
                <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    <button
                        className="block h-10 w-10 text-gray-500 lg:hidden"
                        onClick={onToggle}
                    >
                        <Bars3CenterLeftIcon className="block h-6 w-8" />
                        <XMarkIcon className="hidden size-6" />
                        {/* Cross Icon */}
                    </button>
                    <button
                        onClick={onClick}
                        className="z-99999 hidden h-10 w-10 items-center justify-center rounded-lg border-gray-200 p-2 text-gray-500 lg:flex lg:h-11 lg:w-11 lg:border"
                    >
                        <Bars3CenterLeftIcon className="hidden fill-current lg:block" />
                    </button>

                    <Link
                        href={route('organizer.dashboard')}
                        className="lg:hidden"
                    >
                        Brand
                    </Link>

                    <button
                        onClick={toggleApplicationMenu}
                        className="z-99999 flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden"
                    >
                        <EllipsisHorizontalIcon className={'size-6'} />
                    </button>
                </div>
                <div
                    className={`${
                        isApplicationMenuOpen ? 'flex' : 'hidden'
                    } w-full items-center justify-end gap-4 px-5 py-4 shadow-sm lg:flex lg:px-0 lg:shadow-none`}
                >
                    <UserDropdown />
                </div>
            </div>
        </header>
    )
}
