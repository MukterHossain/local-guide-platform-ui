"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updateGuideProfile } from '@/services/guide/guideManagement';

import { IUserGuide, } from '@/types/user.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useRef, useState } from 'react';

type Props = {
    guide: IUserGuide;
};
const GuideProfile = ({ guide }: Props) => {
    const [state, formAction, isPending] = useActionState(updateGuideProfile, null)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };


    useEffect(() => {
        if (state?.success) {
            router.refresh();
        }
    }, [state, router]);
    console.log("admin update data", state)
    return (
        <div>
            <form action={formAction} className="flex flex-col flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">

                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={state?.formData?.name || guide?.name}
                        />
                    </Field>

                    {/* Email (READ ONLY) */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            defaultValue={guide?.email}
                            disabled
                        />
                    </Field>

                    {/* Phone */}
                    <Field>
                        <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
                        <Input
                            id="phone"
                            name="phone"
                            defaultValue={state?.formData?.phone || guide?.phone}
                        />
                    </Field>
                    {/* gender */}
                    <Field>
                        <FieldLabel>Gender</FieldLabel>
                        <select
                            name="gender"
                            defaultValue={guide?.gender}
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Select</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </Field>

                    {/* address */}
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input
                            id="address"
                            name="address"
                            defaultValue={state?.formData?.address || guide?.address}
                        />
                    </Field>

                    {/* bio */}
                    <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <Input
                            id="bio"
                            name="bio"
                            defaultValue={state?.formData?.bio || guide?.bio}
                        />
                    </Field>

                    {/* languages */}
                    <Field>
                        <FieldLabel>Languages</FieldLabel>
                        <Input
                            name="languages"
                            placeholder="English, Bangla, Hindi"
                            defaultValue={guide?.languages?.join(", ")}
                        />
                    </Field>


                    {/* Profile Image */}
                    <Field>
                        {(selectedFile || guide?.image) && (
                            <div className="mb-2">
                                <Image
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : guide.image || ""
                                    }
                                    alt="Profile"
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                            </div>
                        )}

                        <Input
                            ref={fileInputRef}
                            id="file"
                            name="file"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Field>
                    {/* Guide Profile */}
                    {guide?.profile && (
                        <div>
                            {/* availableStatus */}
                            <Field>
                                <FieldLabel>Available</FieldLabel>
                                <input
                                    type="checkbox"
                                    name="availableStatus"
                                    defaultChecked={guide?.profile?.availableStatus ?? false}
                                    value="true"
                                    className="h-4 w-4"
                                />
                            </Field>

                            {/* expertise */}
                            <Field>
                                <FieldLabel htmlFor="expertise">Expertise</FieldLabel>

                                <Input
                                    id="expertise"
                                    name="expertise"
                                    defaultValue={state?.formData?.expertise || guide?.profile?.expertise}
                                />
                            </Field>

                            {/* experienceYears */}
                            <Field>
                                <FieldLabel htmlFor="experienceYears">Experience</FieldLabel>

                                <Input
                                    id="experienceYears"
                                    type='number'
                                    name="experienceYears"
                                    defaultValue={state?.formData?.experienceYears || guide?.profile?.experienceYears}
                                />
                            </Field>
                            {/* feePerHour */}
                            <Field>
                                <FieldLabel htmlFor="feePerHour">Fee Per Hour</FieldLabel>

                                <Input
                                    id="feePerHour"
                                    type='number'
                                    name="feePerHour"
                                    defaultValue={state?.formData?.feePerHour || guide?.profile?.feePerHour}
                                />
                            </Field>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Update Profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default GuideProfile;