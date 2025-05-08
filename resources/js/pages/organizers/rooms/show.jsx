import { useEffect, useRef, useState } from 'react'
import Currency from '@/components/format/currency'
import OrganizerLayout from '@/layouts/organizer-layout'
import {
    BuildingLibraryIcon,
    CheckIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { Head } from '@inertiajs/react'
import parse from 'html-react-parser'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-responsive-modal'
// import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core'

export default function Show({ room }) {
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
    const [openManageAllotmentModal, setOpenManageAllotmentModal] =
        useState(false)
    const [openBatchUpdateAllotmentModal, setOpenBatchUpdateAllotmentModal] =
        useState(false)
    const [eventStartDate, setEventStartDate] = useState('')
    const [eventEndDate, setEventEndDate] = useState('')

    const onOpenManageAllotmentModal = () => setOpenManageAllotmentModal(true)
    const onCloseManageAllotmentModal = () => setOpenManageAllotmentModal(false)
    const onOpenBatchUpdateAllotmentModal = () =>
        setOpenBatchUpdateAllotmentModal(true)
    const onCloseBatchUpdateAllotmentModal = () =>
        setOpenBatchUpdateAllotmentModal(false)

    const calendarsEvents = {
        Danger: 'danger',
        Success: 'success',
        Primary: 'primary',
        Warning: 'warning',
    }

    useEffect(() => {
        setEvents([
            {
                id: '1',
                title: '5',
                start: new Date().toISOString().split('T')[0],
                extendedProps: { calendar: 'Success' },
            },
            {
                id: '2',
                title: '10',
                start: new Date(Date.now() + 86400000)
                    .toISOString()
                    .split('T')[0],
                extendedProps: { calendar: 'Success' },
            },
            {
                id: '3',
                title: '15',
                start: new Date(Date.now() + 172800000)
                    .toISOString()
                    .split('T')[0],
                extendedProps: { calendar: 'Success' },
            },
        ])
    }, [])

    const handleDateSelect = (selectInfo) => {
        resetModalFields()
        setEventStartDate(selectInfo.startStr)
        setEventEndDate(selectInfo.endStr || selectInfo.startStr)
        onOpenManageAllotmentModal()
    }

    const resetModalFields = () => {
        console.log('resetModalFields')
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
                                    headerToolbar={{
                                        left: 'prev,next',
                                        center: 'title',
                                        right: 'batchUpdateButton',
                                    }}
                                    events={events}
                                    selectable={true}
                                    select={handleDateSelect}
                                    // eventClick={handleEventClick}
                                    eventContent={renderEventContent}
                                    customButtons={{
                                        batchUpdateButton: {
                                            text: 'Batch Update +',
                                            click: () => {
                                                console.log('batch update')
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
                modalId="add-allotment"
                center
            >
                <div className="pt-8">
                    <div className="h-72 w-72 bg-blue-400"></div>
                </div>
            </Modal>
        </>
    )
}
