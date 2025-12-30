"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";
import { IUserGuide } from "@/types/user.interface";
import { Clock, DollarSign, Eye, Star } from "lucide-react";
import Link from "next/link";


interface FindGuideCardProps {
    guide: IUserGuide;
}
const FindGuideCard = ({guide}: FindGuideCardProps) => {
    return (
         <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={guide.image || ""} alt={guide.name} />
              <AvatarFallback className="text-lg">
                {getInitials(guide.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-1">
                Dr. {guide.name}
              </CardTitle>
              <CardDescription className="line-clamp-1">
                {guide.languages?.join(", ")}
              </CardDescription>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">
                    {guide?.profile?.avgRating?.toFixed(1) || "N/A"}
                  </span>
                </div>
                {guide.profile &&
                  guide.profile.experienceYears && (
                    <Badge variant="secondary" className="text-xs">
                      {guide.profile.experienceYears} years
                    </Badge>
                  )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0" />
              <span className="truncate">{guide.profile?.experienceYears} years exp</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4 shrink-0" />
              <span className="font-semibold text-foreground">
                ${guide.profile?.feePerHour?.toFixed(2) || "N/A"}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t flex gap-2">
          <Link className="flex-1" href={`/consultation/doctor/${guide.id}`}>
            <Button variant="outline" className="w-full">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Button 
        //   onClick={() => setShowScheduleModal(true)} 
          className="flex-1">
            Book Appointment
          </Button>
        </CardFooter>
      </Card>

      {/* <BookAppointmentDialog
        doctor={doctor}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
      /> */}
    </>
    );
};

export default FindGuideCard;