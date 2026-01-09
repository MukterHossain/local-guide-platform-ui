"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";

import { UserInfo } from "@/types/user.interface";

import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface MyProfileProps {
  userInfo: UserInfo;
  locations?: { id: string; city: string, country: string }[];
}

const MyProfile = ({ userInfo, locations }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    userInfo?.guideLocations?.map(l => l.locationId) || []
  );




  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    // formData.set("locationIds", JSON.stringify(selectedLocations));

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
        toast.success(result.message);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    });
  };

  console.log("userInfo", userInfo)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32   w-32">
                  {previewImage || userInfo?.profile?.image ? (
                    <AvatarImage
                      src={previewImage || (userInfo?.profile?.image as string)}
                      alt={userInfo?.name}
                    />
                  ) : (
                    <AvatarFallback className="text-3xl">
                      {userInfo?.name ? getInitials(userInfo?.name) : ""}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    type="file"
                    id="file"
                    name="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
              </div>


              <div className="text-center">
                <p className="font-semibold text-lg">{userInfo?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {userInfo?.email}
                </p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {/* {userInfo.role.replace("_", " ")} */}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Common Fields for All Roles */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={userInfo?.name || userInfo?.name}
                    disabled={isPending}
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo?.email}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={userInfo?.phone || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    defaultValue={userInfo?.profile?.address || ""}
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input
                    id="languages"
                    name="languages"
                    defaultValue={userInfo?.profile?.languages?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    name="gender"
                    defaultValue={userInfo?.profile?.gender || "MALE"}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isPending}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                {userInfo?.role === "GUIDE" && (

                  <div className="space-y-2">
                    <input
                      type="hidden"
                      name="locationIds"
                      value={selectedLocations.join(",")}
                    />
                    <Label>Locations</Label>

                    <div className="flex flex-wrap gap-2">
                      {selectedLocations.map(id => {
                        const loc = locations?.find(l => l.id === id);
                        return (
                          <span
                            key={id}
                            className="px-3 py-1 rounded-full bg-muted text-sm"
                          >
                            {loc?.city}
                          </span>
                        );
                      })}
                    </div>
                    <Dialog open={isEditLocation} onOpenChange={setIsEditLocation}>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Select Locations</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {locations?.map(loc => (
                            <label
                              key={loc.id}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                value={loc.id}
                                checked={selectedLocations.includes(loc.id)}
                                onChange={(e) => {
                                  setSelectedLocations(prev =>
                                    e.target.checked
                                      ? [...prev, loc.id]
                                      : prev.filter(id => id !== loc.id)
                                  );
                                }}
                              />
                              {loc.city} - {loc.country}
                            </label>
                          ))}
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditLocation(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditLocation(false);
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditLocation(true)}
                    >
                      Change
                    </Button>
                  </div>
                )}


                {/* Tourist section */}
                {userInfo?.role === "TOURIST" && (
                  <>
                    <div className="space-y-2">
                      <Label>Interests</Label>
                      <Input
                        name="interests"
                        defaultValue={userInfo?.touristPreference?.interests?.join(", ") || ""}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Travel Style</Label>
                      <select name="travelStyle" defaultValue={userInfo?.touristPreference?.travelStyle || "CASUAL"} className="w-full border py-1 px-1 rounded-md">
                        <option value="BUDGET">Budget</option>
                        <option value="STANDARD">Standard</option>
                        <option value="LUXURY">Luxury</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Languages</Label>
                      <Input
                        name="preferredLangs"
                        defaultValue={userInfo?.touristPreference?.preferredLangs?.join(", ") || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Group Size</Label>
                      <Input
                        name="groupSize"
                        type="number"
                        defaultValue={userInfo?.touristPreference?.groupSize || ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Travel Pace</Label>
                      <select  name="travelPace" defaultValue={userInfo?.touristPreference?.travelPace || "MODERATE"} className="w-full border py-1 px-1 rounded-md">
                        <option value="RELAXED">Relaxed</option>
                        <option value="MODERATE">Moderate</option>
                        <option value="FAST">Fast</option>
                      </select>
                    </div>
                  </>
                )}


                {/* Guide-Specific Fields */}
                {userInfo?.role === "GUIDE" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="expertise">Expertise</Label>
                      <Input
                        id="expertise"
                        name="expertise"
                        defaultValue={userInfo?.profile?.expertise || ""}
                      // disabled={isPending}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verificationStatus">verificationStatus</Label>
                      <Input
                        id="verificationStatus"
                        name="verificationStatus"
                        value={userInfo?.profile?.verificationStatus}
                        disabled
                        className="bg-muted"

                      />
                    </div>


                    <div className="space-y-2">
                      <Label htmlFor="experienceYears">
                        Experience years
                      </Label>
                      <Input
                        id="experienceYears"
                        name="experienceYears"
                        type="number"
                        defaultValue={userInfo.profile?.experienceYears || ""}
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dailyRate">Fee per day</Label>
                      <Input
                        id="dailyRate"
                        name="dailyRate"
                        type="number"
                        defaultValue={userInfo.profile?.dailyRate || ""}
                      // disabled={isPending}
                      />
                    </div>


                  </>
                )}


              </div>
              <div className="space-y-2 ">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  className="border w-full border-gray-300 p-2 rounded-md "
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={userInfo?.profile?.bio || ""}
                  disabled={isPending}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;