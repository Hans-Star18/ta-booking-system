import Confirm from '@/components/alert/confirm'
import Anchor from '@/components/form/anchor'
import Button from '@/components/form/button'
import OrganizerLayout from '@/layouts/organizer-layout'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, router, useForm } from '@inertiajs/react'
import Dropzone from 'dropzone'
import { useEffect, useState } from 'react'

export default function PhotoManagement({ room }) {
    const [uploadProgress, setUploadProgress] = useState(0)
    const { delete: destroy, processing, progress } = useForm({})

    useEffect(() => {
        const dropzoneElement = document.getElementById('dropzone-file-upload')
        if (dropzoneElement) {
            Dropzone.autoDiscover = false

            const myDropzone = new Dropzone('#dropzone-file-upload', {
                url: route('organizer.rooms.photos.store', room),
                autoProcessQueue: true,
                acceptedFiles: 'image/*',
                maxFilesize: 2, // MB
                addRemoveLinks: true,
                disablePreviews: true,
                maxFiles: 1,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
                init: function () {
                    this.on('sending', function (file, xhr, formData) {
                        formData.append(
                            '_token',
                            document.querySelector('meta[name="csrf-token"]')
                                .content
                        )
                    })

                    this.on('uploadprogress', function (file, progress) {
                        setUploadProgress(progress)
                    })

                    this.on('success', function (file, response) {
                        setUploadProgress(0)
                        router.reload({ only: ['room'] })
                    })

                    this.on('error', function (file, errorMessage) {
                        setUploadProgress(0)
                    })
                },
            })

            return () => {
                myDropzone.destroy()
            }
        }
    }, [room.photos])

    const handleDelete = (photoId) => {
        Confirm({
            action: 'delete',
            onConfirm: () => {
                destroy(route('organizer.rooms.photos.destroy', photoId), {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({ only: ['room'] })
                    },
                })
            },
        })
    }

    return (
        <>
            <Head title="Photo Management" />

            <OrganizerLayout>
                <div className="min-h-screen rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Photo Management for {room.name}
                        </h1>
                        <Anchor
                            variant="secondary"
                            href={route('organizer.rooms.show', room)}
                        >
                            Back
                        </Anchor>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
                        {room.photos.map((photo) => (
                            <div key={photo.id} className="group relative">
                                {progress ? (
                                    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className="rounded-full bg-blue-600 p-0.5 text-center text-xs leading-none font-medium text-blue-100"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        >
                                            {progress.percentage}%
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <img
                                            src={photo.photo}
                                            alt={`photo-${room.name}-${photo.id}`}
                                            className="h-48 w-full rounded-sm object-cover"
                                        />
                                        <Button
                                            variant="danger"
                                            className="absolute top-2 right-2 flex items-center justify-center rounded-full p-1 text-center text-xs leading-none font-medium"
                                            onClick={() => {
                                                handleDelete(photo.id)
                                            }}
                                            disabled={processing}
                                        >
                                            <XMarkIcon className="size-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}

                        <form
                            className="dropzone group cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-blue-500"
                            id="dropzone-file-upload"
                            encType="multipart/form-data"
                        >
                            <div className="pointer-events-none flex h-full items-center justify-center">
                                {uploadProgress > 0 ? (
                                    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className="rounded-full bg-blue-600 p-0.5 text-center text-xs leading-none font-medium text-blue-100"
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        >
                                            {Math.round(uploadProgress)}%
                                        </div>
                                    </div>
                                ) : (
                                    <PlusIcon className="size-12 font-bold text-gray-500 group-hover:text-blue-500" />
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </OrganizerLayout>
        </>
    )
}
