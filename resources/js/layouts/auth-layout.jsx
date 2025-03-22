export default function AuthLayout({ children }) {
    return (
        <div className="p-6 flex flex-col justify-center w-full h-screen">
            {children}
        </div>
    );
}
