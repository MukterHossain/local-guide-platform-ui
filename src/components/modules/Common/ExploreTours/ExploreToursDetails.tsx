'use client'
import { InfoItem } from "@/components/shared/InfoItem";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ITourList } from "@/types/tourList.interface";
import { Calendar, Clock1, Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookTourDialog from "./BookAvailableTourDialog";

const ExploreToursDetails = ({ tourData }: { tourData: ITourList }) => {
const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
    const images =
        Array.isArray(tourData.images)
            ? tourData.images.filter(img => img && img.trim() !== "")
            : [];
    console.log("details Tours", tourData)
    
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* ================= IMAGE GALLERY ================= */}

            <div className="relative w-full h-96 overflow-hidden bg-gray-200 rounded-xl">
                {images && images.length > 0 ? (
                    images.length === 1 ? (
                        // ✅ Single Image (NO Carousel)
                        <div className="w-full h-full">
                            <Image
                                src={tourData.images[0]}
                                alt={tourData.title}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        // ✅ Multiple Images (Carousel)
                        <Carousel className="w-full h-full">
                            <CarouselContent>
                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Image
                                            src={image}
                                            alt={`${tourData.title} - Image ${index + 1}`}
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover"
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

            {/* ================= CONTENT ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* ===== LEFT SIDE ===== */}
                <div className="md:col-span-2 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {tourData.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            ⭐
                            <span className="font-semibold">
                                {tourData.avgRating || "New"}
                            </span>
                            <span>
                                ({tourData.reviewCount || 0} reviews)
                            </span>
                        </div>

                        <span>•</span>
                        <span>{tourData.city}</span>

                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        {tourData.description}
                    </p>

                    {/* ===== TOUR INFO GRID ===== */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <InfoItem icon={<MapPin size={20} />} label="City" value={tourData.city} />
                        <InfoItem icon={<Clock1 size={20} />} label="Duration" value={`${tourData.durationHours} hours`} />
                        <InfoItem icon={<Users size={20} />} label="Group Size" value={`${tourData.maxPeople} people`} />
                    </div>

                    {/* ===== MEETING POINT ===== */}
                    {tourData.meetingPoint && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-gray-800 mb-1">
                                Meeting Point
                            </h3>
                            <p className="text-gray-600">{tourData.meetingPoint}</p>
                        </div>
                    )}

                    {/* ===== TOUR Category ===== */}
                    {tourData.categories && tourData.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tourData.categories.map(cat => (
                                <span
                                    key={cat.id}
                                    className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
                                >
                                    {cat?.category?.name}
                                </span>
                            ))}
                        </div>
                    )}


                    {/* ===== GUIDE INFO ===== */}
                    {tourData.guide && (
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {tourData.guide.name.charAt(0)}
                            </div>

                            <div>
                                <p className="font-semibold">{tourData.guide.name}</p>
                                <p className="text-sm text-gray-600">
                                    🌍 {tourData.guide.profile?.languages?.join(", ") || "Local Guide"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== RIGHT SIDEBAR ===== */}
                <div className="border rounded-xl p-6 shadow-sm space-y-6 h-fit sticky top-24">
                    <div className="text-center">
                        <p className="text-gray-500">Tour Price</p>
                        <p className="text-3xl font-bold text-blue-600">
                            ${tourData.tourFee}
                        </p>
                    </div>

                    <div className="space-y-2 flex flex-col ">
                        <Button onClick={() => setShowAvailabilityModal(true)} className="flex-1">
                        Book Tour
                    </Button>
                    </div>
                </div>
                <BookTourDialog
                    tour={tourData}
                    isOpen={showAvailabilityModal}
                    onClose={() => setShowAvailabilityModal(false)}
                />
            </div>
        </div>
    );
};

export default ExploreToursDetails;