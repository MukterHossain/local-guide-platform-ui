/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ITourList } from "@/types/tourList.interface";
import { Clock, DollarSign, MapPin, Users, Calendar, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ITourListCardProps {
    tour: ITourList;
    onViewDetails?: (tour: ITourList) => void;
}
const ExploreToursCard = ({ tour }: ITourListCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? tour.images.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === tour.images.length - 1 ? 0 : prev + 1
        );
    };

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group">
            {/* Image Carousel */}
            <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                {tour.images && tour.images.length > 0 ? (
                    tour.images.length === 1 ? (
                        // ✅ Single Image (NO Carousel)
                        <Image
                            src={tour.images[0]}
                            alt={tour.title}
                            width={500}
                            height={500}
                            className="w-full h-56 object-cover"
                        />
                    ) : (
                        // ✅ Multiple Images (Carousel)
                        <Carousel className="w-full h-full">
                            <CarouselContent>
                                {tour.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Image
                                            src={image}
                                            alt={`${tour.title} - Image ${index + 1}`}
                                            width={500}
                                            height={500}
                                            className="w-full h-56 object-cover"
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
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 ">
                    {tour.title.slice(0, 25)}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3 ">
                    {tour.description.slice(0, 100)}
                </p>

                {/* Tour Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{tour.city}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium">
                            {tour.durationHours}h
                        </span>
                    </div>

                    {/* Max People */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="text-sm font-medium">
                            {tour.maxPeople} {tour.maxPeople === 1 ? 'person' : 'people'}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm font-medium truncate">
                            {formatDate(tour.createdAt)}
                        </span>
                    </div>
                </div>

                {/* Meeting Point */}
                {tour.meetingPoint && (
                    <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Meeting Point</p>
                                <p className="text-sm text-gray-700 truncate">
                                    {tour.meetingPoint}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Guide Info */}
                {/* {tour.guide && (
                    <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {tour.guide.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                    {tour.guide.name}
                                </p>
                                <p className="text-xs text-gray-500 truncate">Tour Guide</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700">
                                    {tour.guide.languages?.join(', ')}
                                </span>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* View Details Button */}
                <div className="flex items-center justify-between gap-3">
                    {/* View Details */}
                    <Link
                        href={`/explore-tours/${tour.id}`}
                        className="text-sm md:text-lg text-center border border-blue-600 text-blue-600 font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-sm"
                    >
                        View Details
                    </Link>

                    {/* Book Now */}
                    <Link
                        href={`/tour/${tour.id}`}
                        className="text-sm md:text-lg  text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Book Now
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ExploreToursCard;