import { twMerge } from "tailwind-merge";

export default function Radio({ id, value, name, className }) {
    return (
        <input
            id={id}
            type="radio"
            value={value}
            name={name}
            class={twMerge(
                "w-4 h-4 text-blue-300 bg-gray-100 border-gray-300 focus:ring-blue-300 focus:ring-none",
                className
            )}
        />
    );
}
