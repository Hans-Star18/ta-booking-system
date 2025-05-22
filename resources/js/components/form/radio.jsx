import { twMerge } from 'tailwind-merge'

export default function Radio({
    id,
    name,
    className,
    checked = false,
    onChange,
}) {
    return (
        <input
            id={id}
            type="radio"
            name={name}
            checked={checked}
            onChange={onChange}
            className={twMerge(
                'focus:ring-none h-4 w-4 border-gray-300 bg-gray-100 text-blue-300 focus:ring-blue-300',
                className
            )}
        />
    )
}
