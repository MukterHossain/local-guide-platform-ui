import TourBookingConfirmation from "@/components/modules/Tourist/TourBookingManagement/TourBookingConfirmation";
import { getAvailabilityById } from "@/services/guide/guideAvailable";
import { getBookingById } from "@/services/tourist/tourBookings";
import { IAvailability } from "@/types/availability.interface";
import { IBooking } from "@/types/booking.interface";
import { ITourList } from "@/types/tourList.interface";
import { UserInfo } from "@/types/user.interface";
import { notFound } from "next/navigation";


interface BookTourPageProps {
    params: Promise<{
        userId: string;
        availabilityId: string;
    }>;
}

const BookTourPage = async({ params }: BookTourPageProps) => {
    const { userId, availabilityId } = await params;

  // Fetch guide and availability in parallel
  const [tourResponse, availabilityResponse] = await Promise.all([
    getBookingById(userId),
    getAvailabilityById(availabilityId),
  ]);

  if (!tourResponse?.success || !availabilityResponse?.success) {
    notFound();
  }

  const tour: ITourList = tourResponse.data;
  const availability: IAvailability = availabilityResponse.data;
    return (
        <div className="container mx-auto px-4 py-8">
            <TourBookingConfirmation tour={tour} availability={availability}></TourBookingConfirmation>
        </div>
    );
};

export default BookTourPage;