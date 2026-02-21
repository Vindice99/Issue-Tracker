import { AddIssueButton } from "@/app/components";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import prisma from "@/prisma/client";
import { Issue, IssueStatus } from "@prisma/client";
import { Container, Flex } from "@radix-ui/themes";
import Pagination from "../components/Pagination";
import IssueTable from "./IssueTable";
import PageSizeSelector from "./PageSizeSelector";

//issueCount is the total number of issues matching the current filter
//where clause is built based on the status filter

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

  const issueCount = await prisma.issue.count({ where });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4ODg4ODgiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2SDE2djIwaDIwVjE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40 pointer-events-none"></div>
      
      <Container className="relative p-6 max-w-full">
        <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 mb-6">
          <Flex className="flex-wrap gap-3" justify="between" align="center">
            <div className="flex gap-3 flex-wrap">
              <AddIssueButton />
              <IssueStatusFilter />
            </div>
            <PageSizeSelector />
          </Flex>
        </div>
        
        <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden mb-6">
          <IssueTable searchParams={searchParams} />
        </div>
        
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Container>
    </div>
  );
};
export const dynamic = "force-dynamic";

export default IssuePage;
