import Footer from '@/components/footer'
import Button from '@/components/form/button'
import { Checkbox } from '@/components/form/checkbox'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import { Textarea } from '@/components/form/textarea'
import Currency from '@/components/format/currency'
import CustomerLayout from '@/layouts/customer-layout'
import { Head, useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function ReservationConfirm({ reservation }) {
    const hotel = reservation.hotel
    const room = reservation.room

    const handleSubtotal = (roomPrice, extraBedPrice, totalNights) => {
        return roomPrice * totalNights + extraBedPrice
    }

    const [itemDetails, setItemDetails] = useState(() => {
        const initialItems = []
        for (let i = 0; i < reservation.allotment; i++) {
            initialItems.push({
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
                subtotal: handleSubtotal(
                    reservation.room.price,
                    reservation.extraBedPrices[i],
                    reservation.total_nights
                ),
            })
        }
        return initialItems
    })

    const countTaxTotal = () => {
        const taxPercentage = hotel.setting.tax_percentage || 0
        const totalPrice = reservation.totalPrice - discountTotal
        return (totalPrice * taxPercentage) / 100
    }

    const {
        data: promotionCodeData,
        setData: setPromotionCodeData,
        post: postPromotionCode,
        errors: promotionCodeErrors,
        processing: promotionCodeProcessing,
    } = useForm({
        promotion_code: '',
    })

    const [discountPercentage, setDiscountPercentage] = useState(0)
    const [discountTotal, setDiscountTotal] = useState(0)

    const handleCheckPromotion = () => {
        postPromotionCode(
            route('customer.reservation.check-promotion', {
                hotel: hotel.uuid,
            }),
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    setDiscountPercentage(
                        response.props.promotion_code.discount
                    )
                },
            }
        )
    }

    useEffect(() => {
        setDiscountTotal((reservation.totalPrice * discountPercentage) / 100)
    }, [discountPercentage])

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
                                <div
                                    key={index}
                                    className="grid grid-cols-1 md:grid-cols-4"
                                >
                                    <div className="border border-b-0 border-gray-300 px-4 py-2 md:col-span-2 md:border-b md:px-0">
                                        <div className="md:px-4">
                                            <p className="text-sm font-semibold md:hidden">
                                                Room {index + 1}
                                            </p>
                                            <hr className="mb-2 text-gray-300 md:hidden" />
                                            <p className="text-sm font-semibold">
                                                {item.room.name}
                                            </p>
                                            <p className="text-sm">
                                                {item.checkIn} - {item.checkOut}{' '}
                                                ({item.totalNights} Night)
                                            </p>
                                            <p className="text-sm">
                                                Bed: {item.bed.name}
                                            </p>
                                            <p className="text-sm">
                                                Policies: Non Refundable
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border border-y-0 border-gray-300 px-4 py-2 md:border-y md:px-0">
                                        <p className="text-sm font-semibold md:hidden">
                                            Requirements
                                        </p>
                                        <hr className="mb-2 text-gray-300 md:hidden" />
                                        <div className="md:px-4">
                                            <p className="text-sm">
                                                {item.guests.adult} Adult &{' '}
                                                {item.guests.child} Child
                                            </p>
                                            <p className="text-sm">
                                                {item.needExtraBeds
                                                    ? 'Extra bed confirmed'
                                                    : 'No extra bed'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border border-t-0 border-gray-300 px-4 py-2 md:border-t md:px-0">
                                        <p className="text-sm font-semibold md:hidden">
                                            Subtotal
                                        </p>
                                        <hr className="mb-2 text-gray-300 md:hidden" />
                                        <div className="md:px-4">
                                            <Currency
                                                value={item.subtotal}
                                                className="text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">Subtotal</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <Currency
                                        value={reservation.totalPrice}
                                        className="text-sm"
                                    />
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
                                    <Currency
                                        value={discountTotal}
                                        className="text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">
                                        Tax {hotel.setting.tax_percentage ?? 0}%
                                    </p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <Currency
                                        value={countTaxTotal()}
                                        className="text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">Total Cost</p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 105</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 bg-blue-200">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm font-semibold">
                                        Pay Now (30%)
                                    </p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm font-semibold">
                                        USD 105
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-3">
                                    <p className="text-sm">
                                        Balance to be paid at hotel when
                                        check-in
                                    </p>
                                </div>
                                <div className="col-span-2 border border-gray-300 px-4 py-2 md:col-span-1">
                                    <p className="text-sm">USD 105</p>
                                </div>
                            </div>
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
                                onClick={() => handleCheckPromotion()}
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
