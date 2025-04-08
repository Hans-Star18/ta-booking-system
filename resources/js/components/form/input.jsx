import { twMerge } from 'tailwind-merge'

export default function Input({
    id,
    type = 'text',
    name,
    placeholder = '',
    value = '',
    className = '',
    onChange,
}) {
    return (
        <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
            className={twMerge(
                'h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none',
                className
            )}
        />
    )
}
