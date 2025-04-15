import { CalendarIcon } from '@heroicons/react/24/outline'
import 'flatpickr/dist/themes/material_blue.css'
import Flatpickr from 'react-flatpickr'
import Button from '@/components/form/button'

export default function AvailabilityCheck({
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
}) {
    // Fungsi untuk menambahkan 1 hari
    const getNextDay = (date) => {
        if (!date) return 'today' // Jika check-in belum dipilih, gunakan "today"
        const nextDay = new Date(date)
        nextDay.setDate(nextDay.getDate() + 1)
        return nextDay
    }

    return (
        <div className="my-6 w-full rounded-md bg-blue-300 p-2 md:p-6">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-10">
                <div className="relative">
                    <div className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4">
                        <Flatpickr
                            value={checkInDate}
                            onChange={(selectedDates) => {
                                setCheckInDate(selectedDates[0])
                                setCheckOutDate(null)
                            }}
                            options={{
                                disableMobile: 'true',
                                minDate: 'today',
                                dateFormat: 'd F Y',
                            }}
                            className="h-full w-full focus:outline-none"
                            placeholder="Check In"
                        />
                    </div>
                    <span className="absolute top-1/2 right-2 z-30 -translate-y-1/2 cursor-pointer md:right-4">
                        <CalendarIcon className="size-6" />
                    </span>
                </div>

                <div className="relative">
                    <div className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4">
                        <Flatpickr
                            defaultValue="today"
                            value={checkOutDate || getNextDay(checkInDate)}
                            onChange={(selectedDates) =>
                                setCheckOutDate(selectedDates[0])
                            }
                            options={{
                                disableMobile: 'true',
                                minDate: getNextDay(checkInDate),
                                dateFormat: 'd F Y',
                            }}
                            className="h-full w-full focus:outline-none"
                            placeholder="Check Out"
                        />
                    </div>
                    <span className="absolute top-1/2 right-2 z-30 -translate-y-1/2 cursor-pointer md:right-4">
                        <CalendarIcon className="size-6" />
                    </span>
                </div>

                <div className="col-span-2 md:col-span-1">
                    <Button className={'w-full'}>Check Avaibility</Button>
                </div>
            </div>
        </div>
    )
}
