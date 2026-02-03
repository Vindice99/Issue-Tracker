import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { StatusBadge } from "../components";

const LatestIssueDetail = async () => {
  const latestIssue = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      //eager load the user data
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {latestIssue.map((issue) => (
            <Table.Row key={issue.id}>
              <Flex justify="between">
                <Flex direction="column" gap="2" align="start">
                  <Link href={`/issues/${issue.id}`}>
                    <Table.Cell>{issue.title}</Table.Cell>
                  </Link>
                  <StatusBadge status={issue.status} />
                </Flex>
                ``
                {issue.assignedToUserId && (
                  <Avatar src={issue.assignedToUser!.image!} fallback="?" />
                )}
              </Flex>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssueDetail;
