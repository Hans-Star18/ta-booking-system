import ReactApexChart from 'react-apexcharts'
import { FilterSection } from './filter-section'
import { useState } from 'react'

export default function ReservationSummary({ chartData, period }) {
    const [chartDataReservation, _] = useState({
        series: chartData.series,
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
            xaxis: chartData.xaxis,
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

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Reservation</h1>

                <FilterSection period={period} />
            </div>

            <div className="w-full overflow-x-auto">
                <ReactApexChart
                    options={chartDataReservation.options}
                    series={chartDataReservation.series}
                    type="bar"
                    height={350}
                    width={1148}
                />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {chartDataReservation.series.map((item, index) => {
                    const total = item.data.reduce((sum, val) => sum + val, 0)
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
    )
}
