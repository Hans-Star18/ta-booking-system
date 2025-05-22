import { CalendarIcon } from '@heroicons/react/24/outline'
import 'flatpickr/dist/themes/material_blue.css'
import Flatpickr from 'react-flatpickr'
import Button from '@/components/form/button'
import { useEffect } from 'react'
import Select from '@/components/form/select'

export default function AvailabilityCheck({
    checkInDate,
    checkOutDate,
    allotment,
    setCheckInDate,
    setCheckOutDate,
    setAllotment,
    handleCheckAvailability,
    processing = false,
}) {
    // Fungsi untuk menambahkan 1 hari
    const getNextDay = (date) => {
        if (!date) return new Date()
        const nextDay = new Date(date)
        nextDay.setDate(nextDay.getDate() + 1)
        return nextDay
    }

    useEffect(() => {
        if (checkInDate) {
            if (!checkOutDate || checkOutDate < checkInDate) {
                setCheckOutDate(getNextDay(checkInDate))
            }
        }
    }, [checkInDate])

    const allotmentOptions = [
        {
            value: 1,
            label: '1 Room (s)',
        },
        {
            value: 2,
            label: '2 Room (s)',
        },
        {
            value: 3,
            label: '3 Room (s)',
        },
        {
            value: 4,
            label: '4 Room (s)',
        },
        {
            value: 5,
            label: '5 Room (s)',
        },
        {
            value: 6,
            label: '6 Room (s)',
        },
        {
            value: 7,
            label: '7 Room (s)',
        },
        {
            value: 8,
            label: '8 Room (s)',
        },
        {
            value: 9,
            label: '9 Room (s)',
        },
        {
            value: 10,
            label: '10 Room (s)',
        },
    ]

    return (
        <div className="my-6 w-full rounded-md bg-blue-300 p-2 md:p-6">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-8">
                <div className="relative">
                    <div className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4">
                        <Flatpickr
                            value={checkInDate}
                            onChange={(selectedDates) => {
                                setCheckInDate(selectedDates[0])
                            }}
                            options={{
                                disableMobile: 'true',
                                minDate: 'today',
                                dateFormat: 'd F Y',
                            }}
                            className="h-full w-full text-sm focus:outline-none"
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
                            value={checkOutDate || getNextDay(checkInDate)}
                            onChange={(selectedDates) =>
                                setCheckOutDate(selectedDates[0])
                            }
                            options={{
                                disableMobile: 'true',
                                minDate: getNextDay(checkInDate),
                                dateFormat: 'd F Y',
                            }}
                            className="h-full w-full text-sm focus:outline-none"
                            placeholder="Check Out"
                        />
                    </div>
                    <span className="absolute top-1/2 right-2 z-30 -translate-y-1/2 cursor-pointer md:right-4">
                        <CalendarIcon className="size-6" />
                    </span>
                </div>

                <div>
                    <Select
                        defaultValue={allotment}
                        options={allotmentOptions}
                        onChange={(e) => setAllotment(e.target.value)}
                        className={'w-full bg-white'}
                    />
                </div>

                <div>
                    <Button
                        className={'w-full'}
                        onClick={handleCheckAvailability}
                        disabled={processing}
                    >
                        {processing ? 'Checking...' : 'Check Avaibility'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
