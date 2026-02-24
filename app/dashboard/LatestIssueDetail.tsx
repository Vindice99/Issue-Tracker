import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { StatusBadge } from "../components";

const LatestIssueDetail = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card className="shadow-md border border-gray-100 dark:border-gray-800">
      <Flex justify="between" align="center" mb="5">
        <Heading size="4" className="font-semibold">
          Latest Issues
        </Heading>
        <Link
          href="/issues"
          className="text-sm text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
        >
          View all →
        </Link>
      </Flex>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {latestIssues.map((issue) => (
          <Link
            key={issue.id}
            href={`/issues/${issue.id}`}
            className="block group"
          >
            <Flex
              justify="between"
              align="center"
              py="4"
              px="3"
              className="rounded-lg -mx-3 hover:bg-violet-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <Flex direction="column" gap="2" className="flex-1 min-w-0 mr-4">
                <Text
                  size="3"
                  weight="medium"
                  className="group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors truncate"
                >
                  {issue.title}
                </Text>
                <Flex align="center" gap="3">
                  <StatusBadge status={issue.status} />
                  <Text size="1" className="text-gray-400">
                    #{issue.id} · {new Date(issue.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </Flex>
              </Flex>

              {issue.assignedToUser ? (
                <Avatar
                  src={issue.assignedToUser.image!}
                  fallback={issue.assignedToUser.name?.charAt(0) || "?"}
                  size="2"
                  radius="full"
                  className="ring-2 ring-white dark:ring-gray-900 shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                  <Text size="1" className="text-gray-400">—</Text>
                </div>
              )}
            </Flex>
          </Link>
        ))}
      </div>

      {latestIssues.length === 0 && (
        <Flex
          justify="center"
          align="center"
          direction="column"
          py="8"
          className="text-gray-400"
        >
          <Text size="2">No issues found</Text>
        </Flex>
      )}
    </Card>
  );
};

export default LatestIssueDetail;
