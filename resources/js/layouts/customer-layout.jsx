import CustomerHeader from "@/components/header/customer-header";

export default function CustomerLayout({ children }) {
    return (
        <>
            <CustomerHeader />

            <div className="px-6 lg:px-10">
                <div className="pt-10 container m-auto">{children}</div>
            </div>
        </>
    );
}
