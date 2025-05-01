import { Link, usePage } from '@inertiajs/react'
import {
    ArrowLeftStartOnRectangleIcon,
    BuildingLibraryIcon,
    Cog8ToothIcon,
    PercentBadgeIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { useSidebar } from '@/components/context/siderbar-context'
import { useCallback } from 'react'

export default function OrganizerSidebar() {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()

    const navItems = [
        {
            icon: <Squares2X2Icon className="size-6" />,
            name: 'Dashboard',
            href: route('organizer.dashboard'),
            routeActive: 'organizer.dashboard',
        },
        {
            icon: <BuildingLibraryIcon className="size-6" />,
            name: 'Unit Type & Allotment',
            href: route('organizer.rooms.index'),
            routeActive: 'organizer.rooms',
        },
        {
            icon: <PercentBadgeIcon className="size-6" />,
            name: 'Promotion Code',
            href: '/promotion-code',
        },
        {
            icon: <Cog8ToothIcon className="size-6" />,
            name: 'Setting',
            href: '/settings',
        },
        {
            icon: <ArrowLeftStartOnRectangleIcon className="size-6" />,
            name: 'Logout',
            href: route('logout'),
        },
    ]

    const isActive = useCallback(
        (path) => route().current().includes(path),
        [route().current()]
    )

    return (
        <aside
            className={`fixed top-0 left-0 z-50 h-screen border-r border-gray-200 bg-white px-5 py-3 transition-all duration-300 ${isExpanded || isMobileOpen || isHovered ? 'w-[250px]' : 'w-[80px]'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex py-6 ${
                    !isExpanded && !isHovered
                        ? 'lg:justify-center'
                        : 'justify-start'
                }`}
            >
                <Link
                    href={route('organizer.dashboard')}
                    className="flex items-center gap-2"
                >
                    {isExpanded || isHovered || isMobileOpen ? (
                        <h2 className="font-bold">Brand</h2>
                    ) : (
                        <h1 className="font-bold">B</h1>
                    )}
                </Link>
            </div>

            <nav className="flex flex-col gap-2 md:gap-4">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`${isActive(item.routeActive) ? 'bg-blue-50 text-blue-700' : ''} flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 ${!isExpanded && !isHovered ? 'md:justify-center' : 'justify-start'}`}
                    >
                        <span>{item.icon}</span>
                        {(isExpanded || isHovered || isMobileOpen) && (
                            <span>{item.name}</span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}
