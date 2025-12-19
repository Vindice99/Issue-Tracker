import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetail from './IssueDetail'

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
        <EditIssueButton id={detailIssue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
