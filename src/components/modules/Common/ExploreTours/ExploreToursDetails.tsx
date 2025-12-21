'use client'
import { InfoItem } from "@/components/shared/InfoItem";
import { Button } from "@/components/ui/button";
import { ITourList } from "@/types/tourList.interface";
import { Calendar, Clock1, Globe, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ExploreToursDetails = ({ tourData }: { tourData: ITourList }) => {

    console.log("details Tours", tourData)
    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* ================= IMAGE GALLERY ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tourData.images?.map((img, index) => (
                    <div
                        key={index}
                        className="relative h-72 rounded-xl overflow-hidden"
                    >
                        <Image
                            src={img}
                            alt={`${tourData.title}-${index}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* ================= CONTENT ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* ===== LEFT SIDE ===== */}
                <div className="md:col-span-2 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {tourData.title}
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        {tourData.description}
                    </p>

                    {/* ===== TOUR INFO GRID ===== */}
                    <div className="grid grid-cols-2 gap-4">
                        <span className="flex items-center gap-2"><MapPin /> </span>{tourData.city}
                        <span className="flex items-center gap-2"><Clock1 /> </span>{tourData.durationHours}
                        <span className="flex items-center gap-2"><Users /> </span>{tourData.maxPeople}
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

                    {/* ===== GUIDE INFO ===== */}
                    {tourData.guide && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Tour Guide
                            </h3>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                    {tourData.guide.name?.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">
                                        {tourData.guide.name}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Globe className="w-4 h-4" />
                                        {tourData.guide.languages?.join(", ")}
                                    </div>
                                </div>
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
                        <Link href={`/explore-tours/book/${tourData.id}`}>
                        <Button className="w-full  bg-purple-900 text-white py-3 rounded-lg">
                            Book This Tour
                        </Button>
                    </Link>

                    <Button className="w-full  bg-blue-600 text-white py-3 rounded-lg">
                        Contact Guide
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreToursDetails;