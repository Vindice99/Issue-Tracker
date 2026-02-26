'use client'
import { StatusBadge } from '@/app/components'
import { Card, Flex, Heading,Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IssueStatus } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface IssueDetailProps {
  detailIssue: {
    id: number;
    title: string;
    description: string;
    status: IssueStatus;
    createdAt: Date;
    updateAt: Date;
    assignedToUserId: string | null;
  };
}

const IssueDetail = ({ detailIssue }: IssueDetailProps) => {
  // Format date to short format: Dec 17, 2025
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(detailIssue.createdAt)

    const router = useRouter();
  return (
    <div>
          {/* Back link */}
      {detailIssue && (
        <button
          onClick={() => router.push(`/issues`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Issue List
        </button>
      )}
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
          <Heading size="4" mb="3" className='dark:text-white'>Description</Heading>
          <div className='whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-white w-full'>
            <ReactMarkdown>
              {detailIssue.description}
            </ReactMarkdown>
          </div>
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