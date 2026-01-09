
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IWishlist {
  id: string;
  userId: string;

  title?: string | null;
  message: string;
  meta?: Record<string, any> | null;
  read: boolean;

  createdAt: string;
  updatedAt: string;
}
