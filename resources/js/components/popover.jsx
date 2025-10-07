import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Popover({ trigger, content, className = '' }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={twMerge('relative w-full', className)} ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="text-sm text-blue-600 hover:underline"
            >
                {trigger}
            </button>

            {open && (
                <div className="absolute inset-x-0 bottom-full mb-2 w-48 rounded-lg bg-white p-3 text-sm text-gray-700 shadow-md ring-1 ring-black/5">
                    {content}
                </div>
            )}
        </div>
    )
}
