'use client'
import { useUsers } from '@/app/components/GetUser';
import Skeleton from '@/app/components/Skeleton';
import { Issue } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast from 'react-hot-toast';

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
 
    const {data:users, error, isLoading} = useUsers()
	if(isLoading) return <Skeleton/>

	if(error) return null

	const assignIssue = (userId: string) => 
		{
				 axios.patch('/api/issue/' + issue.id, {
				assignedToUserId: userId === 'unassigned' ? null : userId}).catch(() => {
					toast.error('Failed to update assignee')
					console.error(error)
				})
		}
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
		onValueChange={assignIssue }
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