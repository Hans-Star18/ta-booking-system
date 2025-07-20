import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { Link } from '@inertiajs/react'

export default function OverviewCard({
    icon,
    title,
    value,
    increase,
    increaseText = 'From last month',
    href,
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
                <div className="w-fit rounded-lg bg-gray-100 p-2">{icon}</div>

                <Link
                    href={href}
                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                >
                    <ArrowLongRightIcon className="size-6" />
                </Link>
            </div>

            <p className="mb-3 text-sm text-gray-600">{title}</p>

            <div className="flex items-center justify-between">
                <p className="text-2xl font-extrabold">{value}</p>

                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        + {increase}
                    </span>

                    <span className="text-xs text-gray-600">
                        {increaseText}
                    </span>
                </div>
            </div>
        </div>
    )
}
