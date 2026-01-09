/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IBooking } from "@/types/booking.interface";
import { BookingStatus } from "@/types/enum";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReviewDialog from "./ReviewDialog";


interface TourBookingDetailsProps {
    booking: IBooking
}
const TourBookingDetails = ({ booking }: TourBookingDetailsProps) => {
    const router = useRouter();
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const isCompleted = booking.status === BookingStatus.COMPLETED;
  const canReview = isCompleted && !booking.review;
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
    return (
        <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Booking Details
          </h1>
          <p className="text-muted-foreground mt-2">
            Complete information about your booking
          </p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      {canReview && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">
                  Review This Appointment
                </h3>
                <p className="text-sm text-amber-700 mt-1">
                  You can write a review for {booking.user?.name}.
                </p>
                <Button
                  onClick={() => setShowReviewDialog(true)}
                  className="mt-3"
                  size="sm"
                >
                  Write a Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

            {/* Cannot Review Yet - Only show if not completed and no review */}

      {!isCompleted && !booking.review && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">
                  Review Not Available Yet
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  You can review this booking after it has been completed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Guide Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Guide Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-semibold">
                {booking?.user?.name || "N/A"}
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
            

              {booking?.user?.profile?.experienceYears !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">
                    {booking.user.profile.experienceYears} years
                  </span>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              {booking?.user?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.user.phone}</span>
                </div>
              )}

              {booking?.user?.profile?.address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>{booking.user?.profile?.address}</span>
                </div>
              )}
            </div>

            {booking?.user?.profile?.dailyRate !== undefined && (
              <>
                <Separator />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-blue-900">
                        Daily Rate
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      ${booking.user.profile.dailyRate}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Booking Details */}
        <div className="space-y-6 lg:col-span-1">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Current Status
                </span>
                {getStatusBadge(booking.status)}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          { booking?.availability && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Start date</p>
                    <p className="text-xl font-bold text-blue-900">
                      {format(
                        new Date(booking.availability.startAt),
                        "EEEE"
                      )}
                    </p>
                  </div>

                  <Separator className="bg-blue-200" />

                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">End date</p>
                      <p className="font-semibold text-blue-900">
                        {format(
                          new Date(booking.availability.endAt),
                          "h:mm a"
                        )}{" "}
                        -{" "}
                        
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
            {/* Review Section - Full Width Below */}
      {booking.review && (
        <Card className="border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <Star className="h-5 w-5 fill-yellow-600" />
              Your Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= booking.review!.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-yellow-900">
                  {booking.review.rating}/5
                </span>
              </div>

              {booking.review.comment && (
                <div>
                  <p className="text-sm text-yellow-900 font-medium mb-1">
                    Comment:
                  </p>
                  <p className="text-sm text-yellow-800">
                    {booking.review.comment}
                  </p>
                </div>
              )}

              <p className="text-xs text-yellow-600 italic">
                Reviews cannot be edited or deleted once submitted.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Dialog */}
      {canReview && (
        <ReviewDialog
          isOpen={showReviewDialog}
          onClose={() => setShowReviewDialog(false)}
          bookingId={booking.id}
          guideName={booking.user?.name || "the doctor"}
        />
      )}
        </div>
    );
};

export default TourBookingDetails;