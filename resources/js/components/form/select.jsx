import { twMerge } from "tailwind-merge";

export default function Select({ id, name, options, className }) {
    return (
        <select
            className={twMerge(
                "h-11 rounded-lg border px-2 py-2.5 appearance-none text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20",
                className
            )}
            id={id}
            name={name}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label ? option.label : option.value}
                </option>
            ))}
        </select>
    );
}
