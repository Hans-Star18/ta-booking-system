import Footer from '@/components/footer'
import Button from '@/components/form/button'
import { Checkbox } from '@/components/form/checkbox'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import { Textarea } from '@/components/form/textarea'
import Currency from '@/components/format/currency'
import PolicyList from '@/components/policy-list'
import CustomerLayout from '@/layouts/customer-layout'
import { Head, useForm } from '@inertiajs/react'
import { useState, useMemo } from 'react'

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

export default function ReservationConfirm({ reservation, policies }) {
    const hotel = reservation.hotel
    const room = reservation.room

    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [subtotal] = useState(reservation.totalPrice)

    const discountTotal = useMemo(
        () => calculateDiscountAmount(subtotal, discountPercentage),
        [subtotal, discountPercentage]
    )

    const taxAmount = useMemo(
        () => calculateTaxAmount(subtotal, hotel.setting.tax_percentage || 0),
        [subtotal, hotel.setting.tax_percentage]
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
                                value={promotionCodeData.promotion_code}
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
                                    <Label htmlFor={'name'} required={true}>
                                        Your Name
                                    </Label>
                                    <Input
                                        id={'name'}
                                        name={'name'}
                                        placeholder="Your Full Name"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={'email'} required={true}>
                                        Email
                                    </Label>
                                    <Input
                                        id={'email'}
                                        name={'email'}
                                        type="email"
                                        placeholder="Email Address"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid grid-cols-1">
                                <div>
                                    <Label htmlFor={'address'} required={true}>
                                        Address
                                    </Label>
                                    <Input
                                        id={'address'}
                                        name={'address'}
                                        placeholder="Your Address"
                                        value=""
                                    />
                                </div>
                            </div>

                            <div className="mb-3 grid gap-3 md:grid-cols-2 md:gap-6">
                                <div>
                                    <Label htmlFor={'phone'} required={true}>
                                        Phone Number
                                    </Label>
                                    <Input
                                        id={'phone'}
                                        type="tel"
                                        name={'phone'}
                                        placeholder="Phone Number / Whatsapp Number"
                                        value=""
                                    />
                                </div>
                                <div>
                                    <Label htmlFor={'city'}>
                                        City{' '}
                                        <span className="text-sm text-gray-400">
                                            (Optional)
                                        </span>
                                    </Label>
                                    <Input
                                        id={'city'}
                                        name={'city'}
                                        placeholder="City"
                                        value=""
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
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={'terms'}
                                    name={'terms'}
                                    className={'text-start'}
                                />
                                <Label
                                    htmlFor={'terms'}
                                    required={true}
                                    className="m-0 text-sm"
                                >
                                    I acknowledge reading the Cancellation
                                    Policy, Terms & Conditions and I understand
                                    my credit card will be charged according to
                                    the terms stated.
                                </Label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                className={'rounded-sm py-2'}
                                variant="danger"
                            >
                                Cancel
                            </Button>

                            <Button
                                className={'rounded-sm py-2'}
                                variant="success"
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>

                <Footer />
            </CustomerLayout>
        </>
    )
}
