import ReactApexChart from 'react-apexcharts'
import { FilterSection } from './filter-section'
import Currency from '@/components/format/currency'

export default function TransactionSummary({ chartData, period }) {
    const chartOptions = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
            },
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#00c951', '#f0b100'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth',
        },
        title: {
            text: 'Transaction & Income',
            align: 'left',
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
        xaxis: chartData.xaxis,
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        tooltip: {
            y: {
                formatter: function (val, opts) {
                    if (opts.seriesIndex === 0) {
                        return val.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                        })
                    }
                    return val
                },
            },
        },
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Transaction</h1>
                <FilterSection period={period} />
            </div>

            <div className="w-full overflow-x-auto">
                <ReactApexChart
                    options={chartOptions}
                    series={chartData.series}
                    type="line"
                    height={350}
                    width={1148}
                />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {chartData.series.map((item, index) => {
                    const total = item.data.reduce((sum, val) => sum + val, 0)
                    const colors = ['bg-green-500', 'bg-yellow-500']
                    const isIncome = item.name.toLowerCase().includes('income')

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
                                        {isIncome ? (
                                            <Currency value={total} />
                                        ) : (
                                            total
                                        )}
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
