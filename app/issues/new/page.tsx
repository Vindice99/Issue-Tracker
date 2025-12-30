'use client'
import dynamic from 'next/dynamic'
import IssueFormSkeleton from './loading'
// Dynamically import IssueForm to disable SSR
const IssueForm = dynamic(() => import('../_components/IssueForm'), { ssr: false,
  loading: () => <div><IssueFormSkeleton /></div>,
 })

const NewIssuePage = () => {
  return (
    <IssueForm />
  )
}

export default NewIssuePage
