import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import Skeleton from '../../components/Skeleton'

const Loading = () => {
  return (
    <div className="max-w-xl">
      <Flex direction="column" gap="5" maxWidth="600px">
        {/* Title field skeleton */}
        <Box maxWidth="500px">
          <Skeleton height={40} borderRadius={8} />
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

export default Loading