import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

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

  // Format date to short format: Dec 17, 2025
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(detailIssue.createdAt)

  return (
    <Grid columns={{ initial: "1", md: "2", xl: "7" }} gap="5" className='max-w-4xl mx-auto px-4 py-6'>
      {/* Issue Metadata */}
      <Box className='mt-6 p-4 bg-gray-50 rounded-lg'>
        {/* Issue Header */}
        <Heading size="8" mb="3">{detailIssue.title}</Heading>
        <Flex gap="3" align="center">
          <StatusBadge status={detailIssue.status} />
          <Text size="2" color="gray">
            Created on {formattedDate}
          </Text>
        </Flex>
        {/* Issue Description */}
        <Card className='p-6 prose mt-6'>
          <Heading size="4" mb="3">Description</Heading>
          <ReactMarkdown className='whitespace-pre-wrap leading-relaxed text-gray-700'>
            {detailIssue.description}
          </ReactMarkdown>
        </Card>
        <Flex gap="6" wrap="wrap">
          <div>
            <Text size="1" weight="bold" className='text-gray-500 uppercase'>Issue ID</Text>
            <Text size="2" className='block mt-1'>#{detailIssue.id}</Text>
          </div>
          <div>
            <Text size="1" weight="bold" className='text-gray-500 uppercase'>Status</Text>
            <Text size="2" className='block mt-1'>{detailIssue.status.replace('_', ' ')}</Text>
          </div>
          <div>
            <Text size="1" weight="bold" className='text-gray-500 uppercase'>Last Updated</Text>
            <Text size="2" className='block mt-1'>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }).format(detailIssue.updateAt)}
            </Text>
          </div>
        </Flex>
      </Box>
      <Box className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <Button className='w-24' size="2" radius="large">
          <Pencil2Icon />
          <Link href={`/issues/${detailIssue.id}/edit`} className='ml-2'>
            Edit
          </Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
