import React from 'react'
import Skeleton from '@/app/components/Skeleton'

const IssueFormSkeleton = () => {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {/* Back link skeleton */}
      <Skeleton height={20} width={140} borderRadius={4} className="mb-4" />

      <div className="rounded-xl border-2 shadow-lg p-0 overflow-hidden">
        {/* Card header skeleton */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3">
            <Skeleton height={40} width={40} borderRadius={8} />
            <div>
              <Skeleton height={28} width={200} borderRadius={6} className="mb-2" />
              <Skeleton height={16} width={220} borderRadius={4} />
            </div>
          </div>
        </div>

        {/* Card content skeleton */}
        <div className="px-6 pb-6 space-y-6">
          {/* Title label + input */}
          <div className="space-y-2">
            <Skeleton height={18} width={40} borderRadius={4} />
            <Skeleton height={40} borderRadius={6} />
          </div>

          {/* Description label + editor */}
          <div className="space-y-2">
            <Skeleton height={18} width={90} borderRadius={4} />
            <Skeleton height={280} borderRadius={8} />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Skeleton height={40} width={144} borderRadius={6} />
            <Skeleton height={40} width={80} borderRadius={6} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueFormSkeleton
