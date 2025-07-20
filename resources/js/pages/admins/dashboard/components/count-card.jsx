export default function CountCard({ icon, title, value }) {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="w-fit rounded-lg bg-gray-100 p-3">{icon}</div>

            <div>
                <p className="mb-1 text-sm font-bold text-gray-800">{title}</p>

                <p className="text-xs">
                    {value} {title}
                </p>
            </div>
        </div>
    )
}
