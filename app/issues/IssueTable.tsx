
import { ArrowUpIcon, PersonIcon } from "@radix-ui/react-icons"
import { Table } from "@radix-ui/themes"
import { default as Link, default as NextLink } from "next/link"
import { StatusBadge } from "../components"
import { Issue, IssueStatus } from "@prisma/client"
import prisma from "@/prisma/client"


const IssueTable = async ({ 
  issues,
  searchParams 
}: { 
  issues: Issue[];
  searchParams: { 
    status?: IssueStatus; 
    orderBy?: keyof Issue;
    page?: string;
    pageSize?: string;
    q?: string;
  }> 
}) => {

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {label: 'Issue', value: 'title'},
    {label: 'Status', value: 'status', className: 'hidden md:table-cell'},
    {label: 'Created', value: 'createdAt', className: 'hidden md:table-cell'},
  ] 

  const statuses = Object.values(IssueStatus);
  
  // Validate the status and orderBy
  const status = statuses.includes(searchParams.status!) ? searchParams.status : undefined;
  
  const validOrderBy = ['title', 'status', 'createdAt'] as const;
  const orderBy = validOrderBy.includes(searchParams.orderBy as typeof validOrderBy[number]) 
    ? searchParams.orderBy 
    : 'createdAt';

  const users = await prisma.user.findMany();
  const isSearching = Boolean(searchParams.q?.trim());
 
  return (
    <Table.Root variant="surface" className="w-full">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell 
                key={column.value} 
                className={`w-1/4 ${column.className || ''}`}
              >
                {isSearching ? (
                  column.label
                ) : (
                  <NextLink 
                    href={{
                      pathname: "/issues",
                      query: { 
                        ...(status && { status }), 
                        ...(searchParams.page && { page: searchParams.page }),
                        ...(searchParams.pageSize && { pageSize: searchParams.pageSize }),
                        ...(searchParams.q && { q: searchParams.q }),
                        orderBy: column.value 
                      }
                    }}
                    className="flex items-center gap-1 hover:underline"
                  >
                    {column.label}
                    {column.value === orderBy && <ArrowUpIcon className="inline" />}
                  </NextLink>
                )}
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
  )
}

export default IssueTable