import Confirm from '@/components/alert/confirm'
import Anchor from '@/components/form/anchor'
import Badge from '@/components/form/badge'
import Button from '@/components/form/button'
import OrganizerLayout from '@/layouts/organizer-layout'
import { CalendarDaysIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'

export default function Index({ rooms }) {
    const { delete: destroy, processing } = useForm({})

    const handleDelete = (roomId) => {
        Confirm({
            action: 'delete',
            onConfirm: () => {
                destroy(route('organizer.rooms.destroy', roomId), {
                    preserveScroll: true,
                })
            },
        })
    }

    return (
        <>
            <Head title="Organizer Unit Type & Allotment Management" />

            <OrganizerLayout>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Room List</h1>
                        <Anchor
                            variant="primary"
                            href={route('organizer.rooms.create')}
                        >
                            Add New Room
                        </Anchor>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {rooms && Array.isArray(rooms) ? (
                            rooms.map((room, index) => (
                                <div
                                    key={index}
                                    className="h-full rounded-sm border border-gray-300 p-4"
                                >
                                    <div className="flex justify-between">
                                        <h2 className="mb-3 text-lg font-bold underline">
                                            {room.name}
                                        </h2>

                                        <div>
                                            {room.is_active ? (
                                                <Badge variant="success">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="danger">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3 max-h-72 w-full overflow-hidden rounded-sm">
                                        <img
                                            src={room.cover_image}
                                            alt={`image-${room.name}`}
                                            loading="lazy"
                                            className="h-56 w-full object-cover"
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
                                            <CalendarDaysIcon className="size-4" />
                                            Manage
                                        </Anchor>
                                        <Button
                                            variant="danger"
                                            className="flex items-center gap-1 rounded-sm px-2 py-1"
                                            onClick={() =>
                                                handleDelete(room.id)
                                            }
                                            disabled={processing}
                                        >
                                            <TrashIcon className="size-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3">
                                <p className="text-center text-gray-500">
                                    No rooms found.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
