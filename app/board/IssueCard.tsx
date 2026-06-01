"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Issue } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/app/components";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface IssueCardProps {
  issue: Issue;
  isOverlay?: boolean;
}

export function IssueCard({ issue, isOverlay = false }: IssueCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.id,
    data: {
      type: "Task",
      issue,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging && !isOverlay) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 h-28"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group cursor-grab active:cursor-grabbing ${
        isOverlay ? "animate-pop shadow-2xl rotate-2" : ""
      }`}
    >
      <Card className="hover:shadow-md transition-shadow dark:bg-gray-800 border-gray-200 dark:border-gray-700/80">
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <Link 
              href={`/issues/${issue.id}`}
              className="font-medium text-sm leading-tight hover:underline line-clamp-2"
              onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking link
            >
              {issue.title}
            </Link>
          </div>
          
          <div className="flex justify-between items-end mt-auto pt-2">
            <StatusBadge status={issue.status} />
            <span className="text-xs text-gray-500 font-medium">
              #{issue.id}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
