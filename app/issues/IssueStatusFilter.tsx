'use client'
import { Issue, IssueStatus, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  return (
    <>
      <Select.Root onValueChange={(status) => {
        const params = new URLSearchParams();
        if(status)params.append('status', status);
        if(searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);
        if(searchParams.get('page')) params.append('page', searchParams.get('page')!);
        const query = params.toString();
        router.push('/issues' + (query ? `?${query}` : ''));
        router.refresh();
      }}
      defaultValue={searchParams.get('status') || 'All'}
      >
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
