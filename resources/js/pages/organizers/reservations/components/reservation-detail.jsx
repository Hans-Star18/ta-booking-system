import { useEffect, useMemo, useState } from 'react'
import Currency from '@/components/format/currency'
import { formatDate } from '@/utils/format'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export default function ReservationDetail({ reservation }) {
    const [reservationRooms, setReservationRooms] = useState(
        reservation.reservation_rooms
    )

    useEffect(() => {
        setReservationRooms(reservation.reservation_rooms)
    }, [reservation])

    const extraBedPrice = useMemo(() => {
        return reservationRooms.reduce(
            (acc, curr) => acc + curr.extra_bed_price,
            0
        )
    }, [reservationRooms])

    const extraBedRequirement = useMemo(() => {
        return reservationRooms.reduce(
            (acc, curr) => acc + curr.extra_bed_count,
            0
        )
    }, [reservationRooms])

    return (
        <div className="col-span-2">
            <div className="grid grid-cols-6 gap-4 p-2">
                <span className="col-span-3 font-bold">Room Detail</span>
                <span className="col-span-2 font-bold">Requirement</span>
                <span className="font-bold">Total</span>
            </div>
            <div className="rounded-sm bg-gray-100 p-4 px-2 text-gray-600">
                {reservationRooms.map((res, index) => (
                    <div
                        className="mb-4 grid grid-cols-6 gap-4 text-sm"
                        key={index}
                    >
                        <div className="col-span-3 flex flex-col gap-1">
                            <span className="flex items-center gap-1 font-semibold text-gray-800">
                                {res?.room?.name || '-'}{' '}
                                <a
                                    target="_blank"
                                    href={route(
                                        'organizer.rooms.show',
                                        res?.room?.id
                                    )}
                                >
                                    <ArrowTopRightOnSquareIcon className="ml-1 size-5 !text-gray-500 hover:!text-gray-800" />
                                </a>
                            </span>
                            <div className="flex gap-1">
                                <span>{formatDate(reservation.check_in)}</span>{' '}
                                -
                                <span>{formatDate(reservation.check_out)}</span>
                                <span>({reservation.total_nights} night)</span>
                            </div>
                            <span>Bed: {res?.bed?.name || '-'}</span>
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                            <span>
                                {res.adult_guest} adult & {res.child_guest}{' '}
                                child
                            </span>
                            <span>Extra Bed: {res.extra_bed_count}</span>
                        </div>
                        <span>
                            <Currency
                                value={
                                    res?.room?.price * reservation.total_nights
                                }
                            />
                        </span>
                    </div>
                ))}
                <div className="grid grid-cols-6 gap-4 text-sm">
                    <span className="col-span-3 font-semibold text-gray-800">
                        Extra Bed
                    </span>
                    <span className="col-span-2">
                        {extraBedRequirement} x{' '}
                        <Currency
                            value={reservation?.hotel?.setting?.extra_bed_price}
                        />{' '}
                        x {reservation.total_nights} night(s)
                    </span>
                    <span>
                        <Currency value={extraBedPrice} />
                    </span>
                </div>
            </div>
        </div>
    )
}
