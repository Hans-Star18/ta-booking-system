import Footer from '@/components/footer'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import { Checkbox } from '@/components/form/checkbox'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import Select from '@/components/form/select'
import { Textarea } from '@/components/form/textarea'
import ValidationFeedback from '@/components/form/validation-feedback'
import Currency from '@/components/format/currency'
import PolicyList from '@/components/policy-list'
import CustomerLayout from '@/layouts/customer-layout'
import { Head, router, useForm } from '@inertiajs/react'
import HTMLReactParser from 'html-react-parser'
import { useState, useMemo } from 'react'
import Modal from 'react-responsive-modal'
import { twMerge } from 'tailwind-merge'

const calculateRoomSubtotal = (roomPrice, extraBedPrice, totalNights) => {
    return roomPrice * totalNights + extraBedPrice
}

const calculateTaxAmount = (subtotal, taxPercentage) => {
    return (subtotal * taxPercentage) / 100
}

const calculateDiscountAmount = (subtotal, discountPercentage) => {
    return (subtotal * discountPercentage) / 100
}

const calculateTotalPrice = (subtotal, discountAmount, taxAmount) => {
    return subtotal - discountAmount + taxAmount
}

const calculatePayNow = (totalPrice, dpPercentage) => {
    return (totalPrice * dpPercentage) / 100
}

const ReservationItem = ({ item, index, policies }) => (
    <div key={index} className="grid grid-cols-1 md:grid-cols-4">
        <div className="border border-b-0 border-gray-300 px-4 py-2 md:col-span-2 md:border-b md:px-0">
            <div className="md:px-4">
                <p className="text-sm font-semibold md:hidden">
                    Room {index + 1}
                </p>
                <hr className="mb-2 text-gray-300 md:hidden" />
                <p className="text-sm font-semibold">{item.room.name}</p>
                <p className="text-sm">
                    {item.checkIn} - {item.checkOut} ({item.totalNights} Night)
                </p>
                <p className="text-sm">Bed: {item.bed.name}</p>
                <div className="flex gap-2 text-sm">
                    Policies:
                    <div className="flex flex-wrap gap-2">
                        <PolicyList
                            policies={policies}
                            roomPolicies={item.room.policies}
                            icon={false}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="border border-y-0 border-gray-300 px-4 py-2 md:border-y md:px-0">
            <p className="text-sm font-semibold md:hidden">Requirements</p>
            <hr className="mb-2 text-gray-300 md:hidden" />
            <div className="md:px-4">
                <p className="text-sm">
                    {item.guests.adult} Adult & {item.guests.child} Child
                </p>
                <p className="text-sm">
                    {item.needExtraBeds
                        ? 'Extra bed confirmed'
                        : 'No extra bed'}
                </p>
            </div>
        </div>
        <div className="border border-t-0 border-gray-300 px-4 py-2 md:border-t md:px-0">
            <p className="text-sm font-semibold md:hidden">Subtotal</p>
            <hr className="mb-2 text-gray-300 md:hidden" />
            <div className="md:px-4">
                <Currency value={item.subtotal} className="text-sm" />
            </div>
        </div>
    </div>
)

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

export default function ReservationConfirm({
    reservation,
    policies,
    countries,
}) {
    if (!reservation) {
        return router.visit(route('customer.home'))
    }

    const countriesOptions = Object.entries(countries).map(([code, name]) => ({
        value: code,
        label: name,
    }))

    const hotel = reservation.hotel
    const room = reservation.room

    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [promotionCode, setPromotionCode] = useState('')
    const [subtotal] = useState(reservation.totalPrice)
    const [open, setOpen] = useState(false)

    const discountTotal = useMemo(
        () => calculateDiscountAmount(subtotal, discountPercentage),
        [subtotal, discountPercentage]
    )

    const taxAmount = useMemo(
        () =>
            calculateTaxAmount(
                subtotal - discountTotal,
                hotel.setting.tax_percentage || 0
            ),
        [subtotal, hotel.setting.tax_percentage, discountTotal]
    )

    const totalPrice = useMemo(
        () => calculateTotalPrice(subtotal, discountTotal, taxAmount),
        [subtotal, discountTotal, taxAmount]
    )

    const payNow = useMemo(
        () => calculatePayNow(totalPrice, hotel.setting.dp_percentage),
        [totalPrice, hotel.setting.dp_percentage]
    )

    const balanceToBePaid = useMemo(
        () => totalPrice - payNow,
        [totalPrice, payNow]
    )

    const [itemDetails] = useState(() => {
        return Array.from({ length: reservation.allotment }, (_, i) => ({
            room: room,
            checkIn: reservation.check_in,
            checkOut: reservation.check_out,
            totalNights: reservation.total_nights,
            totalPrice: reservation.totalPrice,
            bed: reservation.selectedBeds[i],
            guests: reservation.guests[i],
            needExtraBeds: reservation.needExtraBeds[i],
            totalExtraBed: reservation.totalExtraBed[i],
            extraBedPrices: reservation.extraBedPrices[i],
            subtotal: calculateRoomSubtotal(
                reservation.room.price,
                reservation.extraBedPrices[i],
                reservation.total_nights
            ),
        }))
    })

    const {
        data: promotionCodeData,
        setData: setPromotionCodeData,
        post: postPromotionCode,
        processing: promotionCodeProcessing,
    } = useForm({
        promotion_code: '',
    })

    const handleCheckPromotion = () => {
        postPromotionCode(
            route('customer.reservation.check-promotion', {
                hotel: hotel.uuid,
            }),
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    if (!response.props.promotion_code) {
                        setDiscountPercentage(0)
                        return
                    }
                    setDiscountPercentage(
                        response.props.promotion_code.discount
                    )
                    setPromotionCode(response.props.promotion_code.code)
                },
            }
        )
    }

    const {
        data: reservationData,
        setData: setReservationData,
        post: postReservation,
        processing: reservationProcessing,
        errors: reservationErrors,
    } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        city: '',
        postal_code: '',
        country_code: 'AF',
        address: '',
        request: '',
        terms: false,
    })

    const handleBookNow = () => {
        reservationData.promotion_code = promotionCode
        reservationData.reservation = reservation
        reservationData.subtotal = subtotal
        reservationData.discount_total = discountTotal
        reservationData.tax_amount = taxAmount
        reservationData.total_price = totalPrice
        reservationData.pay_now = payNow
        reservationData.balance_to_be_paid = balanceToBePaid

        postReservation(
            route('customer.reservation.store', { hotel: hotel.uuid }),
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    if (response.props.snap_token) {
                        window.snap.pay(response.props.snap_token)
                    }
                },
            }
        )
    }

    return (
        <>
            <Head title="Reservation Confirmation" />

            <CustomerLayout currenStep={3} hotel={hotel}>
                <div className="mt-6 w-full bg-gray-100 p-4">
                    <h2 className="text-2xl font-bold">
                        Confirm Your Reservation
                    </h2>
                    <hr className="mb-4 w-full text-gray-300" />

                    <div>
                        <div className="mb-3">
                            <div className="hidden md:grid md:grid-cols-4">
                                <div className="border border-gray-300 px-4 py-2 md:col-span-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Item
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Requirements
                                    </p>
                                </div>
                                <div className="border border-gray-300 px-4 py-2 md:px-0">
                                    <p className="text-sm font-semibold md:px-4">
                                        Total
                                    </p>
                                </div>
                            </div>

                            {itemDetails.map((item, index) => (
                                <ReservationItem
                                    key={index}
                                    item={item}
                                    index={index}
                                    policies={policies}
                                />
                            ))}

                            <PriceSummary
                                subtotal={subtotal}
                                discountPercentage={discountPercentage}
                                discountTotal={discountTotal}
                                taxPercentage={
                                    hotel.setting.tax_percentage || 0
                                }
                                taxAmount={taxAmount}
                                totalPrice={totalPrice}
                                dpPercentage={hotel.setting.dp_percentage}
                                payNow={payNow}
                                balanceToBePaid={balanceToBePaid}
                            />
                        </div>

                        <div className="mb-3 flex flex-col justify-end gap-3 md:flex-row">
                            <Input
                                id={'promotion-code'}
                                name={'promotion-code'}
                                placeholder="Promotion Code"
                                defaultValue={promotionCodeData.promotion_code}
                                onChange={(e) =>
                                    setPromotionCodeData({
                                        promotion_code: e.target.value,
                                    })
                                }
                                className="h-10 w-full rounded-sm py-2 md:w-fit"
                            />

                            <Button
                                variant="primary"
                                className={'rounded-sm py-2'}
                                onClick={handleCheckPromotion}
                                disabled={promotionCodeProcessing}
                            >
                                Check Promotion
                            </Button>
                        </div>

                        <div className="mb-3">
                            <h2 className="text-xl font-bold">
                                Personal Information
                            </h2>
                            <hr className="mb-4 w-full text-gray-300" />
                            <div className="mb-3 grid gap-3 md:grid-cols-2 md:gap-6">
                                <div>
                                    <Label
                                        htmlFor={'first_name'}
                                        required={true}
                                    >
                                        First Name
                                    </Label>
                                    <Input
                                        id={'first_name'}
                                        name={'first_name'}
                                        placeholder="Your First Name"
                                        defaultValue={
                                            reservationData.first_name
                                        }
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                first_name: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.first_name &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.first_name}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={'last_name'}
                                        required={true}
                                    >
                                        Last Name
                                    </Label>
                                    <Input
                                        id={'last_name'}
                                        name={'last_name'}
                                        placeholder="Your First Name"
                                        defaultValue={reservationData.last_name}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                last_name: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.last_name &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.last_name}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid gap-3 md:grid-cols-2 md:gap-6">
                                <div>
                                    <Label htmlFor={'email'} required={true}>
                                        Email
                                    </Label>
                                    <Input
                                        id={'email'}
                                        name={'email'}
                                        placeholder="Your email"
                                        defaultValue={reservationData.email}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.email &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.email}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor={'phone'} required={true}>
                                        Phone Number
                                    </Label>
                                    <Input
                                        id={'phone'}
                                        type="tel"
                                        name={'phone'}
                                        placeholder="Phone Number / Whatsapp Number"
                                        defaultValue={reservationData.phone}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                phone: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.phone &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.phone}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid gap-3 md:grid-cols-3 md:gap-6">
                                <div>
                                    <Label htmlFor={'city'} required={true}>
                                        City
                                    </Label>
                                    <Input
                                        id={'city'}
                                        name={'city'}
                                        placeholder="City"
                                        defaultValue={reservationData.city}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                city: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.city &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.city}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={'country_code'}
                                        required={true}
                                    >
                                        Country
                                    </Label>
                                    <Select
                                        id={'country_code'}
                                        name={'country_code'}
                                        defaultValue={
                                            reservationData.country_code
                                        }
                                        options={countriesOptions}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                country_code: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.country_code &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.country_code}
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor={'postal_code'}
                                        required={true}
                                    >
                                        Postal Code
                                    </Label>
                                    <Input
                                        id={'postal_code'}
                                        name={'postal_code'}
                                        placeholder="postal_code"
                                        defaultValue={
                                            reservationData.postal_code
                                        }
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                postal_code: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.postal_code &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.postal_code}
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid grid-cols-1">
                                <div>
                                    <Label htmlFor={'address'} required={true}>
                                        Address
                                    </Label>
                                    <Textarea
                                        id={'address'}
                                        name={'address'}
                                        placeholder="Address"
                                        defaultValue={reservationData.address}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.address &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.address}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 grid grid-cols-1">
                                <div>
                                    <Label htmlFor={'request'}>
                                        Request{' '}
                                        <span className="text-sm text-gray-400">
                                            (Optional)
                                        </span>
                                    </Label>
                                    <Textarea
                                        id={'request'}
                                        name={'request'}
                                        placeholder="Comments / Special Request"
                                        defaultValue={reservationData.request}
                                        onChange={(e) =>
                                            setReservationData((prev) => ({
                                                ...prev,
                                                request: e.target.value,
                                            }))
                                        }
                                        className={
                                            reservationErrors.request &&
                                            'ring ring-red-500'
                                        }
                                    />
                                    <ValidationFeedback
                                        message={reservationErrors.request}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={'terms'}
                                    name={'terms'}
                                    checked={reservationData.terms}
                                    onChange={(e) =>
                                        setReservationData((prev) => ({
                                            ...prev,
                                            terms: e.target.checked,
                                        }))
                                    }
                                    className={twMerge(
                                        reservationErrors.terms &&
                                            'ring ring-red-500',
                                        'text-start'
                                    )}
                                />
                                <Label
                                    htmlFor={'terms'}
                                    required={true}
                                    className="m-0 text-sm"
                                >
                                    I acknowledge reading the{' '}
                                    <button
                                        className="inline cursor-pointer text-blue-500 underline"
                                        onClick={() => setOpen(true)}
                                    >
                                        Cancellation Policy, Terms & Conditions
                                    </button>{' '}
                                    and I understand my credit card will be
                                    charged according to the terms stated.
                                </Label>
                            </div>
                            <ValidationFeedback
                                message={reservationErrors.terms}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Anchor
                                className={'rounded-sm py-2'}
                                variant="danger"
                                href={route('customer.reservation.index', {
                                    hotel: hotel.uuid,
                                    action: 'cancel',
                                })}
                                disabled={reservationProcessing}
                            >
                                Cancel
                            </Anchor>

                            <Button
                                className={'rounded-sm py-2'}
                                variant="success"
                                disabled={reservationProcessing}
                                onClick={handleBookNow}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>

                <Footer />
            </CustomerLayout>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                center
                classNames={{
                    modal: 'md:w-full rounded-lg',
                }}
            >
                <h2 className="mb-3 text-2xl font-bold">{hotel.name} T&C</h2>
                <div className="text-sm">
                    {HTMLReactParser(hotel.term_and_condition)}
                </div>
            </Modal>
        </>
    )
}
