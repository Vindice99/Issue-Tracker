import { IssueStatus } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'


interface Prop{
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({open, inProgress, closed}: Prop) => {
const containers: {label: string, value: number, status?: IssueStatus}[] = [
    {label: 'Open Issues', value: open, status: IssueStatus.OPEN},
    {label: 'In Progress', value: inProgress, status: IssueStatus.IN_PROGRESS},
    {label: 'Closed Issues', value: closed, status: IssueStatus.CLOSED}
]
  return (
    <div>
        <Flex gap="4">
            {containers.map(container => (
            <Card key = {container.label}>
                <Flex direction='column' align='center' gap = "1" >
                    <Link className='text-sm font-medium' href={`/issues?status=${container.status || ''}`}>
                        <h3>{container.label}</h3>
                    </Link>
                    <Text size="7" className='font-bold'>{container.value}</Text>
                </Flex>
            </Card>
            ))}
        </Flex>
    </div>
  )
}

export default IssueSummary
