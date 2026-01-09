import { ITourList } from "./tourList.interface";

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITourCategory {
  id: string;
  tourId: string;
  categoryId: string;

  tour?: ITourList;
  category?: ICategory;

  createdAt: string;
  updatedAt: string;
}
