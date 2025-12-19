import React from 'react'
import IssueForm from '../../_components/IssueForm'


interface EditIssuePageProps {  
   //use params to get the id from the url
   params: {
    id: string
   }
}



const EditIssuePage = ({ params }: EditIssuePageProps) => {
  return (
    <IssueForm />
  )
}

export default EditIssuePage
