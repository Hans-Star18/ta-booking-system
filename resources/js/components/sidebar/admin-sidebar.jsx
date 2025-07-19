import { Link, useForm } from '@inertiajs/react'
import {
    ArrowLeftStartOnRectangleIcon,
    BuildingOfficeIcon,
    HomeIcon,
    ShieldCheckIcon,
    Squares2X2Icon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { useCallback } from 'react'
import { useSidebar } from '@/components/context/siderbar-context'
import BedFrontIcon from '@/components/icons/bed-front-icon'

export default function AdminSidebar() {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
    const { post } = useForm()

    const navItems = [
        {
            icon: <Squares2X2Icon className="size-6" />,
            name: 'Dashboard',
            href: route('admin.dashboard'),
            routeActive: ['admin.dashboard'],
        },
        {
            icon: <BuildingOfficeIcon className="size-6" />,
            name: 'Hotels',
            href: route('admin.companies.index'),
            routeActive: 'admin.companies',
        },
        {
            icon: <UsersIcon className="size-6" />,
            name: 'Users',
            href: route('admin.users.index'),
            routeActive: 'admin.users',
        },
        {
            icon: <BedFrontIcon className="size-6" />,
            name: 'Beds',
            href: route('admin.beds.index'),
            routeActive: 'admin.beds',
        },
        {
            icon: <HomeIcon className="size-6" />,
            name: 'Amenities',
            href: route('admin.amenities.index'),
            routeActive: 'admin.amenities',
        },
        {
            icon: <ShieldCheckIcon className="size-6" />,
            name: 'Policies',
            href: '#',
            routeActive: '#',
        },
        {
            icon: <ArrowLeftStartOnRectangleIcon className="size-6" />,
            name: 'Logout',
            href: route('logout'),
            routeActive: 'logout',
            isLogout: true,
        },
    ]

    const isActive = useCallback(
        (paths) => {
            if (Array.isArray(paths)) {
                return paths.some((path) => route().current().includes(path))
            }
            return route().current().includes(paths)
        },
        [route().current()]
    )

    return (
        <aside
            className={`fixed top-0 left-0 z-50 mt-16 h-screen border-r border-gray-200 bg-white px-5 py-3 transition-all duration-300 md:mt-0 ${isExpanded || isMobileOpen || isHovered ? 'w-[250px]' : 'w-[80px]'} ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`flex py-4 md:py-6 ${
                    !isExpanded && !isHovered
                        ? 'lg:justify-center'
                        : 'justify-start'
                }`}
            >
                <Link
                    href={route('admin.dashboard')}
                    className="flex items-center gap-2"
                >
                    {isExpanded || isHovered || isMobileOpen ? (
                        <h2 className="font-bold">Admin</h2>
                    ) : (
                        <h1 className="font-bold">Admin</h1>
                    )}
                </Link>
            </div>

            <nav className="flex flex-col gap-2 md:gap-4">
                {navItems.map((item, index) =>
                    item.isLogout ? (
                        <form
                            key={index}
                            onSubmit={(e) => {
                                e.preventDefault()
                                post(route('logout'), {
                                    onSuccess: () => {
                                        window.location.reload()
                                    },
                                })
                            }}
                            className="w-full"
                        >
                            <button
                                type="submit"
                                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-100 ${!isExpanded && !isHovered ? 'md:justify-center' : 'justify-start'}`}
                            >
                                <span>{item.icon}</span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span>{item.name}</span>
                                )}
                            </button>
                        </form>
                    ) : (
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
                    )
                )}
            </nav>
        </aside>
    )
}
