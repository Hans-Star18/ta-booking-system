import { useEffect, useRef, useState } from 'react'
import {
    BookmarkSquareIcon,
    BuildingLibraryIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { useForm } from '@inertiajs/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Modal from 'react-responsive-modal'
import Button from '@/components/form/button'
import Input from '@/components/form/input'
import Flatpickr from 'react-flatpickr'
import ValidationFeedback from '@/components/form/validation-feedback'

export default function AllotmentManagementCalendar({ room, allotments }) {
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
    const [onRes, setOnRes] = useState(0)
    const [available, setAvailable] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [openManageAllotmentModal, setOpenManageAllotmentModal] =
        useState(false)
    const [openBatchUpdateAllotmentModal, setOpenBatchUpdateAllotmentModal] =
        useState(false)
    const {
        data: singleData,
        setData: setSingleData,
        post: postSingle,
        processing: processingSingle,
    } = useForm({
        date: '',
        allotment: '',
    })
    const {
        data: batchData,
        setData: setBatchData,
        post: postBatch,
        processing: processingBatch,
        errors: errorsBatch,
    } = useForm({
        start_date: '',
        end_date: '',
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
        setSingleData({
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
        postSingle(route('organizer.rooms.allotment', { room: room.id }), {
            preserveScroll: true,
            onSuccess: (response) => {
                setIsEditing(false)
                if (response.props.alert?.type === 'error') {
                    onCloseManageAllotmentModal()
                }
            },
        })
    }

    const handleBatchModalOpen = () => {
        setBatchData({
            start_date: '',
            end_date: '',
            allotment: '',
        })
        errorsBatch.start_date = null
        errorsBatch.end_date = null
        errorsBatch.allotment = null
        setOpenBatchUpdateAllotmentModal(true)
    }

    const handleBatchUpdate = () => {
        postBatch(route('organizer.rooms.allotment.batch', { room: room.id }), {
            preserveScroll: true,
            onSuccess: () => {
                onCloseBatchUpdateAllotmentModal()
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
            <div className="custom-calendar">
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                            click: handleBatchModalOpen,
                        },
                    }}
                />
            </div>

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
                            <form>
                                <div className="mb-4 flex items-center border-b border-gray-500 pb-2 text-slate-700">
                                    <p className="w-24">Allotment</p>
                                    {isEditing ? (
                                        <div className="flex flex-1 items-center gap-2">
                                            <span>:</span>
                                            <Input
                                                id="allotment"
                                                type="number"
                                                name="allotment"
                                                value={singleData.allotment}
                                                onChange={(e) =>
                                                    setSingleData(
                                                        'allotment',
                                                        e.target.value
                                                    )
                                                }
                                                className="h-6 flex-1 px-2 py-1"
                                            />
                                        </div>
                                    ) : (
                                        <p>: {singleData.allotment || 0}</p>
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
                                            disabled={processingSingle}
                                        >
                                            <BookmarkSquareIcon className="size-4" />
                                            Save Changes
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="success"
                                            className="flex items-center gap-1 rounded-sm px-2 py-1"
                                            onClick={handleUpdateClick}
                                            disabled={processingSingle}
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
                    <div className="h-fit w-full">
                        <div className="w-full p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div
                                        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4 ${
                                            errorsBatch.start_date
                                                ? 'ring ring-red-500'
                                                : ''
                                        }`}
                                    >
                                        <Flatpickr
                                            value={batchData.start_date}
                                            onChange={(selectedDates) => {
                                                setBatchData(
                                                    'start_date',
                                                    selectedDates[0]
                                                )
                                            }}
                                            options={{
                                                disableMobile: 'true',
                                                minDate: 'today',
                                                dateFormat: 'd F Y',
                                            }}
                                            className="h-full w-full focus:outline-none"
                                            placeholder="Start Date"
                                        />
                                    </div>
                                    <ValidationFeedback
                                        message={errorsBatch.start_date}
                                    />
                                </div>

                                <div>
                                    <div
                                        className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-white px-2 py-2.5 focus:border-blue-300 focus:ring-3 focus:ring-blue-500/20 focus:outline-none md:px-4 ${
                                            errorsBatch.end_date
                                                ? 'ring ring-red-500'
                                                : ''
                                        }`}
                                    >
                                        <Flatpickr
                                            value={batchData.end_date}
                                            onChange={(selectedDates) => {
                                                setBatchData(
                                                    'end_date',
                                                    selectedDates[0]
                                                )
                                            }}
                                            options={{
                                                disableMobile: 'true',
                                                minDate: 'today',
                                                dateFormat: 'd F Y',
                                            }}
                                            className="h-full w-full focus:outline-none"
                                            placeholder="End Date"
                                        />
                                    </div>
                                    <ValidationFeedback
                                        message={errorsBatch.end_date}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Input
                                        id="allotment-batch"
                                        type="number"
                                        name="allotment-batch"
                                        placeholder="Allotment"
                                        value={batchData.allotment}
                                        onChange={(e) =>
                                            setBatchData(
                                                'allotment',
                                                e.target.value
                                            )
                                        }
                                        className={
                                            errorsBatch.allotment
                                                ? 'ring ring-red-500'
                                                : ''
                                        }
                                    />
                                    <ValidationFeedback
                                        message={errorsBatch.allotment}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Button
                                        variant="primary"
                                        onClick={handleBatchUpdate}
                                        disabled={processingBatch}
                                    >
                                        Update Batch
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
