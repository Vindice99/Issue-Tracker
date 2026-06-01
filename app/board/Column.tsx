"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { IssueStatus, Issue } from "@prisma/client";
import { IssueCard } from "./IssueCard";

interface ColumnProps {
  column: { id: IssueStatus; title: string };
  issues: Issue[];
}

export function Column({ column, issues }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-gray-100 dark:bg-gray-800/50 rounded-xl w-80 min-w-[320px] max-h-[calc(100vh-12rem)] flex-shrink-0 border border-gray-200 dark:border-gray-700/50"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700/50 font-semibold flex justify-between items-center bg-white/50 dark:bg-gray-800/80 rounded-t-xl">
        <span className="text-gray-700 dark:text-gray-200">{column.title}</span>
        <span className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">{issues.length}</span>
      </div>

      <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3">
        <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
