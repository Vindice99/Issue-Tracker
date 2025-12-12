import React from "react";
import { Badge } from "@radix-ui/themes";
import { IssueStatus } from "@/app/generated/prisma";

// Hash map for status to label and color
const statusMap: Record<IssueStatus, { label: string; color: "green" | "yellow" | "red" }> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
  CLOSED: { label: "Closed", color: "red" },
};

const StatusBadge = ({ status }: { status: IssueStatus }) => {
  return <Badge color={statusMap[status].color}>{statusMap[status].label} </Badge>;
};

export default StatusBadge;
