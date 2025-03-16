import CustomerHeader from "@/components/header/customer-header";

export default function CustomerLayout({ children }) {
    return (
        <>
            <CustomerHeader />

            <div className="px-10 pt-10">{children}</div>
        </>
    );
}
