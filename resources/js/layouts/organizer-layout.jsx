import CustomerHeader from '@/components/header/customer-header'
import Stepper from '@/components/stepper'

export default function CustomerLayout({ children }) {
    return (
        <>
            <CustomerHeader />

            <div className="px-6 lg:px-10">
                <div className="container m-auto pt-10"></div>
            </div>
        </>
    )
}
