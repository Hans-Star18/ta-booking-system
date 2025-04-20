import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'

export default function Show({ room }) {
    return (
        <>
            <Head
                title={`${room.name} - Organizer Unit Type & Allotment Management`}
            />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="col-span-3">
                            <h1 className="text-2xl font-bold">{room.name}</h1>
                        </div>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
