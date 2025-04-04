import { Link } from "@inertiajs/react";

export default function CustomerHeader() {
    return (
        <header className="border border-bottom border-gray-200 py-3 px-10">
            <h1 className="text-center text-3xl font-extrabold md:text-start container m-auto">
                <Link href={route("customer.home")}>Brand</Link>
            </h1>
        </header>
    );
}
