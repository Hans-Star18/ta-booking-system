import { twMerge } from "tailwind-merge";

export default function Input({
    id,
    type = "text",
    name,
    placeholder = "",
    value = "",
    className = "",
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
                "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20",
                className
            )}
        />
    );
}
