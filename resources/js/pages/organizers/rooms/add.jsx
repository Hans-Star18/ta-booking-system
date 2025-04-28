import FileInput from '@/components/form/file-input'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import TextEditor from '@/components/form/text-editor'
import OrganizerLayout from '@/layouts/organizer-layout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'

export default function Add() {
    const [description, setDescription] = useState('')

    return (
        <>
            <Head title="Add New Room" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Add New Room</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <div className="mb-3">
                            <Label htmlFor="name" required={true}>
                                Room Type Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Room Type Name"
                            />
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="max_occupancy" required={true}>
                                Maximum Occupancy
                            </Label>
                            <Input
                                id="max_occupancy"
                                name="max_occupancy"
                                placeholder="Enter Maximum Occupancy"
                                type="number"
                            />
                        </div>
                        <div className="mb-3">
                            <Label htmlFor="cover_image" required={true}>
                                Cover Image
                            </Label>
                            <FileInput id="cover_image" name="cover_image" />
                        </div>
                        <div className="col-span-2 mb-3">
                            <Label htmlFor="description" required={true}>
                                Description
                            </Label>
                            <TextEditor
                                value={description}
                                onChange={(value) => setDescription(value)}
                            />
                        </div>
                    </form>
                </div>
            </OrganizerLayout>
        </>
    )
}
