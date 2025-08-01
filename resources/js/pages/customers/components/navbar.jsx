import { Link } from '@inertiajs/react'
import { useSidebar } from '@/components/context/siderbar-context'
import { useEffect } from 'react'
import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'

export default function Navbar({ appName }) {
    const { isMobileOpen, isMobile, toggleMobileSidebar } = useSidebar()

    const items = [
        {
            label: 'Home',
            href: route('customer.home'),
            className: 'md:px-0 md:hover:bg-transparent',
        },
        {
            label: 'About Us',
            href: '#about-us',
            className: 'md:px-0 md:hover:bg-transparent',
        },
        {
            label: 'Features List',
            href: '#features',
            className: 'md:px-0 md:hover:bg-transparent',
        },
        {
            label: 'Clients',
            href: '#clients',
            className: 'md:px-0 md:hover:bg-transparent',
        },
        {
            label: 'Contact Us',
            href: '#contact-us',
            className: 'md:px-0 md:hover:bg-transparent',
        },
        {
            label: 'Register/ Demo',
            href: route('auth.request-demo-account'),
            className: 'bg-blue-600 text-white px-4 py-2 rounded-md',
        },
    ]

    useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isMobileOpen])

    return (
        <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white shadow-md">
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <Link
                    href={route('customer.home')}
                    className="flex items-center space-x-3"
                >
                    <span className="self-center text-2xl font-semibold">
                        {appName}
                    </span>
                </Link>
                {isMobile && (
                    <div className="flex space-x-3 md:order-2 md:space-x-0">
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-300 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden"
                            onClick={toggleMobileSidebar}
                        >
                            {!isMobileOpen ? (
                                <BarsArrowDownIcon className="h-6 w-6 text-slate-900" />
                            ) : (
                                <BarsArrowUpIcon className="h-6 w-6 text-slate-900" />
                            )}
                        </button>
                    </div>
                )}
                <div
                    className={`w-full items-center justify-between md:order-1 md:flex md:w-auto ${isMobile ? 'overflow-hidden transition-all duration-300 ease-in-out' : ''} ${isMobile ? (isMobileOpen ? 'flex max-h-96 opacity-100' : 'pointer-events-none hidden max-h-0 opacity-0') : 'flex'}`}
                >
                    <ul className="mt-4 flex w-full flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-16 md:border-0 md:bg-white md:p-0">
                        {items.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={twMerge(
                                        'block rounded-sm px-3 py-2 text-slate-900 hover:bg-gray-100 md:hover:text-blue-700',
                                        item.className
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
