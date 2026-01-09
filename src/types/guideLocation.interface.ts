import { IUserGuide } from "./user.interface";



export interface ILocation {
  id: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGuideLocation {
  id: string;
  guideId: string;
  locationId: string;

  guide?: IUserGuide;
  location?: ILocation;

  createdAt: string;
  updatedAt: string;

}