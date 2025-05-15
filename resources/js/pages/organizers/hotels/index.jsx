import Anchor from '@/components/form/anchor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { Head, Link } from '@inertiajs/react'
import parse from 'html-react-parser'

export default function Index({ hotel }) {
    return (
        <>
            <Head title="Organizer Hotel Management" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Hotel Setting</h1>
                        <Anchor
                            variant="success"
                            href={route('organizer.hotels.edit', hotel.id)}
                        >
                            Edit
                        </Anchor>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Hotel Name
                            </h2>
                            <p className="text-lg font-bold">{hotel.name}</p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Hotel Address
                            </h2>
                            <p className="text-lg font-bold">{hotel.address}</p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Hotel Phone
                            </h2>
                            <p className="text-lg font-bold">{hotel.phone}</p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Hotel Mobile
                            </h2>
                            <p className="text-lg font-bold">{hotel.mobile}</p>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Hotel Email
                            </h2>
                            <Link
                                href={`mailto:${hotel.email}`}
                                className="text-lg font-bold underline"
                            >
                                {hotel.email}
                            </Link>
                        </div>
                        <div className="col-span-3 mb-4 md:col-span-1">
                            <h2 className="text-base text-gray-500 italic">
                                Hotel Website
                            </h2>
                            <Link
                                href={hotel.website}
                                target="_blank"
                                className="text-lg font-bold underline"
                            >
                                {hotel.website}
                            </Link>
                        </div>
                        <div className="col-span-3 mb-4">
                            <h2 className="text-base text-gray-500 italic">
                                Terms and Conditions
                            </h2>
                            <div className="rounded-lg border border-gray-300 p-4 text-base">
                                {parse(hotel.term_and_condition || '')}
                            </div>
                        </div>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
