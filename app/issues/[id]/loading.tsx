import { Box, Card, Flex, Heading, Skeleton } from '@radix-ui/themes'
import React from 'react'


const loading = () => {
  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      {/* Issue Header Skeleton */}
      <div className='mb-6'>
        <Skeleton>
          <Heading size="8" mb="3">Loading issue title placeholder</Heading>
        </Skeleton>
        <Flex gap="3" align="center" mt="3">
          <Skeleton>
            <Box className='px-3 py-1'>Status Badge</Box>
          </Skeleton>
          <Skeleton>
            <Box className='text-sm'>Created on Date</Box>
          </Skeleton>
        </Flex>
      </div>

      {/* Issue Description Skeleton */}
      <Card className='p-6'>
        <Skeleton mb="3">
          <Heading size="4">Description</Heading>
        </Skeleton>
        <Box className='space-y-2'>
          <Skeleton>
            <Box className='h-4'>Line of text placeholder</Box>
          </Skeleton>
          <Skeleton>
            <Box className='h-4'>Line of text placeholder</Box>
          </Skeleton>
          <Skeleton>
            <Box className='h-4 w-3/4'>Line of text</Box>
          </Skeleton>
        </Box>
      </Card>

      {/* Issue Metadata Skeleton */}
      <Box className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <Flex gap="6" wrap="wrap">
          <div>
            <Skeleton mb="1">
              <Box className='h-3 w-16'>ISSUE ID</Box>
            </Skeleton>
            <Skeleton>
              <Box className='h-4 w-8'>#123</Box>
            </Skeleton>
          </div>
          <div>
            <Skeleton mb="1">
              <Box className='h-3 w-16'>STATUS</Box>
            </Skeleton>
            <Skeleton>
              <Box className='h-4 w-20'>Status</Box>
            </Skeleton>
          </div>
          <div>
            <Skeleton mb="1">
              <Box className='h-3 w-24'>LAST UPDATED</Box>
            </Skeleton>
            <Skeleton>
              <Box className='h-4 w-28'>Dec 18, 2025</Box>
            </Skeleton>
          </div>
        </Flex>
      </Box>
    </div>
  )
}

export default loading