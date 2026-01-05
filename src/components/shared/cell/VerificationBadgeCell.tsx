
"use client";

import { Badge } from "@/components/ui/badge";

interface VerificationBadgeCellProps {
    pending?: boolean;
    verified?: boolean;
    rejected?: boolean;
    pendingText?: string;
    verifiedText?: string;
    rejectedText?: string;
}
const VerificationBadgeCell = ({ pending, verified, rejected, pendingText = "Pending", verifiedText = "Verified", rejectedText = "Rejected" }: VerificationBadgeCellProps) => {
    return (
        <div>
            {pending && <Badge variant="secondary">{pendingText}</Badge>}
            {verified && <Badge variant="default">{verifiedText}</Badge>}
            {rejected && <Badge variant="destructive">{rejectedText}</Badge>}
        </div>
    );
};

export default VerificationBadgeCell;