import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import {AddIssueButton, Link} from "@/app/components";


const IssuePage = async () => {
  //fetch issues and display them here (omitted for brevity)
  const issues = await prisma.issue.findMany({
    orderBy: { id: 'asc' }
  });

  return (
    <div>
      <div className="mb-8">
        <AddIssueButton children="Create New Issue" />
        <AddIssueButton children="Sort Order" />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue: typeof issues[number]) =>(
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                    {issue.title}
                </Link>
                <div className="block md:hidden"><StatusBadge status={issue.status} /></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><StatusBadge status={issue.status} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuePage;
