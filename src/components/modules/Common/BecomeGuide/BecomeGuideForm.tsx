"use client"

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createBecomeGuide } from "@/services/auth/becomeGuide";
import { UserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const BecomeGuideForm = ({
    locations,
    userInfo
}: {
    locations: { id: string; city: string, country: string }[];
    userInfo: UserInfo;
}) => {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(createBecomeGuide, null);
    const [isEditLocation, setIsEditLocation] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<string[]>(() => {
        if (userInfo?.guideLocations) {
            return userInfo.guideLocations.map((location) => location.locationId);
        }
        return [];
    });




    useEffect(() => {
        if (!userInfo) {
            router.replace("/register");
            return;
        }

        if (userInfo.role !== "TOURIST") {
            router.replace("/");
        }
    }, [userInfo, router]);



    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message || "Become Guide failed. Please try again.");
        }
    }, [state, router]);


    if (!locations || locations.length === 0) {
        return <p>Loading locations...</p>;
    }
    console.log("become guide", state)
    console.log("become locations", locations)


    return (
        <form action={formAction}>

            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    <input type="hidden" name="locationIds" value={selectedLocations.join(",")} />
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            value={userInfo.email}
                            readOnly
                            disabled
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </Field>
                    {/* Expertise */}

                    <Field>
                        <FieldLabel htmlFor="expertise">Expertise</FieldLabel>
                        <Input
                            id="expertise"
                            name="expertise"
                            type="text"
                            placeholder="e.g., Hiking, City Tours"
                        />
                        <InputFieldError field="expertise" state={state} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="experienceYears">Experience Years</FieldLabel>
                        <Input
                            id="experienceYears"
                            name="experienceYears"
                            type="number"
                            placeholder="0"
                        />
                        <InputFieldError field="experienceYears" state={state} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="dailyRate">Daily Rate</FieldLabel>
                        <Input
                            id="dailyRate"
                            name="dailyRate"
                            type="number"
                            placeholder="0"
                        />
                        <InputFieldError field="dailyRate" state={state} />
                    </Field>
                    {/* Location */}
                    {/* <Field>
                        <FieldLabel htmlFor="locationId">Location</FieldLabel>
                        <select
                            name="locationId"
                            id="locationId"
                            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="0">Select Location</option>
                            {locations?.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location?.city} - {location?.country}
                                </option>
                            ))}
                        </select>
                        <InputFieldError field="locationId" state={state} />
                    </Field> */}
                    <Field>
                        <FieldLabel>Locations</FieldLabel>
                        <div className="space-y-2">
                           <div className="flex flex-wrap gap-2">
                            {selectedLocations.map(id => {
                                const loc = locations.find(l => l.id === id);
                                return (
                                    <span key={id} className="px-3 py-1 rounded-full bg-muted text-sm">
                                        {loc?.city} - {loc?.country}
                                    </span>
                                );
                            })}
                          
                            
                        </div>   
                        <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditLocation(true)}
                    >
                      Select Locations
                    </Button>
                        </div>
                        
                        <Dialog open={isEditLocation} onOpenChange={setIsEditLocation}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Select Locations</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {locations.map(loc => (
                                        <label key={loc.id} className="flex items-center gap-2">
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
                                    <Button variant="outline" onClick={() => setIsEditLocation(false)}>Cancel</Button>
                                    <Button onClick={() => setIsEditLocation(false)}>Save</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                    </Field>
                    

                </div>
                <FieldGroup className="mt-4">
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Becoming Guide in..." : "Become Guide"}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default BecomeGuideForm;