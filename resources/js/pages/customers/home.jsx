import { Head, usePage } from '@inertiajs/react'
import { SidebarProvider } from '@/components/context/siderbar-context'
import Navbar from '@/pages/customers/components/navbar'
import FeaturesList from './components/features-list'
import Label from '@/components/form/label'
import Input from '@/components/form/input'
import { Textarea } from '@/components/form/textarea'
import Button from '@/components/form/button'

export default function Home({ clients }) {
    const { appName } = usePage().props

    return (
        <SidebarProvider>
            <Head title="Link2Pay" />
            <Navbar appName={appName} />
            <div className="relative h-96 md:h-dvh">
                <img
                    src="/image/hero-image.jpg"
                    alt="hero-image"
                    className="h-full w-full object-cover"
                />

                <div className="absolute top-0 flex h-full w-full items-center justify-center bg-transparent">
                    <h1
                        className="animate-gradient bg-gradient-to-r from-blue-600 via-blue-100 to-blue-600 bg-[length:200%_auto] bg-clip-text text-6xl font-bold text-transparent"
                        style={{
                            WebkitTextStroke: '2px black',
                            textStroke: '2px black',
                        }}
                    >
                        Manage your hotel, from anywhere
                    </h1>
                </div>
            </div>
            <div
                id="about-us"
                className="container flex justify-center bg-white"
            >
                <div className="grid grid-cols-1 items-stretch gap-4 px-6 py-12 md:grid-cols-2 md:px-24">
                    <div className="flex flex-col justify-center text-gray-600">
                        <h2 className="mb-4 text-2xl font-bold text-slate-800">
                            About Us
                        </h2>

                        <p className="mb-4">
                            <span className="font-semibold">
                                "Link to Pay" Availability
                            </span>{' '}
                            is a powerful and feature-rich instant reservation
                            system. It is designed to help hotels, villas, and
                            other accommodation providers easily add a
                            professional online booking system to their website.
                            It has smart, clean, and flexible designs with
                            features you won't find anywhere else. This is the
                            only online reservation system you need.
                        </p>
                        <p>
                            <span className="font-semibold">"Link to Pay"</span>{' '}
                            has a team of dedicated staff and representatives.
                            They are all committed to the long-term success of
                            the company. Our sales and customer support teams
                            are professional and experienced, making sure that
                            Link to Pay stays ahead in the fast-changing online
                            world.
                        </p>
                    </div>
                    <div className="flex h-full items-center">
                        <img
                            src="/image/about.png"
                            alt="about-us"
                            className="h-full max-h-96 w-full object-contain"
                        />
                    </div>
                </div>
            </div>
            <div
                id="features"
                className="container flex justify-center bg-white"
            >
                <FeaturesList />
            </div>

            <div
                id="clients"
                className="container flex justify-center bg-gray-100 px-6 py-20 md:px-24"
            >
                <div className="overflow-hidden rounded-md bg-gray-100 py-4">
                    <h2 className="mb-4 text-center text-2xl font-bold text-slate-800">
                        Clients
                    </h2>
                    <div className="animate-marquee flex space-x-8">
                        {[...clients].map((client, index) => (
                            <a
                                key={`${client.name}-${index}`}
                                href={client.url}
                                target="_blank"
                                className="flex-shrink-0 cursor-pointer text-lg font-medium whitespace-nowrap text-gray-500 transition-colors duration-300 hover:text-blue-600"
                            >
                                {client.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div
                id="contact-us"
                className="container flex justify-center bg-white"
            >
                <div className="w-full max-w-2xl px-6 py-12 md:px-24">
                    <h2 className="mb-4 text-2xl font-bold text-slate-800">
                        Contact Us
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="name" required>
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" required>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="message" required>
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Enter your message"
                                onChange={(e) => {
                                    console.log(e.target.value)
                                }}
                            />
                        </div>

                        <div>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    console.log('send inquiry')
                                }}
                            >
                                Send Inquiry
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-200 py-8 text-center text-sm text-slate-900">
                <span className="font-bold">
                    Copyright &copy; 2025 {appName}. All Rights Reserved
                </span>
            </div>
        </SidebarProvider>
    )
}
