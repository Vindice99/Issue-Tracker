"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, LayoutDashboard, Plus, BugIcon } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <Command
        className="relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        <Command.Input 
          autoFocus
          placeholder="Type a command or search..."
          className="w-full border-b border-gray-200 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-gray-400 dark:border-gray-800 dark:text-gray-100" 
        />

        <Command.List className="max-h-[300px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>

          <Command.Group heading={<div className="px-2 py-1 text-xs font-medium text-gray-500">Links</div>}>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/dashboard"))}
              className="flex cursor-pointer items-center rounded-md px-2 md:py-2 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/issues"))}
              className="flex cursor-pointer items-center rounded-md px-2 md:py-2 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Issues List
            </Command.Item>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/board"))}
              className="flex cursor-pointer items-center rounded-md px-2 md:py-2 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50"
            >
              <BugIcon className="mr-2 h-4 w-4" />
              Kanban Board
            </Command.Item>
          </Command.Group>

          <Command.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-800" />

          <Command.Group heading={<div className="px-2 py-1 text-xs font-medium text-gray-500">Actions</div>}>
            <Command.Item
              onSelect={() => runCommand(() => router.push("/issues/new"))}
              className="flex cursor-pointer items-center rounded-md px-2 md:py-2 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Issue
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}