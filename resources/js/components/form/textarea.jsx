import { twMerge } from 'tailwind-merge'

export function Textarea({
    id,
    name,
    placeholder = '',
    className = '',
    onChange,
    rows = 3,
    value,
}) {
    return (
        <textarea
            className={twMerge(
                'w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none',
                className
            )}
            name={name}
            id={id}
            rows={rows}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        >
            {value}
        </textarea>
    )
}
