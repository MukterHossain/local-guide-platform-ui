import { IUserGuide } from "./user.interface";


export interface ILocation {
  id: string;
  city: string;
  country: string;
}

export interface IGuideLocation {
  id: string;
  guideId: string;
  locationId: string;
  createdAt: string; 

  guide: IUserGuide;
  location: ILocation;
}