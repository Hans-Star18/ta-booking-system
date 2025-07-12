import OrganizerLayout from '@/layouts/organizer-layout'
import {
    ArrowLeftIcon,
    CheckIcon,
    ChevronDoubleRightIcon,
    PencilSquareIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline'
import { Head } from '@inertiajs/react'
import AllotmentManagementCalendar from '@/components/calendar/allotment-management-calendar'
import Anchor from '@/components/form/anchor'
import Currency from '@/components/format/currency'
import HTMLReactParser from 'html-react-parser'

export default function Show({ room, allotments }) {
    return (
        <>
            <Head
                title={`${room.name} - Organizer Unit Type & Allotment Management`}
            />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex w-full items-center justify-between">
                        <h1 className="text-2xl font-bold">{room.name}</h1>

                        <div className="flex gap-2">
                            <Anchor
                                variant="secondary"
                                href={route('organizer.rooms.index')}
                                className="flex items-center gap-1"
                            >
                                <ArrowLeftIcon className="size-4" />
                                Back
                            </Anchor>
                            <Anchor
                                variant="success"
                                href={route('organizer.rooms.edit', room)}
                                className="flex items-center gap-1"
                            >
                                <PencilSquareIcon className="size-4" />
                                Edit
                            </Anchor>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="overflow-hidden rounded-sm">
                            <img
                                src={room.cover_image}
                                alt={`image-${room.name}`}
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="col-span-2">
                            <h2 className="mb-3 text-lg font-bold">
                                Description
                            </h2>
                            <div className="mb-3 text-gray-600">
                                {HTMLReactParser(room.description || '')}
                            </div>
                            <Anchor
                                variant="primary"
                                href={route(
                                    'organizer.rooms.photos.create',
                                    room
                                )}
                                className="flex w-fit items-center gap-2"
                            >
                                <PhotoIcon className="size-4" />
                                Add Photo
                            </Anchor>
                        </div>

                        <div>
                            <h2 className="mb-3 text-lg font-bold">
                                Amenities
                            </h2>
                            <div className="grid grid-cols-2 gap-2 text-gray-600">
                                {room.amenities.map((amenity) => (
                                    <div
                                        className="flex items-center gap-2"
                                        key={amenity.id}
                                    >
                                        <CheckIcon className="size-4 font-bold" />{' '}
                                        {amenity.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="mb-3">
                                <h2 className="mb-3 text-lg font-bold">Beds</h2>
                                <div className="grid grid-cols-2 gap-2 text-gray-600">
                                    {room.beds.map((bed) => (
                                        <div
                                            className="flex items-center gap-2"
                                            key={bed.id}
                                        >
                                            <CheckIcon className="size-4 font-bold" />{' '}
                                            {bed.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <h2 className="mb-3 text-lg font-bold">
                                    Policies
                                </h2>
                                <div className="grid grid-cols-2 gap-2 text-gray-600">
                                    {room.policies.map((policy) => (
                                        <div
                                            className="flex items-center gap-2"
                                            key={policy.id}
                                        >
                                            <CheckIcon className="size-4 font-bold" />{' '}
                                            {policy.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-3">
                                <h2 className="text-lg font-bold">
                                    Max Occupancy
                                </h2>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <ChevronDoubleRightIcon className="size-4" />
                                    {room.max_occupancy}{' '}
                                    <span className="text-sm">
                                        (Max {room.max_occupancy} guests)
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <h2 className="text-lg font-bold">Price</h2>

                                <div className="flex items-center gap-2 text-gray-600">
                                    <ChevronDoubleRightIcon className="size-4" />
                                    <Currency value={room.price} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <h2 className="mb-3 text-lg font-bold">
                                Allotments
                            </h2>
                            <AllotmentManagementCalendar
                                room={room}
                                allotments={allotments}
                            />
                        </div>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
