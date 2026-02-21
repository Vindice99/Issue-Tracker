"use client";
import { Issue, IssueStatus, User } from "@prisma/client";
import axios from "axios";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Skeleton from "@/app/components/Skeleton";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const statuslabels: Record<IssueStatus, string> = {
    [IssueStatus.OPEN]: "Open",
    [IssueStatus.IN_PROGRESS]: "In Progress",
    [IssueStatus.CLOSED]: "Closed",
  };

  //Auto-generate array from the enum
  const statutes = Object.values(IssueStatus).map(value => ({
	label: statuslabels[value], value
  }));
  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => {
          axios
            .patch("/api/issue/" + issue.id, {
              status: status as IssueStatus,
            })
            .catch(() => {
              toast.error("Failed to update status");
            });
        }}
      >
        <Select.Trigger placeholder="Select status…" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unset">Unset</Select.Item>
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



export default StatusSelect;
