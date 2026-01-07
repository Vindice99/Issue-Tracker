'use client'
import { User } from "@prisma/client";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import { SelectItem } from '@radix-ui/react-select'
import axios from "axios";
import { Select } from "radix-ui";
import React, { useEffect, useState } from 'react'

const AsigneeSelect = () => {

	const [users, setUsers] = useState<User[]>([])
	// Fetch users from the API
	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get('/api/users')
			setUsers(response.data)
		}
		fetchUser()
	}, [])
	return (
		<Select.Root>
			<Select.Trigger
				className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
				aria-label="Food"
			>
				<Select.Value placeholder="Select a fruit…" />
				<Select.Icon className="text-violet11">
					<ChevronDownIcon />
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
					<Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
						<ChevronUpIcon />
					</Select.ScrollUpButton>
					<Select.Viewport className="p-[5px]">
						<Select.Group>
							<Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
								Suggestion...
							</Select.Label>
							{users.map((user) => (
								<SelectItem key={user.id} value={user.id.toString()}>
									{user.name}
							</SelectItem>
							))}
						</Select.Group>
					</Select.Viewport>
					<Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
						<ChevronUpIcon />
					</Select.ScrollDownButton>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	)
}

export default AsigneeSelect