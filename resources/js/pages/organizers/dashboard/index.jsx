import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

export default function Index() {
    const [chartData, _] = useState({
        series: [
            {
                name: 'Actual',
                data: [
                    {
                        x: '2011',
                        y: 1292,
                    },
                    {
                        x: '2012',
                        y: 4432,
                    },
                    {
                        x: '2013',
                        y: 5423,
                    },
                    {
                        x: '2014',
                        y: 6653,
                    },
                    {
                        x: '2015',
                        y: 8133,
                    },
                    {
                        x: '2016',
                        y: 7132,
                    },
                    {
                        x: '2017',
                        y: 7332,
                    },
                    {
                        x: '2018',
                        y: 6553,
                    },
                ],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            colors: ['#2b7fff'],
        },
    })

    return (
        <>
            <Head title="Organizer Dashboard" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                    </div>

                    <div className="max-w-[1200px] overflow-x-auto">
                        <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
