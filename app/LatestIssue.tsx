import React from 'react'
import prisma from '@/prisma/client'
import LatestIssueClient from './LatestIssueClient'

const LatestIssue = async () => {
  const latestIssue = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: 5,
    select: {
      id: true,
      title: true
    }
  })

  return <LatestIssueClient latestIssues={latestIssue} />
}

export default LatestIssue