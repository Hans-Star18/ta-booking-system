import { Head } from "@inertiajs/react";
import CustomerLayout from "@/layouts/customer-layout";

export default function Home() {
    return (
        <>
            <Head title="Home"></Head>

            <CustomerLayout>
                <div className="grid grid-cols-4 gap-8">
                    <div className="border border-blue-300 bg-blue-200 p-3 rounded-md">
                        <span className="block text-center text-xl font-bold">
                            Menu 1
                        </span>
                    </div>

                    <div className="border border-blue-300 bg-blue-200 p-3 rounded-md">
                        <span className="block text-center text-xl font-bold">
                            Menu 1
                        </span>
                    </div>

                    <div className="border border-blue-300 bg-blue-200 p-3 rounded-md">
                        <span className="block text-center text-xl font-bold">
                            Menu 1
                        </span>
                    </div>

                    <div className="border border-blue-300 bg-blue-200 p-3 rounded-md">
                        <span className="block text-center text-xl font-bold">
                            Menu 1
                        </span>
                    </div>
                </div>
            </CustomerLayout>
        </>
    );
}
