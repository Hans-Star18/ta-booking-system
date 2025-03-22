import { CalendarIcon } from "@heroicons/react/24/outline";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { useState } from "react";

export default function AvaibilityCheck() {
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    // Fungsi untuk menambahkan 1 hari
    const getNextDay = (date) => {
        if (!date) return "today"; // Jika check-in belum dipilih, gunakan "today"
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
    };

    return (
        <div className="w-full bg-blue-300 my-6 p-2 md:p-6 rounded-md">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10">
                <div className="relative">
                    <div className="h-11 w-full rounded-lg border appearance-none px-2 md:px-4 py-2.5 focus:outline-none focus:ring-3 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20 bg-white">
                        <Flatpickr
                            value={checkInDate}
                            onChange={(selectedDates) => {
                                setCheckInDate(selectedDates[0]);
                                setCheckOutDate(null); // Reset check-out saat check-in berubah
                            }}
                            options={{
                                disableMobile: "true",
                                minDate: "today",
                                dateFormat: "d F Y",
                            }}
                            className="w-full h-full focus:outline-none"
                            placeholder="Check In"
                        />
                    </div>
                    <span className="absolute z-30 -translate-y-1/2 cursor-pointer right-2 md:right-4 top-1/2">
                        <CalendarIcon className="size-6" />
                    </span>
                </div>

                <div className="relative">
                    <div className="h-11 w-full rounded-lg border appearance-none px-2 md:px-4 py-2.5 focus:outline-none focus:ring-3 border-gray-300 focus:border-blue-300 focus:ring-blue-500/20 bg-white">
                        <Flatpickr
                            defaultValue="today"
                            value={checkOutDate || getNextDay(checkInDate)}
                            onChange={(selectedDates) =>
                                setCheckOutDate(selectedDates[0])
                            }
                            options={{
                                disableMobile: "true",
                                minDate: getNextDay(checkInDate), // Minimal harus +1 hari dari check-in
                                dateFormat: "d F Y",
                            }}
                            className="w-full h-full focus:outline-none"
                            placeholder="Check Out"
                        />
                    </div>
                    <span className="absolute z-30 -translate-y-1/2 cursor-pointer right-2 md:right-4 top-1/2">
                        <CalendarIcon className="size-6" />
                    </span>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <button className="w-full bg-blue-500 text-white shadow-xs hover:bg-blue-600 inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm">
                        Check Availability
                    </button>
                </div>
            </div>
        </div>
    );
}
