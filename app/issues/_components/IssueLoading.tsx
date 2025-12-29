import { Flex, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from '@/app/components/Skeleton'

const IssueFormSkeleton = () => {
  return (
  <div className="max-w-xl">
      <Flex direction="column" gap="5" maxWidth="600px">
        {/* Title field skeleton */}
        <Box maxWidth="500px">
          <Skeleton height={50} borderRadius={8} />
        </Box>

        {/* Description/Editor skeleton */}
        <Box maxWidth="500px">
          <Skeleton height={300} borderRadius={8} />
        </Box>

        {/* Submit button skeleton */}
        <Box maxWidth="200px">
          <Skeleton height={36} borderRadius={6} />
        </Box>
      </Flex>
    </div>
  )
}

export default IssueFormSkeleton
