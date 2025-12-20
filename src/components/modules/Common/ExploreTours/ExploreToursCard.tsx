/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button } from "@/components/ui/button";
import { ITourList } from "@/types/tourList.interface";
import { Clock, DollarSign, MapPin, Users, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ITourListCardProps {
    tour: ITourList;
    onViewDetails?: (tour: ITourList) => void;
}
const ExploreToursCard =  ({ tour}: ITourListCardProps) => {
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
            <div className="relative h-56 overflow-hidden bg-gray-200">
                {tour.images && tour.images.length > 0 ? (
                    <>
                        <Image
                            src={tour.images[currentImageIndex]}  
                            alt={`${tour.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" width={500} height={500}
                        />

                        {/* Image Navigation */}
                        {tour.images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="Previous image"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                                    aria-label="Next image"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {tour.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`h-2 rounded-full transition-all ${
                                                index === currentImageIndex
                                                    ? "w-6 bg-white"
                                                    : "w-2 bg-white/50 hover:bg-white/75"
                                            }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Image Counter Badge */}
                        {tour.images.length > 1 && (
                            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                                {currentImageIndex + 1} / {tour.images.length}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                        <MapPin className="w-16 h-16 text-gray-500" />
                    </div>
                )}

                {/* Price Badge */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-lg font-bold">${tour.tourFee}</span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                    {tour.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3 min-h-[4rem]">
                    {tour.description}
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
                        </div>
                    </div>
                )} */}

                {/* View Details Button */}
                <Link
                    href={`/tours/${tour.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ExploreToursCard;