import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import Dropdown from '@/app/components/Dropdown'
import { DropdownMenu } from '@radix-ui/themes'
import Link from 'next/link'

interface IssueDetailPageProps {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({ params: { id } }: IssueDetailPageProps) => {
  const detailIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!detailIssue)
    return notFound()

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5" className='max-w-6xl mx-auto px-4 py-6'>
      <Box className='md:col-span-4'>
        <IssueDetail detailIssue={detailIssue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton id={detailIssue.id} />
          <Dropdown>
            <DropdownMenu.Item>
              <Link href={`/issues/${detailIssue.id}/edit`}>Edit Issue</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Assign to User</DropdownMenu.Item>
            <DropdownMenu.Item>Change Status</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Delete Issue</DropdownMenu.Item>
          </Dropdown>
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
