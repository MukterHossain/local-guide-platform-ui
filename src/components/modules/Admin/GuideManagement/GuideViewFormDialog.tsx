/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IUserGuide } from "@/types/user.interface";
import { getUserById } from "@/services/admin/userManagement";
import { InfoItem } from "@/components/shared/InfoItem";
interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string | undefined;
}

const GuideViewFormDialog = ({ open, onOpenChange, id }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IUserGuide | null>(null);

  useEffect(() => {
    if (!open || !id) return;

    (async () => {
      setLoading(true);

      const res = await getUserById(id);
// console.log("GET USER RES:", res);

      if (res.success) {
        setData(res.data);
      } else {
        toast.error(res.message);
      }

      setLoading(false);
    })();

  }, [open, id]);

  // console.log("guide data", data)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-3xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-center">
        Guide Information
      </DialogTitle>
    </DialogHeader>

    {/* Loading */}
    {loading ? (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading guide information...</p>
      </div>
    ) : !data ? (
      <div className="text-center py-10 text-red-500">
        No data found
      </div>
    ) : (
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center gap-3">
          <Image
            width={140}
            height={140}
            alt="Guide Image"
            src={data.image || "/avatar.jpg"}
            className="rounded-full object-cover shadow-md border"
          />
          <h2 className="text-lg font-medium">{data.name}</h2>
          <p className="text-sm text-gray-500">{data.email}</p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border">
          <InfoItem label="Phone" value={data.phone} />
          <InfoItem label="Address" value={data.address} />
          <InfoItem label="Gender" value={data.gender} />
          <InfoItem label="Status" value={data.status} />
          <InfoItem
            label="Languages"
            value={data.languages?.join(", ")}
            className="sm:col-span-2"
          />
          <InfoItem
            label="Bio"
            value={data.bio}
            className="sm:col-span-2"
          />
        </div>

        {/* Guide Profile */}
        {data.profile && (
          <div className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold mb-4 text-gray-800">
              Guide Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Expertise" value={data.profile.expertise} />
              <InfoItem
                label="Experience"
                value={
                  data.profile.experienceYears
                    ? `${data.profile.experienceYears} years`
                    : undefined
                }
              />
              <InfoItem
                label="Fee Per Hour"
                value={
                  data.profile.feePerHour
                    ? `$${data.profile.feePerHour}`
                    : undefined
                }
              />
              <InfoItem
                label="Rating"
                value={data.profile.avgRating?.toString()}
              />
            </div>
          </div>
        )}
      </div>
    )}
  </DialogContent>
</Dialog>

  );
};

export default GuideViewFormDialog;