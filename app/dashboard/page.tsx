import React from "react";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssueDetail from "./LatestIssueDetail";
import { Metadata } from "next";
import { redis } from "../../lib/redis";
import {auth} from "@/auth";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  // //Can refactor to a single object query later
  //   const open = await prisma.issue.count({ where: { status: "OPEN" } });
  //   const inProgress = await prisma.issue.count({
  //     where: { status: "IN_PROGRESS" },
  //   });
  //   const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  const cacheKey = "dashboard:stats"; // Key for caching issue stats
  let statsData = await redis.get(cacheKey);
  const session = await auth();
  if (session?.user.role !== "admin") {
    redirect("/"); // Redirect unauthorized users
  }
  let stats;

  if (!statsData) {
    stats = {
      open: await prisma.issue.count({ where: { status: "OPEN" } }),
      inProgress: await prisma.issue.count({
        where: { status: "IN_PROGRESS" },
      }),
      closed: await prisma.issue.count({ where: { status: "CLOSED" } }),
    };
    await redis.setex(cacheKey, 600, JSON.stringify(stats)); 
  } else {
    stats = JSON.parse(statsData);
  }

  return (
    <div className="mt-7 ml-6A">
      <Grid columns={{ initial: "1", md: "2" }} gap="6">
        <Flex direction="column" gap="5">
          <IssueSummary open={stats!.open} inProgress={stats!.inProgress} closed={stats!.closed} />
          <IssueChart open={stats!.open} inProgress={stats!.inProgress} closed={stats!.closed} />
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
