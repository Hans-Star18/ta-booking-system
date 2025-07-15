import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'

export default function Select({
    id,
    name,
    options,
    className,
    defaultValue,
    onChange,
    disabled = false,
}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="relative">
            <select
                className={twMerge(
                    'h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none',
                    className
                )}
                id={id}
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option?.disabled ?? false}
                    >
                        {option.label ?? option.value}
                    </option>
                ))}
            </select>
            <div className="absolute top-0 right-0 flex h-full w-10 items-center justify-center">
                <ChevronDownIcon
                    className={`size-4 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </div>
        </div>
    )
}
