"use client";

import React, { useState } from "react";
import { Issue, IssueStatus } from "@prisma/client";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column } from "./Column";
import { IssueCard } from "./IssueCard";
import axios from "axios";
import toast from "react-hot-toast";

interface BoardProps {
  initialIssues: Issue[];
}

export default function Board({ initialIssues }: BoardProps) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px movement before dragging starts
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: IssueStatus.OPEN, title: "Open" },
    { id: IssueStatus.IN_PROGRESS, title: "In Progress" },
    { id: IssueStatus.CLOSED, title: "Closed" },
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setIssues((issues) => {
        const activeIndex = issues.findIndex((t) => t.id === activeId);
        const overIndex = issues.findIndex((t) => t.id === overId);

        if (issues[activeIndex].status !== issues[overIndex].status) {
          const newIssues = [...issues];
          newIssues[activeIndex].status = issues[overIndex].status;
          return arrayMove(newIssues, activeIndex, overIndex);
        }

        return arrayMove(issues, activeIndex, overIndex);
      });
    }

    // Dropping a task over a column
    if (isActiveTask && isOverColumn) {
      setIssues((issues) => {
        const activeIndex = issues.findIndex((t) => t.id === activeId);
        const newIssues = [...issues];
        newIssues[activeIndex].status = overId as IssueStatus;
        return arrayMove(newIssues, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeIssue = issues.find((issue) => issue.id === activeId);
    if (!activeIssue) return;

    const targetStatus = over.data.current?.type === "Column" 
      ? overId as IssueStatus 
      : issues.find((t) => t.id === overId)?.status;

    if (targetStatus && activeIssue.status !== targetStatus) {
      // API call to update status
      try {
        await axios.patch(`/api/issue/${activeIssue.id}`, { status: targetStatus });
        toast.success("Issue status updated");
      } catch (err) {
        toast.error("Failed to update status");
        // Optional: rollback state
      }
    }
  };

  const activeIssue = issues.find((i) => i.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            issues={issues.filter((i) => i.status === col.id)}
          />
        ))}
      </div>

      <DragOverlay>
        {activeIssue ? <IssueCard issue={activeIssue} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
