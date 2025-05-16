import { useState } from 'react'
import Dropdown from '@/components/form/dropdown'
import { usePage, useForm } from '@inertiajs/react'
import {
    ArrowLeftStartOnRectangleIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline'

export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const { auth } = usePage().props
    const { post } = useForm()

    function toggleDropdown() {
        setIsOpen(!isOpen)
    }

    function closeDropdown() {
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="dropdown-toggle flex items-center text-gray-700"
            >
                <span className="mr-3 h-11 w-11 overflow-hidden rounded-full">
                    <img src="/image/avatar.jpg" alt="User" />
                </span>

                <span className="text-theme-sm mr-1 block font-medium">
                    {auth.user.name}
                </span>
                <ChevronDownIcon
                    className={`h-5 w-5 stroke-gray-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="shadow-theme-lg absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3"
            >
                <div>
                    <span className="text-theme-sm block font-medium text-gray-700">
                        {auth.user.name}
                    </span>
                    <span className="text-theme-xs mt-0.5 block text-gray-500">
                        {auth.user.email}
                    </span>
                </div>

                <form
                    action={route('logout')}
                    method="POST"
                    onSubmit={(e) => {
                        e.preventDefault()
                        post(route('logout'), {
                            onSuccess: () => {
                                window.location.reload()
                            },
                        })
                    }}
                >
                    <button
                        type="submit"
                        className="group text-theme-sm mt-3 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                    >
                        <ArrowLeftStartOnRectangleIcon className="size-6" />
                        Sign out
                    </button>
                </form>
            </Dropdown>
        </div>
    )
}
