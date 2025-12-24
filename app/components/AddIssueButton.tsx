import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import { ReactNode } from 'react'

const AddIssueButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button 
      size="2"
      variant="solid"
      className="mb-4 mr-6 cursor-pointer hover:opacity-90 transition-opacity "
    >
      <Link href="/issues/new" className="no-underline">
        {children}
      </Link>
    </Button>
  )
}

export default AddIssueButton
