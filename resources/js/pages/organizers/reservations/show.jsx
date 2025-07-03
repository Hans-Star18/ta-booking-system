import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Head } from '@inertiajs/react'
import CustomerSection from '@/pages/organizers/reservations/components/customer-section'
import ReservationSection from '@/pages/organizers/reservations/components/reservation-section'

export default function Show({ reservation }) {
    return (
        <>
            <Head title="Reservation Details" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-8">
                    <div className="mb-4 flex w-full items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Reservation Details
                        </h1>

                        <div className="flex gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.dashboard')}
                                className="flex items-center gap-1"
                            >
                                <ArrowLeftIcon className="size-4" />
                                Back
                            </Anchor>
                            <Anchor
                                variant="success"
                                href={route(
                                    'organizer.reservations.edit',
                                    reservation
                                )}
                                className="flex items-center gap-1"
                            >
                                <PencilSquareIcon className="size-4" />
                                Edit
                            </Anchor>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <CustomerSection reservation={reservation} />
                        <ReservationSection reservation={reservation} />
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
