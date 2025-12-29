import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'


interface EditIssuePageProps {  
   //use params to get the id from the url
   params: {
    id: string
   }
}
const EditIssuePage = async ({ params : {id} }: EditIssuePageProps) => {

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
