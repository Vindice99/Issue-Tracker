"use client";

import { DropdownMenu } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

interface MoreActionsMenuProps {
  issueId: number;
  currentSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const severityLabels = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

const MoreActionsMenu = ({ issueId, currentSeverity }: MoreActionsMenuProps) => {
  const updateSeverity = async (severity: MoreActionsMenuProps["currentSeverity"]) => {
    try {
      await axios.patch("/api/issue/" + issueId, { severity });
      toast.success("Severity updated");
    } catch {
      toast.error("Failed to update severity");
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
          More Actions
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <Link href={`/issues/${issueId}/edit`}>Assign to User</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            Change Severity ({severityLabels[currentSeverity]})
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            {Object.entries(severityLabels).map(([value, label]) => (
              <DropdownMenu.Item
                key={value}
                onSelect={() => updateSeverity(value as MoreActionsMenuProps["currentSeverity"])}
              >
                {label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MoreActionsMenu;
