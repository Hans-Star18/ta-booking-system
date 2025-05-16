import CustomerHeader from '@/components/header/customer-header'
import Stepper from '@/components/stepper'

export default function CustomerLayout({ children, currenStep = 1, hotel }) {
    return (
        <>
            <CustomerHeader hotel={hotel} />

            <div className="px-6 lg:px-10">
                <div className="container m-auto pt-10 md:max-w-7xl">
                    <Stepper step={currenStep} />
                    {children}
                </div>
            </div>
        </>
    )
}
