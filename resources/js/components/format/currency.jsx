export default function Currency({
    value,
    locale = 'id-ID',
    currency = 'IDR',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
}) {
    return (
        <span>
            {new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: minimumFractionDigits,
                maximumFractionDigits: maximumFractionDigits,
            }).format(value)}
        </span>
    )
}
