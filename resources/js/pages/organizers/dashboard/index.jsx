import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import ReservationSummary from './components/reservation-summary'
import TransactionSummary from './components/transaction-summary'
import GuestSummary from './components/guest-summary'

export default function Index({ charts, period, guestSummary }) {
    const [activeTab, setActiveTab] = useState('reservations')

    const tabs = [
        {
            name: 'Reservations',
            value: 'reservations',
        },
        {
            name: 'Transactions',
            value: 'transactions',
        },
        {
            name: 'Guests',
            value: 'guests',
        },
    ]

    if (
        !charts['reservation'] ||
        charts['reservation'].length === 0 ||
        !charts['transaction'] ||
        charts['transaction'].length === 0
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
                    <div className="mb-5 border-b border-blue-200 text-center text-sm font-medium text-gray-500">
                        <ul className="-mb-px flex flex-wrap">
                            {tabs.map((tab) => (
                                <li className="me-2" key={tab.value}>
                                    <button
                                        className={`inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:cursor-pointer hover:border-blue-300 hover:text-gray-600 ${activeTab === tab.value ? 'bg-blue-100 text-gray-600' : ''}`}
                                        onClick={() => setActiveTab(tab.value)}
                                    >
                                        {tab.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        {activeTab === 'reservations' && (
                            <ReservationSummary
                                chartData={charts['reservation']}
                                period={period}
                            />
                        )}

                        {activeTab === 'transactions' && (
                            <TransactionSummary
                                chartData={charts['transaction']}
                                period={period}
                            />
                        )}

                        {activeTab === 'guests' && (
                            <GuestSummary guestSummary={guestSummary} />
                        )}
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
