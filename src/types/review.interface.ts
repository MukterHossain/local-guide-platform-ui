import { ITourList } from "./tourList.interface";
import { IUserGuide, UserInfo } from "./user.interface";


export interface IReview {
  id: string;
  userId: string;
  guideId: string;
  tourId: string;
  rating: number; // 1–5
  comment?: string | null;
  createdAt: string;
  updatedAt: string;

  user?: UserInfo;
  guide?: IUserGuide;
  tour?: ITourList;
}

export interface IReviewFormData {
  // guideId: string;
  // tourId: string;
  bookingId: string;
  rating: number;
  comment?: string;
}