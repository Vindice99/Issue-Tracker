
import { useQuery } from '@tanstack/react-query';
import { Issue, User } from "@prisma/client";
import axios from "axios";

export const useUsers = () => useQuery<User[]>({
		queryKey: ['users'],
		queryFn: async () => {
			const response = await axios.get('/api/users').then(res => res.data)
			return response
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 3, // Retry once on failure
	})