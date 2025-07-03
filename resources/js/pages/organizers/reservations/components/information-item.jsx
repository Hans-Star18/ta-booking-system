export default function InformationItem({
    label,
    value,
    labelColSpan = 3,
    valueColSpan = 8,
}) {
    return (
        <div className="grid grid-cols-12 gap-2">
            <p className={`col-span-${labelColSpan}`}>{label}</p>
            <span className="col-span-1">:</span>
            <span className={`col-span-${valueColSpan}`}>{value}</span>
        </div>
    )
}
