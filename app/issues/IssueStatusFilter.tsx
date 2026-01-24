'use client'
import { Issue, IssueStatus, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const statuslabels: Record<IssueStatus, string> = {
    [IssueStatus.OPEN]: "Open",
    [IssueStatus.IN_PROGRESS]: "In Progress",
    [IssueStatus.CLOSED]: "Closed",
  };
  //Auto-generate array from the enum
  const statutes = Object.values(IssueStatus).map(value => ({
	label: statuslabels[value], value
  }));

  const router = useRouter();
  return (
    <>
      <Select.Root onValueChange={(status) => {
        router.push(status === 'All' ? '/issues' : `/issues?status=${status}`);
        router.refresh();
      }}>
        <Select.Trigger placeholder="Select status…" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="All">All</Select.Item>
            {statutes?.map(({label,value}) => (
              <Select.Item key={value} value={value}>
                {label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};



export default IssueStatusFilter;
