import { StatusBadge } from '@/app/components'
import { Card, Flex, Heading,Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetail = ({ detailIssue }: { detailIssue: any }) => {
  // Format date to short format: Dec 17, 2025
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(detailIssue.createdAt)

  return (
    <div>
        {/* Issue Header */}
        <Heading size="8" mb="3">{detailIssue.title}</Heading>
        <Flex gap="3" align="center">
          <StatusBadge status={detailIssue.status} />
          <Text size="2" color="gray">
            Created on {formattedDate}
          </Text>
        </Flex>
        {/* Issue Description */}
        <Card className='p-6 prose mt-6 max-w-full border-1'>
          <Heading size="4" mb="3">Description</Heading>
          <ReactMarkdown className='whitespace-pre-wrap leading-relaxed text-gray-700 w-full'>
            {detailIssue.description}
          </ReactMarkdown>
        </Card>
        <Flex gap="6" wrap="wrap" mt="4">
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
    </div>
  )
}

export default IssueDetail