import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingPage = () => {
    const issues = [1,2,3,4,5,6,7,8,9,10].map(i => ({
        id: i,
        title: 'Loading...',
        status: 'loading',
        createdAt: new Date(),
    })) 
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue =>(
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Skeleton width={200} />
                <div className="block md:hidden"><Skeleton width={100} /></div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton width={100} /></Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton width={100} /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingPage
