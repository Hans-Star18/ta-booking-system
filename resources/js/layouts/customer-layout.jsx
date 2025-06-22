import LoadAlert from '@/components/alert/load-alert'
import Toast from '@/components/alert/toast'
import CustomerHeader from '@/components/header/customer-header'
import Stepper from '@/components/stepper'

export default function CustomerLayout({ children, currenStep = 1, hotel }) {
    const alert = LoadAlert()

    return (
        <>
            {alert && (
                <Toast
                    message={alert.message}
                    type={alert.type}
                    id={alert._id}
                />
            )}

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
