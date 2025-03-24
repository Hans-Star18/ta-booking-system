import { twMerge } from "tailwind-merge";

export function Textarea({
    id,
    name,
    placeholder = "",
    className = "",
    onChange,
    rows = 3,
    children,
}) {
    return (
        <textarea
            className={twMerge(
                "w-full rounded-lg border appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20",
                className
            )}
            name={name}
            id={id}
            rows={rows}
            placeholder={placeholder}
        >
            {children}
        </textarea>
    );
}
