/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ITourList } from "@/types/tourList.interface";
import { Clock, DollarSign, MapPin, Users, Calendar, Globe, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookTourDialog from "./BookAvailableTourDialog";

interface ITourListCardProps {
    tour: ITourList;
    onViewDetails?: (tour: ITourList) => void;
}
const ExploreToursCard = ({ tour }: ITourListCardProps) => {
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
    const images = Array.isArray(tour.images)
        ? tour.images.filter(img => typeof img === "string" && img.trim() !== "")
        : [];

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };


    console.log("tour", tour);
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group">
            {/* Image Carousel */}
            <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                {images && images.length > 0 ? (
                    images.length === 1 ? (
                        // ✅ Single Image (NO Carousel)
                        <Image
                            src={tour.images[0]}
                            alt={tour.title}
                            width={500}
                            height={500}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        // ✅ Multiple Images (Carousel)
                        <Carousel className="w-full h-full">
                            <CarouselContent>
                                {images?.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Image
                                            src={image}
                                            alt={`${tour.title} - Image ${index + 1}`}
                                            width={500}
                                            height={500}
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <span className="text-lg font-bold">${tour.tourFee}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {tour.title.slice(0, 30)}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-gray-800">
                        {tour?.guide?.profile?.avgRating ? tour?.guide?.profile?.avgRating.toFixed(1) : "New"}
                    </span>
                    <span className="text-gray-500">
                        reviewsCount
                        {/* ({tour.guide?.profile?.reviewCount ?? 0}) */}
                    </span>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="truncate">{tour.city}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span>{tour.durationHours}h</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>
                            {tour.maxPeople}{" "}
                            {tour.maxPeople === 1 ? "person" : "people"}
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="flex items-center justify-between gap-3">
                    <Link
                        href={`/explore-tours/tours/${tour.id}`}
                        className="block w-full text-center rounded-lg border border-blue-600 text-blue-600 font-semibold py-2 transition hover:bg-blue-50"
                    >
                        View Details
                    </Link>
                    <Button onClick={() => setShowAvailabilityModal(true)} className="flex-1">
                        Book Tour
                    </Button>
                </div>
                <BookTourDialog 
                tour={tour}
                isOpen={showAvailabilityModal} onClose={() => setShowAvailabilityModal(false)} />
            </div>
        </div>
    );
};

export default ExploreToursCard;