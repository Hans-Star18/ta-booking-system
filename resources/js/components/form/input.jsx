import { twMerge } from 'tailwind-merge'

export default function Input({
    id,
    type = 'text',
    name,
    placeholder = '',
    defaultValue = '',
    className = '',
    onChange,
    min,
    max,
    step,
    readOnly = false,
}) {
    return (
        <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            readOnly={readOnly}
            onKeyDown={(e) => {
                if (type === 'number') {
                    // Prevent non-numeric input
                    if (
                        !/[0-9]/.test(e.key) &&
                        e.key !== 'Backspace' &&
                        e.key !== 'Delete' &&
                        e.key !== 'ArrowLeft' &&
                        e.key !== 'ArrowRight' &&
                        e.key !== 'Tab' &&
                        e.key !== '.' &&
                        e.key !== '-'
                    ) {
                        e.preventDefault()
                    }
                }
            }}
            className={twMerge(
                'h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none',
                className
            )}
        />
    )
}
