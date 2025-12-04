'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const Navbar = () => {
    const currentPathname = usePathname()
    console.log(currentPathname)

    const links = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Issue", href: "/issues" },
    ]
    return (
        <nav className='flex space-x-6 mb-5 border-b px-5 h-14 items-center'> 
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex hover:cursor-pointer'>
                {links.map(link =>
                (<Link href={link.href} key={link.href}
                    className={classnames({
                        'text-zinc-900' : link.href === currentPathname,
                        'text-zinc-500' : link.href !== currentPathname,
                        'hover:text-zinc-800 px-6 h-14 transition-colors flex items-center hover:bg-gray-300' : true
                    })}>
                    {link.label}
                </Link>))}
            </ul>
        </nav>
    )
}

export default Navbar