'use client'
import { Box, Heading } from '@radix-ui/themes'
import React from 'react'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'

interface Comment {
  id: number
  text: string
  createdAt: Date
  user: {
    name: string | null
    email: string | null
    image: string | null
  }
}

interface CommentsProps {
  issueId: number
  comments: Comment[]
  isAuthenticated: boolean
}

const Comments = ({ issueId, comments, isAuthenticated }: CommentsProps) => {
  return (
    <Box mt="6">
      <Heading size="5" mb="4">Comments</Heading>
      {isAuthenticated && (
        <Box mb="4">
          <CommentForm issueId={issueId} />
        </Box>
      )}
      <CommentsList comments={comments} />
    </Box>
  )
}

export default Comments
