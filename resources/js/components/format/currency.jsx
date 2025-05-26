export default function Currency({
    value,
    locale = 'id-ID',
    currency = 'IDR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    className = '',
}) {
    return (
        <span className={className}>
            {new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: minimumFractionDigits,
                maximumFractionDigits: maximumFractionDigits,
            }).format(value)}
        </span>
    )
}
