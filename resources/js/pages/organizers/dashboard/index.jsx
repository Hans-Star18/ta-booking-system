import Button from '@/components/form/button'
import Select from '@/components/form/select'
import OrganizerLayout from '@/layouts/organizer-layout'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { Head, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import Flatpickr from 'react-flatpickr'

const parseDateFromUrl = (dateString) => {
    if (!dateString) return null
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day) // month is 0-indexed
}

export default function Index({ chartDataReservation, period }) {
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

    function handleFilter(periodState, startDate, endDate) {
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

    const defaultChartData = {
        series: [
            { name: 'Confirmed', data: [] },
            { name: 'Cancelled', data: [] },
            { name: 'Pending', data: [] },
        ],
        xaxis: {
            type: 'datetime',
            categories: [],
            labels: {
                format: 'dd/MM/yyyy',
            },
        },
    }

    const safeChartData = chartDataReservation || defaultChartData

    const [chartData, _] = useState({
        series: safeChartData.series || defaultChartData.series,
        options: {
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 2,
                    borderRadiusApplication: 'end', // 'around', 'end'
                    borderRadiusWhenStacked: 'last', // 'all', 'last'
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '12px',
                                fontWeight: 900,
                            },
                        },
                    },
                },
            },
            chart: {
                height: 350,
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            xaxis: safeChartData.xaxis || defaultChartData.xaxis,
            legend: {
                position: 'bottom',
            },
            fill: {
                opacity: 1,
            },
            colors: ['#00c951', '#f0b100', '#fb2c36'],
            responsive: [
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            width: '100%',
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    })

    if (
        !chartDataReservation ||
        !chartDataReservation.series ||
        chartDataReservation.series.length === 0
    ) {
        return (
            <>
                <Head title="Organizer Dashboard" />
                <OrganizerLayout>
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                        </div>
                        <div className="flex h-[350px] items-center justify-center">
                            <div className="text-center">
                                <div className="mb-2 text-gray-500">
                                    Loading chart data...
                                </div>
                                <div className="text-sm text-gray-400">
                                    No reservation data available
                                </div>
                            </div>
                        </div>
                    </div>
                </OrganizerLayout>
            </>
        )
    }

    return (
        <>
            <Head title="Organizer Dashboard" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Dashboard</h1>

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
                                                    setStartDate(
                                                        selectedDates[0]
                                                    )
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
                                                handleFilter(
                                                    periodState,
                                                    startDate,
                                                    endDate
                                                )
                                            }
                                        >
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            height={350}
                            width={1148}
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {chartData.series.map((item, index) => {
                            const total = item.data.reduce(
                                (sum, val) => sum + val,
                                0
                            )
                            const colors = [
                                'bg-green-500',
                                'bg-yellow-500',
                                'bg-red-500',
                            ]

                            return (
                                <div
                                    key={index}
                                    className="rounded-lg border border-gray-200 p-4"
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`h-3 w-3 rounded-full ${colors[index]} mr-2`}
                                        ></div>
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {item.name}
                                            </p>
                                            <p className="text-2xl font-bold">
                                                {total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
