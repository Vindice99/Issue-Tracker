import prisma from '@/prisma/client'
import React from 'react'

interface IssueDetailPageProps {
    params: {
        id: string
    }
}

const IssueDetailPage = ( { params }: IssueDetailPageProps) => {
const id = params.id;
const detailIssue = prisma.issue.findUnique({
    where: {
        id: parseInt(id)
}})

  return (
    <div>
      
    </div>
  )
}

export default IssueDetailPage
