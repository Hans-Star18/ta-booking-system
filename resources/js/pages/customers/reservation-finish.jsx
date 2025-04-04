import Footer from "@/components/footer";
import CustomerLayout from "@/layouts/customer-layout";
import { Head, Link } from "@inertiajs/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function ReservationFinish() {
    return (
        <>
            <Head title="Reservation Finish" />

            <CustomerLayout currenStep={4}>
                <div className="bg-gray-100 w-full mt-6 p-4">
                    <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto" />

                    <h1 className="text-2xl font-semibold text-center mt-4">
                        Reservation Successful
                    </h1>
                    <p className="text-center text-gray-600 mt-2">
                        Your reservation has been successfully completed.
                        <br />
                        Thank you for choosing us!
                        <br />
                        We look forward to serving you.
                    </p>
                    <p className="text-center text-gray-600 mt-2">
                        You will receive a confirmation email shortly.
                        <br />
                        Please check your inbox for further details.
                        <br />
                        If you do not receive an email, please check your spam
                        folder.
                        <br />
                        If you have any questions, please contact us.
                    </p>

                    <div className="flex justify-center mt-6">
                        <Link
                            href={route("customer.home")}
                            className="shadow-xs rounded-lg transition px-4 py-3 text-sm cursor-pointer bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Back To Home
                        </Link>
                    </div>
                </div>

                <Footer />
            </CustomerLayout>
        </>
    );
}
