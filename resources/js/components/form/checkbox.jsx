import { twMerge } from 'tailwind-merge'

export function Checkbox({ id, name, className, onChange, checked = false }) {
    return (
        <input
            id={id}
            type="checkbox"
            name={name}
            className={twMerge(
                'focus:ring-none h-4 w-4 border-gray-300 bg-gray-100 text-blue-300 focus:ring-blue-300',
                className
            )}
            checked={checked}
            onChange={onChange}
        />
    )
}
