/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { getTourListById } from "@/services/guide/guideTourList";
import { ITourList } from "@/types/tourList.interface";

import { Calendar, Clock, DollarSign, MapPin, Users, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ITourListViewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string | undefined;
}

const TourListViewDialog = ({
    open,
    onOpenChange,
    id,
}: ITourListViewDialogProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ITourList | null>(null);

    useEffect(() => {
        if (!open || !id) return;

        (async () => {
            setLoading(true);

            const res = await getTourListById(id);
            // console.log("GET USER RES:", res);

            if (res.success) {
                setData(res.data);
            } else {
                toast.error(res.message);
            }

            setLoading(false);
        })();

    }, [open, id]);

    const tourData = data;

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // console.log("tour Details data", data)

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[90vh] max-w-4xl flex flex-col p-0">
                    <DialogTitle className="sr-only">Tour Details</DialogTitle>
                    {loading && (
                        <div className="flex items-center justify-center h-full">
                            <p>Loading...</p>
                        </div>
                    )}
                    {!loading && tourData && (
                        <>
                            <DialogHeader className="px-6 pt-6 pb-4 border-b">
                                <DialogTitle className="text-2xl font-bold">
                                    {tourData.title}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                                {/* Images Gallery */}
                                <div className="relative w-full  overflow-hidden bg-gray-200 rounded-xl">
                                    {tourData.images && tourData.images.length > 0 ? (
                                        tourData.images.length === 1 ? (
                                            // ✅ Single Image (NO Carousel)
                                            <div className="w-full h-full">
                                                <Image
                                                    src={tourData.images[0]}
                                                    alt={tourData.title}
                                                    width={500}
                                                    height={500}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            // ✅ Multiple Images (Carousel)
                                            <Carousel className="w-full h-full">
                                                <CarouselContent>
                                                    {tourData.images.map((image, index) => (
                                                        <CarouselItem key={index}>
                                                            <Image
                                                                src={image}
                                                                alt={`${tourData.title} - Image ${index + 1}`}
                                                                width={500}
                                                                height={500}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>

                                                <CarouselPrevious className="left-2" />
                                                <CarouselNext className="right-2" />
                                            </Carousel>
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <MapPin className="w-16 h-16 text-gray-500" />
                                        </div>
                                    )}

                                    {/* Price Badge */}
                                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-full">
                                        <span className="text-lg font-bold">${tourData.tourFee}</span>
                                    </div>
                                </div>

                                {/* Tour Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* City */}
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">City</p>
                                            <p className="text-base text-gray-900 font-semibold">
                                                {tourData.city}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Duration</p>
                                            <p className="text-base text-gray-900 font-semibold">
                                                {tourData.durationHours} {tourData.durationHours === 1 ? 'hour' : 'hours'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tour Fee */}
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <DollarSign className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Tour Fee</p>
                                            <p className="text-base text-gray-900 font-semibold">
                                                ${tourData.tourFee.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Max People */}
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-600 font-medium">Max People</p>
                                            <p className="text-base text-gray-900 font-semibold">
                                                {tourData.maxPeople} {tourData.maxPeople === 1 ? 'person' : 'people'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Status */}
                                <div className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                                    {tourData.status}
                                </div>

                                {/* Categories */}
                                {tourData.categories && tourData.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {tourData.categories.map(tc => (
                                            <span
                                                key={tc.id}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                            >
                                                {tc.category?.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Meeting Point */}
                                {tourData.meetingPoint && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-red-600" />
                                            Meeting Point
                                        </h3>
                                        <p className="text-gray-700 bg-red-50 p-4 rounded-lg border border-red-100">
                                            {tourData.meetingPoint}
                                        </p>
                                    </div>
                                )}

                                {/* Description */}
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Description
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        {tourData.description}
                                    </p>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Created: {formatDate(tourData.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>Updated: {formatDate(tourData.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                                {/* <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </Button> */}
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Image Lightbox */}
            {selectedImage && (
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-50 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                        <div className="relative">
                            <Image
                                src={selectedImage}
                                alt="Tour image full view"
                                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default TourListViewDialog;