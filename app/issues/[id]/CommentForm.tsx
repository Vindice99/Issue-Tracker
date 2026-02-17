'use client'
import { Button, Card, TextArea } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface CommentFormProps {
  issueId: number
}

const CommentForm = ({ issueId }: CommentFormProps) => {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!comment.trim()) {
      toast.error('Comment cannot be empty')
      return
    }

    setIsSubmitting(true)
    try {
      await axios.post(`/api/issue/${issueId}/comments`, { text: comment })
      setComment('')
      toast.success('Comment added successfully')
      router.refresh()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to add comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="mb-3"
        />
        <Button type="submit" disabled={isSubmitting || !comment.trim()}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
    </Card>
  )
}

export default CommentForm
