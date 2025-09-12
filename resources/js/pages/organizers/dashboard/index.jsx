import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { FilterSection } from './components/filter-section'

export default function Index({ chartDataReservation, period }) {
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

                        <FilterSection period={period} />
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
