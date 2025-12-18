import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface IssueDetailPageProps {
    params: {
        id: string
    }
}

const IssueDetailPage = async ({params:{id}} : IssueDetailPageProps) => {
const detailIssue = await prisma.issue.findUnique({
    where: {
        id: parseInt(id)
}})

  if(!detailIssue)
    return notFound()
  
  // Format date to short format: Dec 17, 2025
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(detailIssue.createdAt)

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      {/* Issue Header */}
      <div className='mb-6'>
        <Heading size="8" mb="3">{detailIssue.title}</Heading>
        <Flex gap="3" align="center">
          <StatusBadge status={detailIssue.status} />
          <Text size="2" color="gray">
            Created on {formattedDate}
          </Text>
        </Flex>
      </div>

      {/* Issue Description */}
      <Card className='p-6 prose'>
        <Heading size="4" mb="3">Description</Heading>
        <ReactMarkdown className='whitespace-pre-wrap leading-relaxed text-gray-700'>
          {detailIssue.description}
        </ReactMarkdown>
      </Card>

      {/* Issue Metadata */}
      <Box className='mt-6 p-4 bg-gray-50 rounded-lg'>
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
    </div>
  )
}

export default IssueDetailPage
