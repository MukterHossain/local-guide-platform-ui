/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
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
    if (!tourData) return null;

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-h-[90vh] max-w-4xl flex flex-col p-0">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <DialogTitle className="text-2xl font-bold">
                            {tourData.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                        {/* Images Gallery */}
                        {tourData.images && tourData.images.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Tour Images
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {tourData.images.map((imageUrl, index) => (
                                        <div
                                            key={index}
                                            className="relative group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
                                            onClick={() => setSelectedImage(imageUrl)}
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt={`Tour image ${index + 1}`}
                                                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                                                width={500}
                                                height={500}
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                                                <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                                                    Click to view
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

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

                        {/* Guide Information */}
                        {/* {tourData.guide && (
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Guide Information
                                </h3>
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {tourData.guide.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {tourData.guide.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {tourData.guide.email}
                                            </p>
                                            {tourData.guide.phone && (
                                                <p className="text-sm text-gray-600">
                                                    {tourData.guide.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} */}

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
                    {/* <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onOpenChange}
                        >
                            Close
                        </Button>
                    </div> */}
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