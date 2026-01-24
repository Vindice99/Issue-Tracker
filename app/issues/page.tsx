import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/client";
import { Container, Table } from "@radix-ui/themes";
import {AddIssueButton, Link} from "@/app/components";
import { PersonIcon } from "@radix-ui/react-icons";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import { Issue, IssueStatus } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  {label: 'Issue', value: 'title'},
  {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
  {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
]

const IssuePage = async ({ 
  searchParams 
}: { 
  searchParams: Promise<{ 
    status?: IssueStatus; 
    orderBy?: keyof Issue;
  }> 
}) => {

  const params = await searchParams;
  const statuses = Object.values(IssueStatus);
  
  // Validate the status
  const status = statuses.includes(params.status!) ? params.status : undefined;
  
  // Validate orderBy - only allow specific columns
  const validOrderBy = ['title', 'status', 'createdAt'] as const;
  const orderBy = validOrderBy.includes(params.orderBy as any) 
    ? params.orderBy 
    : 'createdAt';
  
  // Fetch issues with dynamic sorting
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: { [orderBy!]: 'asc' }
  });

  const users = await prisma.user.findMany();

  return (
    <Container className="p-6 max-w-full">
      <span className="flex justify-between gap-1.5">
        <AddIssueButton />
        <IssueStatusFilter />
      </span>
      <Table.Root variant="surface" className="w-full">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell 
                key={column.value} 
                className={`w-1/4 ${column.className || ''}`}
              >
                <NextLink 
                  href={{
                    query: { 
                      ...(status && { status }), 
                      orderBy: column.value 
                    }
                  }}
                  className="flex items-center gap-1 hover:underline"
                >
                  {column.label}
                  {column.value === orderBy && <ArrowUpIcon className="inline" />}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
            <Table.ColumnHeaderCell className="hidden md:table-cell w-1/4">
              Assignee
            </Table.ColumnHeaderCell>
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
              <Table.Cell className="hidden md:table-cell">
                <span className="flex items-center gap-2">
                <PersonIcon />{users?.find(user => user.id === issue.assignedToUserId)?.name}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Container>
  );
};
export const dynamic = 'force-dynamic';

export default IssuePage;
