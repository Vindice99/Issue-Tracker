
import { AddIssueButton } from "@/app/components";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import prisma from "@/prisma/client";
import { Issue, IssueStatus } from "@prisma/client";
import { Container } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssueTable from "./IssueTable";

const IssuePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: IssueStatus;
    orderBy?: keyof Issue;
    page?: string;
  }>;
}) => {
  const params = await searchParams;
  const statuses = Object.values(IssueStatus);
  const status = statuses.includes(params.status!) ? params.status : undefined;
  const page = parseInt(params.page || "1", 10);
  const pageSize = 3;
  const where = { status };

  // Get total count for pagination
  const issueCount = await prisma.issue.count({ where });

  return (
    <Container className="p-6 max-w-full">
      <span className="flex justify-between gap-1.5">
        <AddIssueButton />
        <IssueStatusFilter />
      </span>
      <IssueTable searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Container>
  );
};
export const dynamic = "force-dynamic";

export default IssuePage;
