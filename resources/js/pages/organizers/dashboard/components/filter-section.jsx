import Select from '@/components/form/select'
import Flatpickr from 'react-flatpickr'
import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Button from '@/components/form/button'
import { CalendarIcon } from '@heroicons/react/24/outline'

const parseDateFromUrl = (dateString) => {
    if (!dateString) return null
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day) // month is 0-indexed
}

const handleFilter = (periodState, startDate, endDate) => {
    const formatDateForUrl = (date) => {
        if (!date) return ''
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    router.visit(
        `?period=${periodState}&start_date=${formatDateForUrl(startDate)}&end_date=${formatDateForUrl(endDate)}`
    )
}

export function FilterSection({ period }) {
    const [periodState, setPeriodState] = useState(period)
    const searchParams = new URLSearchParams(window.location.search)

    const [startDate, setStartDate] = useState(
        parseDateFromUrl(searchParams.get('start_date'))
    )
    const [endDate, setEndDate] = useState(
        parseDateFromUrl(searchParams.get('end_date'))
    )

    useEffect(() => {
        if (startDate) {
            if (!endDate || endDate < startDate) {
                setEndDate(startDate)
            }
        }
    }, [startDate, endDate])

    return (
        <div className="flex gap-2">
            <Select
                id="period"
                name="period"
                options={[
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' },
                    { value: 'year', label: 'This Year' },
                    { value: 'custom', label: 'Custom' },
                ]}
                defaultValue={periodState}
                onChange={(e) => {
                    setPeriodState(e.target.value)
                    router.visit(`?period=${e.target.value}`)
                }}
                className="w-[150px]"
                placeholder="Select Period"
            />

            {periodState === 'custom' && (
                <div className="flex gap-2">
                    <div className="relative">
                        <div className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4">
                            <Flatpickr
                                value={startDate}
                                onChange={(selectedDates) => {
                                    setStartDate(selectedDates[0])
                                }}
                                options={{
                                    disableMobile: 'true',
                                    dateFormat: 'd F Y',
                                }}
                                className="h-full w-full text-sm focus:outline-none"
                                placeholder="Start Date"
                            />
                        </div>
                        <span className="absolute top-1/2 right-2 z-30 -translate-y-1/2 cursor-pointer md:right-4">
                            <CalendarIcon className="size-6" />
                        </span>
                    </div>
                    <div className="relative">
                        <div className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4">
                            <Flatpickr
                                value={endDate}
                                onChange={(selectedDates) => {
                                    setEndDate(selectedDates[0])
                                }}
                                options={{
                                    disableMobile: 'true',
                                    minDate: startDate,
                                    dateFormat: 'd F Y',
                                }}
                                className="h-full w-full text-sm focus:outline-none"
                                placeholder="End Date"
                            />
                        </div>
                        <span className="absolute top-1/2 right-2 z-30 -translate-y-1/2 cursor-pointer md:right-4">
                            <CalendarIcon className="size-6" />
                        </span>
                    </div>

                    <div>
                        <Button
                            className={'w-full'}
                            onClick={() =>
                                handleFilter(periodState, startDate, endDate)
                            }
                        >
                            Filter
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
