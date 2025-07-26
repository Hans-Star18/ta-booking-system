import Footer from '@/components/footer'
import CustomerLayout from '@/layouts/customer-layout'
import { Head } from '@inertiajs/react'
import {
    CheckCircleIcon,
    ClockIcon,
    PaperAirplaneIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline'
import Anchor from '@/components/form/anchor'

export default function ReservationFinish({ reservation = null }) {
    const statusIcons = {
        settlement: <CheckCircleIcon className="h-24 w-24 text-green-500" />,
        capture: <CheckCircleIcon className="h-24 w-24 text-green-500" />,
        pending: <ClockIcon className="h-24 w-24 text-yellow-500" />,
        expire: <XCircleIcon className="h-24 w-24 text-red-500" />,
        default: <PaperAirplaneIcon className="h-24 w-24 text-blue-500" />,
    }

    const getStatusIcon = (status) => {
        return statusIcons[status] || statusIcons.default
    }

    const statusTitle = {
        settlement: 'Reservation Successful',
        capture: 'Reservation Successful',
        pending: 'Reseravtion Pending',
        expire: 'Reservation Expired',
        default: 'Reservation Unknown',
    }

    const statusBody = {
        settlement: (
            reservationNumber
        ) => `Your reservation has been successfully completed and payment has been settled.
            Reservation Number: <strong>${reservationNumber}</strong>
            Thank you for choosing us!
            We look forward to serving you.
            You will receive a confirmation email shortly with all the details of your reservation.
            You can check your reservation details using the button below.`,
        capture: (
            reservationNumber
        ) => `Your reservation has been successfully completed and payment has been captured.
            Reservation Number: <strong>${reservationNumber}</strong>
            Thank you for choosing us!
            We look forward to serving you.
            You will receive a confirmation email shortly with all the details of your reservation.
            You can check your reservation details using the button below.`,
        pending: (
            reservationNumber
        ) => `Your reservation is currently pending payment confirmation.
            Reservation Number: <strong>${reservationNumber}</strong>
            Please complete the payment process to secure your reservation.
            You will receive a confirmation email once the payment is confirmed.
            You can check your reservation status using the button below.`,
        expire: (
            reservationNumber
        ) => `Your reservation has expired due to incomplete payment.
            Reservation Number: <strong>${reservationNumber}</strong>
            Please make a new reservation if you still wish to book with us.
            If you believe this is an error, please contact our customer service.
            You can check your reservation details using the button below.`,
        default: (
            reservationNumber
        ) => `We are unable to determine the status of your reservation.
            Reservation Number: <strong>${reservationNumber}</strong>
            Please contact our customer service for assistance.
            We apologize for any inconvenience caused.
            You can check your reservation details using the button below.`,
    }

    const getStatusTitle = (status) => {
        return statusTitle[status] || statusTitle.default
    }

    const getStatusBody = (status, reservationNumber) => {
        return (
            statusBody[status]?.(reservationNumber) ||
            statusBody.default(reservationNumber)
        )
    }

    return (
        <>
            <Head title="Reservation Finish" />

            <CustomerLayout currenStep={4} hotel={reservation.hotel}>
                <div className="mt-6 w-full bg-gray-100 p-4">
                    <div className="flex w-full justify-center">
                        {getStatusIcon(reservation.transaction?.payment_status)}
                    </div>

                    <h1 className="mt-4 text-center text-2xl font-semibold">
                        {getStatusTitle(
                            reservation.transaction?.payment_status
                        )}
                    </h1>
                    <p
                        className="mt-2 text-center whitespace-pre-line text-gray-600"
                        dangerouslySetInnerHTML={{
                            __html: getStatusBody(
                                reservation.transaction?.payment_status,
                                reservation.reservation_number
                            ),
                        }}
                    />

                    <div className="mt-6 flex justify-center gap-4">
                        <Anchor
                            href={route(
                                'customer.reservation.index',
                                reservation.hotel.uuid
                            )}
                            variant="primary"
                        >
                            Back To Home
                        </Anchor>
                        <a
                            className="cursor-pointer rounded-md bg-teal-500 px-4 py-3 text-sm text-white shadow-xs transition hover:bg-teal-600"
                            href={route('customer.transaction.check', {
                                reservation_number:
                                    reservation.reservation_number,
                            })}
                            target="_blank"
                        >
                            View Transaction Details
                        </a>
                    </div>
                </div>

                <Footer />
            </CustomerLayout>
        </>
    )
}
