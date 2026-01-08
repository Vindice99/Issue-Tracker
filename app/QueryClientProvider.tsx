'use client'
import { QueryClient, QueryClientProvider as ReactProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    // Create a client inside the component to avoid sharing state between requests
    //By creating it inside with useState, each component instance gets a fresh, isolated QueryClient, preventing these issues.
    //1. Data leaking between users 2.Stale cache issues 3.Memory leaks
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ReactProvider client={queryClient} >
            {children}
        </ReactProvider>
    )
}

export default QueryClientProvider