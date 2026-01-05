"use client";

import { Badge } from "@/components/ui/badge";

interface GenderBadgeCellProps {
  maile?:boolean;
  female?:boolean;
  maileText?:string;
  femaleText?:string;
}
const GenderBadgeCell = ({ maile, female, maileText = "Male", femaleText = "Female" }: GenderBadgeCellProps) => {
     if (!maile && !female) {
    return <Badge variant="outline">N/A</Badge>;
  }
    return (
        <div>
            {maile && <Badge variant="default">{maileText}</Badge>}
            {female && <Badge variant="secondary">{femaleText}</Badge>}
        </div>
    );
};

export default GenderBadgeCell;