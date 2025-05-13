import Button from '@/components/form/button'
import { Checkbox } from '@/components/form/checkbox'
import FileInput from '@/components/form/file-input'
import { HelperText } from '@/components/form/helper-text'
import Input from '@/components/form/input'
import Label from '@/components/form/label'
import TextEditor from '@/components/form/text-editor'
import ValidationFeedback from '@/components/form/validation-feedback'
import OrganizerLayout from '@/layouts/organizer-layout'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { Head, useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Edit({ room, beds, amenities }) {
    const [bedSelected, setBedSelected] = useState(
        room.beds.map((bed) => bed.id)
    )
    const [amenitySelected, setAmenitySelected] = useState(
        room.amenities.map((amenity) => amenity.id)
    )

    const { data, setData, post, processing, errors } = useForm({
        name: room.name,
        max_occupancy: room.max_occupancy,
        cover_image: '',
        price: room.price,
        description: room.description,
        bed_config: bedSelected,
        amenity_config: amenitySelected,
        _method: 'PUT',
    })

    useEffect(() => {
        setData('bed_config', bedSelected)
    }, [bedSelected])

    useEffect(() => {
        setData('amenity_config', amenitySelected)
    }, [amenitySelected])

    const handleBedSelected = (bedId) => {
        setBedSelected((prev) => {
            if (prev.includes(bedId)) {
                return prev.filter((id) => id !== bedId)
            }
            return [...prev, bedId]
        })
    }

    const handleAmenitySelected = (amenityId) => {
        setAmenitySelected((prev) => {
            if (prev.includes(amenityId)) {
                return prev.filter((id) => id !== amenityId)
            }
            return [...prev, amenityId]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('organizer.rooms.update', room.id), {
            preserveScroll: true,
            onSuccess: () => {},
        })
    }

    return (
        <>
            <Head title={`Edit ${room.name}`} />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Edit {room.name}</h1>
                    </div>

                    <form
                        className="grid grid-cols-1 gap-6 md:grid-cols-2"
                        encType="multipart/form-data"
                        method="POST"
                    >
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="name" required={true}>
                                Room Type Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter Room Type Name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={errors.name && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.name} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="max_occupancy" required={true}>
                                Maximum Occupancy
                            </Label>
                            <Input
                                id="max_occupancy"
                                name="max_occupancy"
                                placeholder="Enter Maximum Occupancy"
                                type="number"
                                min="1"
                                step="1"
                                value={data.max_occupancy}
                                onChange={(e) =>
                                    setData(
                                        'max_occupancy',
                                        parseInt(e.target.value) || ''
                                    )
                                }
                                className={
                                    errors.max_occupancy && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback
                                message={errors.max_occupancy}
                            />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="cover_image" required={true}>
                                Cover Image
                            </Label>
                            <FileInput
                                id="cover_image"
                                name="cover_image"
                                className={
                                    errors.cover_image && 'ring ring-red-500'
                                }
                                onChange={(e) =>
                                    setData('cover_image', e.target.files[0])
                                }
                            />
                            <HelperText message="Image must be less than 2MB and in JPG, PNG, or JPEG format" />
                            <ValidationFeedback message={errors.cover_image} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="price" required={true}>
                                Price (per night in IDR)
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                placeholder="Enter Price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={data.price}
                                onChange={(e) =>
                                    setData(
                                        'price',
                                        parseFloat(e.target.value) || ''
                                    )
                                }
                                className={errors.price && 'ring ring-red-500'}
                            />
                            <ValidationFeedback message={errors.price} />
                        </div>
                        <div className="col-span-2 mb-3">
                            <Label htmlFor="description" required={true}>
                                Description
                            </Label>
                            <TextEditor
                                value={data.description}
                                onChange={(value) =>
                                    setData('description', value)
                                }
                                className={
                                    errors.description && 'ring ring-red-500'
                                }
                            />
                            <ValidationFeedback message={errors.description} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="bed_config" required={true}>
                                Beds Config
                            </Label>
                            <div className="grid grid-cols-3 gap-2">
                                {beds.map((bed) => (
                                    <div
                                        key={bed.slug}
                                        className="flex items-center gap-2"
                                    >
                                        <Checkbox
                                            id={bed.slug}
                                            name="bed_config"
                                            value={bed.id}
                                            onChange={() =>
                                                handleBedSelected(bed.id)
                                            }
                                            checked={bedSelected.includes(
                                                bed.id
                                            )}
                                        />
                                        <Label
                                            htmlFor={bed.slug}
                                            className="mb-0"
                                        >
                                            {bed.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            <ValidationFeedback message={errors.bed_config} />
                        </div>
                        <div className="col-span-2 mb-2 md:col-span-1">
                            <Label htmlFor="amenities">Amenities</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {amenities.map((amenity) => (
                                    <div
                                        key={amenity.slug}
                                        className="flex items-center gap-2"
                                    >
                                        <Checkbox
                                            id={amenity.slug}
                                            name="amenity_config"
                                            value={amenity.id}
                                            checked={amenitySelected.includes(
                                                amenity.id
                                            )}
                                            onChange={() =>
                                                handleAmenitySelected(
                                                    amenity.id
                                                )
                                            }
                                        />
                                        <Label
                                            htmlFor={amenity.slug}
                                            className="mb-0"
                                        >
                                            {amenity.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                            <ValidationFeedback
                                message={errors.amenity_config}
                            />
                        </div>

                        <div className="col-span-2 flex items-center justify-end">
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                                className={'flex items-center gap-2'}
                                disabled={processing}
                            >
                                {processing && (
                                    <ArrowPathIcon className="size-5 animate-spin" />
                                )}
                                Update Room
                            </Button>
                        </div>
                    </form>
                </div>
            </OrganizerLayout>
        </>
    )
}
