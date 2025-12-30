"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isDeleted?: boolean;
  isBlocked?: boolean;
  blockedText?: string;
  activeText?: string;
  deletedText?: string;
}

export function StatusBadgeCell({
  isDeleted = false,
  isBlocked = false,
  activeText = "Active",
  blockedText = "Blocked",
  deletedText = "Deleted",
}: StatusBadgeCellProps) {
  if (isDeleted) {
    return <Badge variant="destructive">{deletedText}</Badge>;
  }

  if (isBlocked) {
    return <Badge variant="secondary">{blockedText}</Badge>;
  }

  return <Badge variant="default">{activeText}</Badge>;
}