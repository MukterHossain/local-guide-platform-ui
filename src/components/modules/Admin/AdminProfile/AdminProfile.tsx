"use client"
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updateAdminProfile } from '@/services/admin/userManagement';
import { UserInfo } from '@/types/user.interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useActionState, useEffect, useRef, useState } from 'react';

type Props = {
    admin: UserInfo;
};
const AdminProfile = ({ admin }: Props) => {
    const [state, formAction, isPending] = useActionState(updateAdminProfile, null)
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
                            defaultValue={state?.formData?.name || admin?.name}
                        />
                    </Field>

                    {/* Email (READ ONLY) */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            defaultValue={admin?.email}
                            disabled
                        />
                    </Field>

                    {/* Phone */}
                    <Field>
                        <FieldLabel htmlFor="phone">Contact Number</FieldLabel>
                        <Input
                            id="phone"
                            name="phone"
                            defaultValue={state?.formData?.phone || admin?.phone}
                        />
                    </Field>

                    {/* Profile Image */}
                    <Field>
                        {(selectedFile || admin?.image) && (
                            <div className="mb-2">
                                <Image
                                    src={
                                        selectedFile
                                            ? URL.createObjectURL(selectedFile)
                                            : admin.image
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

export default AdminProfile;