import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import OrganizerLayout from '@/layouts/organizer-layout'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Head, Link } from '@inertiajs/react'

export default function Index({ rooms }) {
    return (
        <>
            <Head title="Organizer Unit Type & Allotment Management" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {rooms.map((room, index) => (
                            <div
                                key={index}
                                className="h-full rounded-sm border border-gray-300 p-4"
                            >
                                <h2 className="mb-3 text-center text-lg font-bold underline">
                                    {room.name}
                                </h2>

                                <div className="mb-3 max-h-72 w-full overflow-hidden rounded-sm">
                                    <img
                                        src={room.cover_image}
                                        alt={`image-${room.name}`}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex justify-between">
                                    <Anchor
                                        variant="primary"
                                        className="flex items-center gap-1 rounded-sm px-2 py-1"
                                        href={route(
                                            'organizer.rooms.show',
                                            room.id
                                        )}
                                    >
                                        <PencilSquareIcon className="size-4" />
                                        Manage
                                    </Anchor>
                                    <Button
                                        variant="danger"
                                        className="flex items-center gap-1 rounded-sm px-2 py-1"
                                    >
                                        <TrashIcon className="size-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
