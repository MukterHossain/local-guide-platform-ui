

export interface ITourList {
  id: string;
  guideId: string;
  title: string;
  description: string;
  durationHours: number;
  city: string;
  images: string[];
  tourFee: number;
  maxPeople: number;
  meetingPoint: string;

  createdAt: string | Date;
  updatedAt: string | Date;
}