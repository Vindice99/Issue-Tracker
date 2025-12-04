import React from 'react'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'

const Navbar = () => {
  return (
    <nav className='flex space-x-4 p-4 bg-gray-200 border-b mb-5 px-6 h-16 items-center'>
        <Link href="/"><AiFillBug size={24}/> </Link>
        <ul className='flex space-x-6'>
        <li><Link href="/dashboard">DashBoard</Link></li>
        <li><Link href="/issue">Issue</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar