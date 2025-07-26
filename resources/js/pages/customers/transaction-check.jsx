import { Head, useForm } from '@inertiajs/react'
import Footer from '@/components/footer'
import Input from '@/components/form/input'
import LoadAlert from '@/components/alert/load-alert'
import Toast from '@/components/alert/toast'
import Currency from '@/components/format/currency'
import { useState, useEffect } from 'react'

const PriceSummary = ({
    subtotal,
    discountPercentage,
    discountTotal,
    taxPercentage,
    taxAmount,
    totalPrice,
    dpPercentage,
    payNow,
    balanceToBePaid,
}) => (
    <>
        <div className="grid grid-cols-4">
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                <p className="text-sm">Subtotal</p>
            </div>
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                <Currency value={subtotal} className="text-sm" />
            </div>
        </div>
        <div className="grid grid-cols-4">
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                <p className="text-sm">
                    Discount (
                    {discountPercentage
                        ? `${discountPercentage}%`
                        : 'Promotion Code'}
                    )
                </p>
            </div>
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                <Currency value={discountTotal} className="text-sm" />
            </div>
        </div>
        <div className="grid grid-cols-4">
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                <p className="text-sm">Tax {taxPercentage}%</p>
            </div>
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                <Currency value={taxAmount} className="text-sm" />
            </div>
        </div>
        <div className="grid grid-cols-4">
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                <p className="text-sm">Total Cost</p>
            </div>
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                <Currency value={totalPrice} className="text-sm" />
            </div>
        </div>
        <div className="grid grid-cols-4 bg-blue-200">
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                <p className="text-sm font-semibold">
                    Pay Now ({dpPercentage}%)
                </p>
            </div>
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                <Currency value={payNow} className="text-sm font-semibold" />
            </div>
        </div>
        <div className="grid grid-cols-4">
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                <p className="text-sm">
                    Balance to be paid at hotel when check-in
                </p>
            </div>
            <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                <Currency
                    value={balanceToBePaid}
                    className="text-sm font-semibold"
                />
            </div>
        </div>
    </>
)

export default function TransactionCheck({ reservation = null }) {
    const alert = LoadAlert()
    const [discountPercentage, setDiscountPercentage] = useState(0)

    const searchParams = new URLSearchParams(window.location.search)
    const { data, setData } = useForm({
        reservation_number: searchParams.get('reservation_number') ?? '',
    })

    const getDiscountPercentage = async (code = '') => {
        fetch(
            route('customer.promotion-code.check', {
                code,
            }),
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data.promotion_code) {
                    setDiscountPercentage(0)
                    return
                }
                setDiscountPercentage(data.promotion_code.discount)
            })
    }

    useEffect(() => {
        if (reservation?.transaction?.promotion_code) {
            getDiscountPercentage(reservation.transaction.promotion_code)
        }
    }, [reservation])

    const badgeBackground = {
        pending: 'bg-yellow-300',
        success: 'bg-green-300',
        capture: 'bg-green-300',
        settlement: 'bg-green-300',
        deny: 'bg-red-300',
        expire: 'bg-red-300',
    }

    return (
        <>
            {alert && (
                <Toast
                    message={alert.message}
                    type={alert.type}
                    id={alert._id}
                />
            )}
            <Head title="Transaction Check" />

            <div className="px-6 lg:px-10">
                <div className="container m-auto pt-10 md:max-w-7xl">
                    <h2 className="text-2xl font-bold">Transaction Check</h2>
                    <hr className="mb-4 w-full text-gray-300" />
                    <div className="mb-3 flex flex-col justify-start gap-3 md:flex-row">
                        <Input
                            id={'reservation-number'}
                            name={'reservation-number'}
                            placeholder="Reservation Number"
                            defaultValue={data.reservation_number}
                            onChange={(e) =>
                                setData({
                                    reservation_number: e.target.value,
                                })
                            }
                            className="h-11 w-full rounded-sm py-2 md:w-100"
                        />

                        <a
                            className="cursor-pointer rounded-sm bg-blue-500 px-4 py-3 text-sm text-white shadow-xs transition hover:bg-blue-600"
                            href={route('customer.transaction.check', {
                                reservation_number: data.reservation_number,
                            })}
                        >
                            Check Transaction
                        </a>
                    </div>

                    {reservation && (
                        <div>
                            <h2 className="mb-3 text-2xl font-bold">
                                Transaction Detail
                            </h2>

                            <div className="mb-3 flex flex-col gap-2">
                                <p className="font-bold">
                                    Res. Number :{' '}
                                    {reservation.reservation_number}
                                </p>
                                <p>
                                    Inv. Number :{' '}
                                    {reservation.transaction.invoice_number}
                                </p>
                                <p>
                                    Transaction Status :{' '}
                                    <span
                                        className={`me-2 rounded-sm px-2.5 py-1 text-sm font-medium capitalize ${badgeBackground[reservation.transaction.payment_status]}`}
                                    >
                                        {reservation.transaction.payment_status}
                                    </span>
                                </p>
                            </div>

                            <PriceSummary
                                subtotal={reservation.transaction.subtotal}
                                discountPercentage={discountPercentage}
                                discountTotal={reservation.transaction.discount}
                                taxPercentage={
                                    reservation.hotel.setting.tax_percentage
                                }
                                taxAmount={reservation.transaction.tax_amount}
                                totalPrice={reservation.transaction.total_price}
                                dpPercentage={
                                    reservation.hotel.setting.dp_percentage
                                }
                                payNow={reservation.transaction.pay_now}
                                balanceToBePaid={
                                    reservation.transaction.balance_to_be_paid
                                }
                            />

                            {reservation.transaction.payment_status ===
                                'pending' && (
                                <div className="mt-3 flex flex-col justify-end gap-2">
                                    <a
                                        target="_blank"
                                        href={
                                            reservation.transaction.redirect_url
                                        }
                                        className="w-fit rounded-sm bg-green-500 px-4 py-2 text-sm text-white shadow-xs transition hover:bg-green-600"
                                    >
                                        Continue to Payment
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                    <Footer />
                </div>
            </div>
        </>
    )
}
