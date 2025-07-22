import AdminLayout from '@/layouts/admin-layout'
import {
    BuildingOfficeIcon,
    HomeIcon,
    ShieldCheckIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import { Head } from '@inertiajs/react'
import OverviewCard from './components/overview-card'
import BedFrontIcon from '@/components/icons/bed-front-icon'
import CountCard from './components/count-card'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import PieChartLegend from './components/pie-chart-legend'

export default function Index({ userOverview, hotelOverview, itemCount }) {
    const [chartData, setChartData] = useState({
        series: [itemCount.beds, itemCount.amenities, itemCount.policies],
        options: {
            chart: {
                type: 'donut',
            },
            labels: ['Beds', 'Amenities', 'Policies'],
            colors: ['#222ab4', '#7592ff', '#dde9ff'],
            legend: {
                show: false,
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total',
                                fontSize: '18px',
                                color: '#333',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce(
                                        (a, b) => a + b,
                                        0
                                    )
                                },
                            },
                        },
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            responsive: [
                {
                    breakpoint: 700,
                },
            ],
        },
    })

    return (
        <>
            <Head title="Admin Dashboard" />

            <AdminLayout>
                <div className="grid grid-cols-7 gap-6">
                    <div className="col-span-4 grid grid-cols-2 gap-6">
                        <OverviewCard
                            icon={<UsersIcon className="size-6" />}
                            title="Users"
                            value={userOverview.total}
                            increase={userOverview.increase}
                            href={route('admin.users.index')}
                        />

                        <OverviewCard
                            icon={<BuildingOfficeIcon className="size-6" />}
                            title="Hotels"
                            value={hotelOverview.total}
                            increase={hotelOverview.increase}
                            href={route('admin.companies.index')}
                        />
                    </div>

                    <div className="col-span-3 row-span-2">
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <ReactApexChart
                                        options={chartData.options}
                                        series={chartData.series}
                                        type="donut"
                                        height={230}
                                    />
                                </div>
                                <div className="col-span-1 flex h-full flex-col justify-center">
                                    <div className="flex flex-col gap-2">
                                        <PieChartLegend
                                            color="#222ab4"
                                            title="Beds"
                                            value={itemCount.beds}
                                        />
                                        <PieChartLegend
                                            color="#7592ff"
                                            title="Amenities"
                                            value={itemCount.amenities}
                                        />
                                        <PieChartLegend
                                            color="#dde9ff"
                                            title="Policies"
                                            value={itemCount.policies}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 grid grid-cols-3 gap-6">
                        <CountCard
                            icon={<BedFrontIcon className="size-6" />}
                            title="Beds"
                            value={itemCount.beds}
                        />
                        <CountCard
                            icon={<HomeIcon className="size-6" />}
                            title="Amenities"
                            value={itemCount.amenities}
                        />
                        <CountCard
                            icon={<ShieldCheckIcon className="size-6" />}
                            title="Policies"
                            value={itemCount.policies}
                        />
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}
