import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Input from '@/components/form/input'
import { CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'

export default function CopyInput({
    id,
    value = '',
    placeholder = 'Enter text to copy',
    className = '',
    readOnly = false,
    onChange,
    onCopy,
}) {
    const [inputValue, setInputValue] = useState(value)
    const [isCopied, setIsCopied] = useState(false)

    const handleInputChange = (e) => {
        const newValue = e.target.value
        setInputValue(newValue)
        if (onChange) {
            onChange(e)
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inputValue)
            setIsCopied(true)

            if (onCopy) {
                onCopy(inputValue)
            }

            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        } catch (err) {
            alert('Error copying text to clipboard')
        }
    }

    return (
        <div className="relative">
            <Input
                id={id}
                type="text"
                defaultValue={inputValue}
                placeholder={placeholder}
                onChange={handleInputChange}
                className={twMerge(readOnly && 'bg-gray-50', className)}
                readOnly={readOnly}
            />
            <button
                type="button"
                onClick={handleCopy}
                disabled={!inputValue.trim()}
                className={twMerge(
                    'absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md transition-colors',
                    'hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-blue-500/20 focus:outline-none',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
                    isCopied && 'text-green-600'
                )}
                title={isCopied ? 'Copied!' : 'Copy text'}
            >
                {isCopied ? (
                    <CheckIcon className="size-6" />
                ) : (
                    <DocumentDuplicateIcon className="size-6" />
                )}
            </button>
        </div>
    )
}
