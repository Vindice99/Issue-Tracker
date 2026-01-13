'use client'
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from 'react'
import {useQuery} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Skeleton from '@/app/components/Skeleton'
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {

    const {data:users, error, isLoading} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await axios.get('/api/users').then(res => res.data)
			return response
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 3, // Retry once on failure
	})
	if(isLoading) return <Skeleton/>

	if(error) return null
	// // Fetch users from the API
	// const [users, setUsers] = useState<User[]>([])
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		const response = await axios.get('/api/users')
	// 		setUsers(response.data)
	// 	}
	// 	fetchUser()
	// }, [])
	
	return (
		<>
		<Select.Root 
		defaultValue={issue.assignedToUserId || 'unassigned'}
		onValueChange={ (userId) => 
		{
				 axios.patch('/api/issue/' + issue.id, {
				assignedToUserId: userId === 'unassigned' ? null : userId}).catch(() => {
					toast.error('Failed to update assignee')
					console.error(error)
				})
		}}
		>
			<Select.Trigger placeholder="Select assignee…" />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value="unassigned">Unassigned</Select.Item>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
		</>
	)
}

export default AsigneeSelect