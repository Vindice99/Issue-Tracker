"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

interface LatestIssueClientProps {
  latestIssues: Array<{
    id: number;
    title: string;
  }>;
}

const LatestIssueClient = ({ latestIssues }: LatestIssueClientProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="w-full sm:w-auto"
    >
      <CollapsibleTrigger asChild>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 w-full sm:w-auto">
          Latest Issues
          {open ? (
            <Cross2Icon className="h-4 w-4" />
          ) : (
            <RowSpacingIcon className="h-4 w-4" />
          )}
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="absolute mt-2 w-full sm:w-80 z-10">
        <div className="rounded-md border bg-card shadow-lg">
          {latestIssues.length > 0 ? (
            <div className="divide-y">
              {latestIssues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/issues/${issue.id}`}
                  className="block px-4 py-3 text-sm hover:bg-accent transition-colors first:rounded-t-md last:rounded-b-md"
                >
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {issue.title}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              No issues yet
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default LatestIssueClient;
