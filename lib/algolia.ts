import algoliasearch from "algoliasearch";
import { Issue, IssueStatus } from "@prisma/client";
import prisma from "@/prisma/client";

const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaAdminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;
const algoliaIssueIndexName = process.env.ALGOLIA_ISSUE_INDEX_NAME || "issues";

const algoliaClient =
  algoliaAppId && algoliaAdminApiKey
    ? algoliasearch(algoliaAppId, algoliaAdminApiKey)
    : null;

const issueIndex = algoliaClient
  ? algoliaClient.initIndex(algoliaIssueIndexName)
  : null;

export type IssueListQuery = {
  status?: IssueStatus;
  orderBy?: keyof Issue;
  page?: string;
  pageSize?: string;
  q?: string;
};

export type IssueListResult = {
  issues: Issue[];
  issueCount: number;
};

const validOrderBy = ["title", "status", "createdAt"] as const;

const getOrderBy = (orderBy?: keyof Issue) =>
  validOrderBy.includes(orderBy as (typeof validOrderBy)[number])
    ? orderBy
    : "createdAt";

const getStatusFilter = (status?: IssueStatus) => {
  const statuses = Object.values(IssueStatus);
  return statuses.includes(status!) ? status : undefined;
};

const toSearchRecord = (issue: Issue) => ({
  objectID: issue.id.toString(),
  title: issue.title,
  description: issue.description,
  status: issue.status,
  severity: issue.severity,
  assignedToUserId: issue.assignedToUserId,
  createdAt: issue.createdAt.toISOString(),
  updateAt: issue.updateAt.toISOString(),
});

export async function syncIssueToAlgolia(issue: Issue) {
  if (!issueIndex) return;

  await issueIndex.saveObject(toSearchRecord(issue));
}

export async function removeIssueFromAlgolia(issueId: number) {
  if (!issueIndex) return;

  await issueIndex.deleteObject(issueId.toString());
}

export async function getIssueList(query: IssueListQuery): Promise<IssueListResult> {
  const status = getStatusFilter(query.status);
  const page = parseInt(query.page || "1", 10);
  const pageSize = parseInt(query.pageSize || "10", 10);
  const searchTerm = query.q?.trim() || "";

  if (searchTerm && issueIndex) {
    const searchResult = await issueIndex.search(searchTerm, {
      page: page - 1,
      hitsPerPage: pageSize,
      filters: status ? `status:${status}` : undefined,
    });

    const issueIds = searchResult.hits
      .map((hit) => Number(hit.objectID))
      .filter((issueId) => Number.isInteger(issueId));

    if (issueIds.length === 0) {
      return {
        issues: [],
        issueCount: searchResult.nbHits,
      };
    }

    const issues = await prisma.issue.findMany({
      where: { id: { in: issueIds } },
    });

    const issueById = new Map(issues.map((issue) => [issue.id, issue]));

    return {
      issues: issueIds
        .map((issueId) => issueById.get(issueId))
        .filter((issue): issue is Issue => Boolean(issue)),
      issueCount: searchResult.nbHits,
    };
  }

  const where = {
    ...(status ? { status } : {}),
    ...(searchTerm
      ? {
          title: {
            contains: searchTerm,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const issueCount = await prisma.issue.count({ where });
  const issues = await prisma.issue.findMany({
    where,
    orderBy: { [getOrderBy(query.orderBy)]: "asc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    issues,
    issueCount,
  };
}