import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic  from 'next/dynamic'
// Dynamically import IssueForm to disable SSR
const IssueForm = dynamic(() => import('../../_components/IssueForm'),)

interface EditIssuePageProps {  
   //use params to get the id from the url
   params: Promise<{
    id: string
   }>
}
const EditIssuePage = async ({ params }: EditIssuePageProps) => {
  const { id } = await params;

  const IssueNeedToEdit = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if(!IssueNeedToEdit) { notFound() }

  return (
    <IssueForm issue={IssueNeedToEdit} />
  )
}

export default EditIssuePage
