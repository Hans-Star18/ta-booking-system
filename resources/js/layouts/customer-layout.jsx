import CustomerHeader from "@/components/header/customer-header";
import Stepper from "@/components/stepper";

export default function CustomerLayout({ children, currenStep = 1 }) {
    return (
        <>
            <CustomerHeader />

            <div className="px-6 lg:px-10">
                <div className="pt-10 container m-auto">
                    <Stepper step={currenStep} />
                    {children}
                </div>
            </div>
        </>
    );
}
