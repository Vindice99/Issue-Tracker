import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'
import Dropdown from '@/app/components/Dropdown'
import { DropdownMenu } from '@radix-ui/themes'
import Link from 'next/link'
import DeleteButton from '../_components/DeleteButton'
import { auth } from '@/auth'
import AsigneeSelect from './AsigneeSelect'

interface IssueDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const { id } = await params
  const session = await auth()
  const detailIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!detailIssue)
    return notFound()

  const isAuthenticated = !!session

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5" className='max-w-6xl mx-auto px-4 py-6'>
      <Box className='md:col-span-4'>
        <IssueDetail detailIssue={detailIssue} />
      </Box>
      {isAuthenticated && (
        <Box className='mt-14'> 
          <Flex direction="column" gap="4" >
            <EditIssueButton id={detailIssue.id} />
            <DeleteButton id={detailIssue.id} />
            <Dropdown>
              <DropdownMenu.Item>
                <Link href={`/issues/${detailIssue.id}/edit`}>Assign to User</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Change Severity</DropdownMenu.Item>
              <DropdownMenu.Item>Change Status</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item color="red">Delete Issue</DropdownMenu.Item>
            </Dropdown>
             <AsigneeSelect />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetailPage
