'use client'
import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'

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

interface CommentsListProps {
  comments: Comment[]
}

const CommentsList = ({ comments }: CommentsListProps) => {
  if (comments.length === 0) {
    return (
      <Text size="2" color="gray">
        No comments yet. Be the first to comment!
      </Text>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }).format(new Date(comment.createdAt))

        return (
          <Card key={comment.id} className="p-4">
            <Flex gap="3">
              <Avatar
                src={comment.user.image || undefined}
                fallback={comment.user.name?.charAt(0) || comment.user.email?.charAt(0) || '?'}
                size="2"
                radius="full"
              />
              <Box style={{ flex: 1 }}>
                <Flex justify="between" align="center" mb="2">
                  <Text weight="bold" size="2">
                    {comment.user.name || comment.user.email}
                  </Text>
                  <Text size="1" color="gray">
                    {formattedDate}
                  </Text>
                </Flex>
                <Text size="2" className="whitespace-pre-wrap">
                  {comment.text}
                </Text>
              </Box>
            </Flex>
          </Card>
        )
      })}
    </div>
  )
}

export default CommentsList
