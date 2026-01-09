"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IAvailability } from "@/types/availability.interface";
import { IBooking } from "@/types/booking.interface";
import { ITourList } from "@/types/tourList.interface";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BookTourDialogProps {
  tour: ITourList & { availability?: IAvailability[] };
  isOpen: boolean;
  onClose: () => void;
}
const BookAvailableTourDialog = ({ tour, isOpen, onClose }: BookTourDialogProps) => {
  const router = useRouter();
  const tourAvailability = Array.isArray(tour?.availability) ? tour.availability : [];
  const [selectedAvailability, setSelectedAvailability] = useState<IAvailability | null>(null);

  const handleCloseModal = () => {
    setSelectedAvailability(null);
    onClose();
  };

  const groupAvailabilitiesByDate = () => {
    const grouped: Record<string, IAvailability[]> = {};

    tourAvailability.forEach((availability) => {
      if (!availability) return;

      const dateObj = new Date(availability.startAt);

      const startDate = dateObj.toLocaleDateString("en-CA");

      if (startDate) {
        if (!grouped[startDate]) {
          grouped[startDate] = [];
        }
        grouped[startDate].push(availability);
      }
    });

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  const handleContinue = () => {
    if (selectedAvailability) {
      router.push(
        `/dashboard/booking/${tour.id}/${selectedAvailability.id}`
      );
    }
  };

  console.log("availability", tourAvailability)
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <>
          <DialogHeader>
            <DialogTitle>Book Tour {tour?.title}</DialogTitle>
            <DialogDescription>
              Select an available time slot for your tour
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Doctor Info */}
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div>

                <p className="text-sm text-muted-foreground">
                  Tour Fee: ${tour?.tourFee}
                </p>
              </div>
            </div>

            {/* Schedules */}
            {!tour.availability ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  Availability data not available
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  The tour has {tourAvailability.length} availability
                  {tourAvailability.length !== 1 ? "s" : ""}, but detailed
                  information is not loaded.
                </p>
              </div>
            ) : tour.availability?.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  No available slots at the moment
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please check back later
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {groupAvailabilitiesByDate().map(([date, dateAvailabilities]) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium">
                          {format(new Date(date), "EEEE, MMMM d, yyyy")}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {dateAvailabilities.map((availability) => {
                          const startTime = availability.startAt
                            ? new Date(availability.startAt)
                            : null;

                          return (
                            <Button
                              key={availability.id}
                              variant={
                                selectedAvailability?.id ===
                                  availability.id
                                  ? "default"
                                  : "outline"
                              }
                              className="justify-start h-auto py-2"
                              onClick={() => setSelectedAvailability(availability)}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              <span className="text-sm">
                                {startTime
                                  ? format(startTime, "h:mm a")
                                  : "N/A"}
                              </span>
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleCloseModal}>Close</Button>
            <Button onClick={handleContinue} disabled={!selectedAvailability}>
              Continue
            </Button>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default BookAvailableTourDialog;