import { useEffect, useRef, useState } from 'react'
import Currency from '@/components/format/currency'
import OrganizerLayout from '@/layouts/organizer-layout'
import {
    BookmarkSquareIcon,
    BuildingLibraryIcon,
    CheckIcon,
    ChevronDoubleRightIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'
import parse from 'html-react-parser'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-responsive-modal'
import Button from '@/components/form/button'
import Input from '@/components/form/input'

export default function Show({ room, allotments }) {
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
    const [onRes, setOnRes] = useState(0)
    const [available, setAvailable] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [openManageAllotmentModal, setOpenManageAllotmentModal] =
        useState(false)
    const [openBatchUpdateAllotmentModal, setOpenBatchUpdateAllotmentModal] =
        useState(false)
    const { data, setData, post, processing, errors } = useForm({
        date: '',
        allotment: '',
    })

    const onOpenManageAllotmentModal = () => setOpenManageAllotmentModal(true)
    const onCloseManageAllotmentModal = () => setOpenManageAllotmentModal(false)
    const onOpenBatchUpdateAllotmentModal = () =>
        setOpenBatchUpdateAllotmentModal(true)
    const onCloseBatchUpdateAllotmentModal = () =>
        setOpenBatchUpdateAllotmentModal(false)

    useEffect(() => {
        const startDate = new Date(new Date().getFullYear() - 3, 0, 1)
        const endDate = new Date(new Date().getFullYear() + 3, 11, 31)

        const defaultEvents = generateDefaultEvents(startDate, endDate)
        const specificEvents = (allotments || []).map((a) => ({
            id: `allotment-${a.id}`,
            title: a.allotment,
            start: a.date,
            extendedProps: {
                calendar: 'Success',
                allotment: a.allotment,
                onRes: 0,
                available: 0,
            },
        }))

        setEvents(mergeEvents(defaultEvents, specificEvents))
    }, [allotments])

    const handleEventClick = (clickInfo) => {
        const event = clickInfo.event
        setData({
            date: event.start,
            allotment: event.extendedProps.allotment,
        })
        setOnRes(0)
        setAvailable(0)
        onOpenManageAllotmentModal()
    }

    const handleUpdateClick = () => {
        setIsEditing(true)
    }

    const handleSaveChanges = () => {
        post(route('organizer.rooms.allotment', { room: room.id }), {
            preserveScroll: true,
            onSuccess: (response) => {
                setIsEditing(false)
                if (response.props.alert?.type === 'error') {
                    onCloseManageAllotmentModal()
                }
            },
        })
    }

    const generateDefaultEvents = (start, end) => {
        const events = []
        const currentDate = new Date(start)

        while (currentDate <= end) {
            events.push({
                id: `default-${currentDate.toISOString().split('T')[0]}`,
                title: 'Close',
                start: currentDate.toISOString().split('T')[0],
                extendedProps: {
                    calendar: 'Danger',
                    allotment: 0,
                    onRes: 0,
                    available: 0,
                },
            })
            currentDate.setDate(currentDate.getDate() + 1)
        }

        return events
    }

    const mergeEvents = (defaults, specifics) => {
        return defaults.map((event) => {
            const found = specifics.find((e) => e.start === event.start)
            return found || event
        })
    }

    const renderEventContent = (eventInfo) => {
        const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`
        return (
            <div
                className={`event-fc-color fc-event-main flex ${colorClass} items-center rounded-sm p-1`}
            >
                <div className="mr-2 flex items-center gap-2 font-bold text-slate-900">
                    <BuildingLibraryIcon className="size-5" /> =
                </div>
                <div className="fc-event-title">{eventInfo.event.title}</div>
            </div>
        )
    }

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
                            <div className="text-gray-600">
                                {parse(room.description || '')}
                            </div>
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

                            <div className="custom-calendar">
                                <FullCalendar
                                    ref={calendarRef}
                                    plugins={[
                                        dayGridPlugin,
                                        timeGridPlugin,
                                        interactionPlugin,
                                    ]}
                                    initialView="dayGridMonth"
                                    timeZone="Asia/Makassar"
                                    headerToolbar={{
                                        left: 'prev,next',
                                        center: 'title',
                                        right: 'batchUpdateButton',
                                    }}
                                    events={events}
                                    selectable={true}
                                    eventClick={handleEventClick}
                                    eventContent={renderEventContent}
                                    customButtons={{
                                        batchUpdateButton: {
                                            text: 'Batch Update +',
                                            click: () => {
                                                onOpenBatchUpdateAllotmentModal()
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </OrganizerLayout>

            <Modal
                open={openManageAllotmentModal}
                onClose={onCloseManageAllotmentModal}
                modalId="manage-allotment"
                center
                classNames={{
                    modal: 'rounded-sm shadow-md',
                }}
            >
                <div className="pt-8">
                    <div className="h-fit w-72">
                        <div className="w-full p-4">
                            <form action="" method="POST">
                                <div className="mb-4 flex items-center border-b border-gray-500 pb-2 text-slate-700">
                                    <p className="w-24">Allotment</p>
                                    {isEditing ? (
                                        <div className="flex flex-1 items-center gap-2">
                                            <span>:</span>
                                            <Input
                                                id="allotment"
                                                type="number"
                                                name="allotment"
                                                value={data.allotment}
                                                onChange={(e) =>
                                                    setData(
                                                        'allotment',
                                                        e.target.value
                                                    )
                                                }
                                                className="h-6 flex-1 px-2 py-1"
                                            />
                                        </div>
                                    ) : (
                                        <p>: {data.allotment || 0}</p>
                                    )}
                                </div>
                                <div className="mb-4 flex items-center border-b border-gray-500 pb-2 text-slate-700">
                                    <p className="w-24">On Res</p>
                                    <p>: {onRes}</p>
                                </div>
                                <div className="mb-4 flex items-center border-b border-gray-500 pb-2 text-slate-700">
                                    <p className="w-24">Available</p>
                                    <p>: {available}</p>
                                </div>
                                <div className="flex justify-end">
                                    {isEditing ? (
                                        <Button
                                            variant="primary"
                                            className="flex items-center gap-1 rounded-sm px-2 py-1"
                                            onClick={handleSaveChanges}
                                            disabled={processing}
                                        >
                                            <BookmarkSquareIcon className="size-4" />
                                            Save Changes
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="success"
                                            className="flex items-center gap-1 rounded-sm px-2 py-1"
                                            onClick={handleUpdateClick}
                                            disabled={processing}
                                        >
                                            <PencilSquareIcon className="size-4" />
                                            Update
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                open={openBatchUpdateAllotmentModal}
                onClose={onCloseBatchUpdateAllotmentModal}
                modalId="batch-update-allotment"
                center
                classNames={{
                    modal: 'rounded-sm shadow-md',
                }}
            >
                <div className="pt-8">
                    <div className="h-fit w-72">
                        <div className="w-full p-4"></div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
