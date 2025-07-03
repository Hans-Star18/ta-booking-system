import InformationItem from '@/pages/organizers/reservations/components/information-item'

export default function CustomerSection({ reservation }) {
    return (
        <div className="col-span-1">
            <h2 className="mb-3 text-xl">Customer Information</h2>
            <div className="space-y-2 text-base font-light text-gray-600">
                <InformationItem
                    label="Customer Name"
                    value={`${reservation.reservation_customer.first_name} ${reservation.reservation_customer.last_name}`}
                />
                <InformationItem
                    label="Email"
                    value={reservation.reservation_customer.email}
                />
                <InformationItem
                    label="Telephone"
                    value={reservation.reservation_customer.phone}
                />
                <InformationItem
                    label="Address"
                    value={reservation.reservation_customer.address}
                />
                <InformationItem
                    label="City"
                    value={reservation.reservation_customer.city}
                />
            </div>
        </div>
    )
}
