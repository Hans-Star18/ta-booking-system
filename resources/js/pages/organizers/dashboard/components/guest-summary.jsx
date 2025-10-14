export default function GuestSummary({ guestSummary }) {
    const items = [
        {
            label: 'Total Guests',
            value: guestSummary.total,
            color: 'bg-green-500',
        },
        { label: 'New Guests', value: guestSummary.new, color: 'bg-blue-500' },
        {
            label: 'Returning Guests',
            value: guestSummary.returning,
            color: 'bg-yellow-500',
        },
    ]

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Guests</h1>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="rounded-lg border border-gray-200 p-4"
                    >
                        <div className="flex items-center">
                            <div
                                className={`h-3 w-3 rounded-full ${item.color} mr-2`}
                            ></div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    {item.label}
                                </p>
                                <p className="text-2xl font-bold">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
