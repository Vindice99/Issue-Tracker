import { AddIssueButton } from "@/app/components";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import prisma from "@/prisma/client";
import { Issue, IssueStatus } from "@prisma/client";
import { Container, Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssueTable from "./IssueTable";
import PageSizeSelector from "./PageSizeSelector";

const IssuePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: IssueStatus;
    orderBy?: keyof Issue;
    page?: string;
    pageSize?: string;
  }>;
}) => {
  const params = await searchParams;
  const statuses = Object.values(IssueStatus);
  const status = statuses.includes(params.status!) ? params.status : undefined;
  const page = parseInt(params.page || "1", 10);
  const pageSize = parseInt(params.pageSize || "10", 10);
  const where = { status };

  // Get total count for pagination
  const issueCount = await prisma.issue.count({ where });

  return (
    <Container className="p-6 max-w-full">
      <Flex>
        <span className="flex justify-between gap-1.5">
          <AddIssueButton />
          <IssueStatusFilter />
          <PageSizeSelector />
        </span>
      </Flex>
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
