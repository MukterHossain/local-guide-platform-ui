"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createBooking } from "@/services/tourist/tourBookings";
import { IAvailability } from "@/types/availability.interface";
import { ITourList } from "@/types/tourList.interface";
import { Calendar, CheckCircle2, Loader2, MapPin, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface TourBookingConfirmationProps {
    tour: ITourList;
    availability: IAvailability;
}
const TourBookingConfirmation = ({ tour, availability }: TourBookingConfirmationProps) => {
     const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleConfirmBooking = async () => {
    setIsBooking(true);

    try {
      const result = await createBooking({
        tourId: tour.id!,
        availabilityId: availability.id,
        bookingDate: new Date().toISOString(),
      });

      if (result.success) {
        setBookingSuccess(true);
        toast.success("Booking confirmed successfully!");

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard/my-bookings");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to book appointment");
        setIsBooking(false);
      }
    } catch (error) {
      toast.error("An error occurred while booking the appointment");
      setIsBooking(false);
      console.error(error);
    }
  };

    if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-900">
                  Appointment Confirmed!
                </h2>
                <p className="text-green-700 mt-2">
                  Your appointment has been successfully booked
                </p>
              </div>
              <p className="text-sm text-green-600">
                Redirecting to your appointments...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Confirm Appointment
        </h1>
        <p className="text-muted-foreground mt-2">
          Review the details below and confirm your appointment
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Doctor Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Doctor Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-2xl font-semibold">{tour.title}</p>
              <p className="text-muted-foreground">{tour.description}</p>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Date:</span>
                <span className="text-sm font-medium">
                  {availability?.startAt}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Time:</span>
                <span className="text-sm font-medium">
                  {availability.startAt} - {availability.endAt}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              {tour?.guide?.profile?.expertise && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Qualification:
                  </span>
                  <span className="text-sm font-medium">
                    {tour?.guide?.profile?.expertise}
                  </span>
                </div>
              )}

              {tour?.guide?.profile?.experienceYears !== undefined && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Experience:
                  </span>
                  <span className="text-sm font-medium">
                    {tour?.guide?.profile?.experienceYears} years
                  </span>
                </div>
              )}

              {tour?.guide?.profile?.address && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Address:
                  </span>
                  <span className="text-sm font-medium">
                    {tour?.guide?.profile?.address}
                  </span>
                </div>
              )}
            </div>

            <Separator />

            

              {tour?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{tour?.location?.city}</span>
                </div>
              )}

            <Separator />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-900">
                  Tour Price
                </span>
                <span className="text-xl font-bold text-blue-600">
                  ${tour.tourFee.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="text-2xl font-bold text-blue-900">
                  {format(new Date(availability.startAt), "EEEE")}
                </p>
                <p className="text-lg text-blue-700">
                  {format(new Date(availability.endAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-semibold text-sm">Important Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    Please arrive 10 minutes before your scheduled time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    Bring any relevant medical records or prescriptions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    You can cancel or reschedule from your appointments page
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    A confirmation will be sent to your registered email
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3 pt-2">
              <Button
                onClick={handleConfirmBooking}
                disabled={isBooking}
                className="w-full"
                size="lg"
              >
                {isBooking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Confirm & Book Tour
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => router.back()}
                disabled={isBooking}
                className="w-full"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TourBookingConfirmation;