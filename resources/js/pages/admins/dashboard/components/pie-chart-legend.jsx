export default function PieChartLegend({ color, title, value }) {
    const colorClass = {
        '#222ab4': 'bg-[#222ab4]',
        '#7592ff': 'bg-[#7592ff]',
        '#dde9ff': 'bg-[#dde9ff]',
    }

    return (
        <div class="flex items-start gap-2">
            <div
                class={`mt-1.5 h-2 w-2 rounded-full ${colorClass[color]}`}
            ></div>
            <div>
                <h5 class="mb-1 text-sm font-medium text-gray-800">{title}</h5>
                <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700">
                        {value}
                    </span>
                    <span class="text-sm text-gray-500">{title}</span>
                </div>
            </div>
        </div>
    )
}
