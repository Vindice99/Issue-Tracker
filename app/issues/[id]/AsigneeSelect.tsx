'use client'
import { User } from "@prisma/client";
import axios from "axios";
import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from 'react'
import {useQuery} from '@tanstack/react-query'
import Skeleton from '@/app/components/Skeleton'

const AsigneeSelect = () => {

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
		<Select.Root>
			<Select.Trigger placeholder="Select assignee…" />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default AsigneeSelect