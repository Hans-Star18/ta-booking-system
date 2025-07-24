import {
    CreditCardIcon,
    EnvelopeIcon,
    ComputerDesktopIcon,
    ChartBarIcon,
    GlobeAltIcon,
    CalendarDaysIcon,
    BoltIcon,
    ShieldCheckIcon,
    CogIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    ArchiveBoxIcon,
    PencilIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    ServerIcon,
    WifiIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'

export default function FeaturesList() {
    const features = [
        {
            category: 'Payment & Booking',
            items: [
                {
                    icon: <CreditCardIcon className="h-5 w-5 text-green-600" />,
                    title: 'Midtrans Payment Gateway',
                    description:
                        'Accept down payments or full payments securely',
                },
                {
                    icon: <EnvelopeIcon className="h-5 w-5 text-blue-600" />,
                    title: 'Automatic Email Notifications',
                    description:
                        'Booking details saved on server and sent directly to your email',
                },
                {
                    icon: (
                        <CheckCircleIcon className="h-5 w-5 text-emerald-600" />
                    ),
                    title: 'Secure Booking Process',
                    description:
                        'Complete booking management with automatic processing',
                },
            ],
        },
        {
            category: 'Administration System',
            items: [
                {
                    icon: (
                        <ComputerDesktopIcon className="h-5 w-5 text-purple-600" />
                    ),
                    title: 'Modern Admin Interface',
                    description:
                        'Clean, modern, and easy-to-use administration system',
                },
                {
                    icon: <ChartBarIcon className="h-5 w-5 text-orange-600" />,
                    title: 'Reports & Analytics',
                    description:
                        'View reports and sales analysis directly through web browser',
                },
                {
                    icon: <GlobeAltIcon className="h-5 w-5 text-indigo-600" />,
                    title: 'Global Access',
                    description:
                        'Manage bookings from anywhere in the world, anytime',
                },
            ],
        },
        {
            category: 'Room Management',
            items: [
                {
                    icon: <CogIcon className="h-5 w-5 text-gray-600" />,
                    title: 'Real-time Updates',
                    description:
                        'Update room availability, prices, and information online',
                },
                {
                    icon: <CalendarDaysIcon className="h-5 w-5 text-red-600" />,
                    title: 'Booking Management',
                    description:
                        'Manage all bookings — both online and offline',
                },
                {
                    icon: <ArchiveBoxIcon className="h-5 w-5 text-teal-600" />,
                    title: 'Inventory Control',
                    description: 'Update inventory and room details instantly',
                },
            ],
        },
        {
            category: 'Performance & Features',
            items: [
                {
                    icon: <BoltIcon className="h-5 w-5 text-yellow-600" />,
                    title: 'Fast Loading',
                    description:
                        'Loads directly in browser for faster performance',
                },
                {
                    icon: (
                        <ShieldCheckIcon className="h-5 w-5 text-green-700" />
                    ),
                    title: 'No Cookies',
                    description:
                        'Does not use cookies to store data for better privacy',
                },
                {
                    icon: <ClockIcon className="h-5 w-5 text-blue-700" />,
                    title: 'Real-time Availability',
                    description:
                        'Check room availability and prices in real time',
                },
            ],
        },
        {
            category: 'Guest Experience',
            items: [
                {
                    icon: (
                        <MagnifyingGlassIcon className="h-5 w-5 text-cyan-600" />
                    ),
                    title: 'Instant Search',
                    description: 'Search and find available rooms instantly',
                },
                {
                    icon: (
                        <CurrencyDollarIcon className="h-5 w-5 text-green-500" />
                    ),
                    title: 'Live Pricing',
                    description:
                        'View current room rates and pricing in real time',
                },
                {
                    icon: <PencilIcon className="h-5 w-5 text-pink-600" />,
                    title: 'Booking Modifications',
                    description:
                        'Guests can modify their bookings directly online',
                },
                {
                    icon: <UsersIcon className="h-5 w-5 text-violet-600" />,
                    title: 'Online Booking',
                    description:
                        'Complete online reservation system for guests',
                },
            ],
        },
    ]

    return (
        <div className="mx-auto px-6 py-12 md:px-24">
            <div className="mb-4 text-center">
                <h2 className="text-2xl font-bold text-slate-800">
                    Features List
                </h2>
            </div>

            <div className="space-y-6">
                {features.map((category, categoryIndex) => (
                    <div
                        key={categoryIndex}
                        className="rounded-md bg-gradient-to-r from-gray-50 to-gray-100 p-4 shadow-sm"
                    >
                        <h2 className="mb-4 flex items-center font-bold text-slate-800">
                            {category.category}
                        </h2>

                        <div className="grid gap-4 md:grid-cols-3">
                            {category.items.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className="group rounded-md border border-gray-100 bg-white p-2 shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 rounded-lg bg-gray-50 p-2 transition-colors duration-200">
                                            {item.icon}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-2 text-sm font-semibold text-slate-800 transition-colors duration-200">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm leading-relaxed text-gray-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
