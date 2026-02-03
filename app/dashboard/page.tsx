import React from "react";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "../LatestIssue";
import LatestIssueDetail from "./LatestIssueDetail";
import { Metadata } from "next";

const DashBoardPage = async () => {
//Can refactor to a single object query later
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <div className="mt-7 ml-6A">
      <Grid columns={{ initial: "1", md: "2" }} gap="6">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssueDetail />
      </Grid>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Dashboard - Issue Tracker",
  description: "Overview of issue statistics and latest issues.",
};

export default DashBoardPage;
