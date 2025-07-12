import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Head } from '@inertiajs/react'
import CustomerSection from '@/pages/organizers/reservations/components/customer-section'
import ReservationSection from '@/pages/organizers/reservations/components/reservation-section'

export default function Edit({ reservation }) {
    return (
        <>
            <Head title="Edit Reservation" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex w-full items-center justify-between">
                        <h1 className="text-2xl font-bold">Edit Reservation</h1>

                        <div className="flex gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.dashboard')}
                                className="flex items-center gap-1"
                            >
                                <ArrowLeftIcon className="size-4" />
                                Back
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
