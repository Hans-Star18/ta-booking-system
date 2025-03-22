import { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_blue.css";
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
    const inputRef = useRef(null);
    const flatpickrInstance = useRef(null);

    useEffect(() => {
        if (type === "date" && inputRef.current) {
            if (flatpickrInstance.current) {
                flatpickrInstance.current.destroy();
            }

            flatpickrInstance.current = flatpickr(inputRef.current, {
                mode: "single",
                static: true,
                monthSelectorType: "static",
                dateFormat: "d F Y",
                minDate: "today",
                prevArrow:
                    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
                nextArrow:
                    '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
                defaultDate: value || new Date(),
                onChange: (selectedDates) => {
                    if (onChange) {
                        onChange(selectedDates[0]);
                    }
                },
            });
        }

        return () => {
            if (flatpickrInstance.current) {
                flatpickrInstance.current.destroy();
                flatpickrInstance.current = null;
            }
        };
    }, [type, value, onChange]);

    return (
        <input
            ref={inputRef}
            id={id}
            type={type == "date" ? "text" : type}
            name={name}
            placeholder={placeholder}
            defaultValue={value}
            className={twMerge(
                "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-3 bg-transparent text-gray-800 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20",
                className
            )}
            readOnly={type === "date"}
        />
    );
}
