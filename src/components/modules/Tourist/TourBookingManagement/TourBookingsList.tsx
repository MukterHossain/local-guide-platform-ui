/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IBooking } from "@/types/booking.interface";
import { BookingStatus } from "@/types/enum";

import { format } from "date-fns";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  Star,
  Stethoscope,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";


interface TourBookingsListProps {
    bookings: IBooking[];
}   
const TourBookingsList = ({ bookings }: TourBookingsListProps) => {
 
const getStatusBadge = (status: BookingStatus) => {
    const statusConfig: Record<
      BookingStatus,
      { variant: any; label: string; className?: string }
    > = {
      [BookingStatus.PENDING]: {
        variant: "default",
        label: "Pending",
        className: "bg-yellow-500 hover:bg-yellow-600",
      },
      [BookingStatus.CONFIRMED]: {
        variant: "secondary",
        label: "Confirmed",
      },
      [BookingStatus.COMPLETED]: {
        variant: "default",
        label: "Completed",
        className: "bg-green-500 hover:bg-green-600",
      },
      [BookingStatus.CANCELLED]: {
        variant: "destructive",
        label: "Canceled",
      },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

   if (bookings.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Bookings Yet</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            You haven&apos;t booked any bookings yet. Browse our tours and
            book your first tour.
          </p>
          <Button className="mt-4" asChild>
            <a href="/tours">Find a Tour</a>
          </Button>
        </CardContent>
      </Card>
    );
  }
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings?.map((booking) => (
        <Card
          key={booking.id}
          className="hover:shadow-lg transition-shadow"
        >
          <CardContent className="pt-6 space-y-4">
            {/* Status and Review Badge */}
            <div className="flex justify-between items-start gap-2 flex-wrap">
              {getStatusBadge(booking.status)}
              <div className="flex gap-2 flex-wrap">
                
                {booking.status === BookingStatus.COMPLETED &&
                  !booking.review && (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-300 animate-pulse"
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Can Review
                    </Badge>
                  )}
              </div>
            </div>

            {/* Doctor Info */}
            <div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {booking.user?.name || "N/A"}
                  </h3>
                </div>
              </div>
            </div>
            

            {/* Schedule */}
            {booking.availability && (
              <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {format(
                      new Date(booking.availability.startAt),
                      "EEEE, MMM d, yyyy"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {format(
                      new Date(booking.availability.endAt),
                      "EEEE, MMM d, yyyy"
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Address */}
            {booking.user?.profile?.address && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="line-clamp-2">
                  {booking.user.profile.address}
                </span>
              </div>
            )}

            {/* Review Status */}
            {booking.status === BookingStatus.COMPLETED && (
              <div>
                {booking.review ? (
                  <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 rounded-lg p-2">
                    <Star className="h-4 w-4 fill-yellow-600" />
                    <span>Rated {booking.review.rating}/5</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-2">
                    No review yet
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t pt-4">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/dashboard/my-bookings/${booking.id}`}>
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    );
};

export default TourBookingsList;