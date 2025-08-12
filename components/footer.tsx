import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="p-4 max-w-[1200px] w-full">
        <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 flex items-center gap-2">© 2025 - <span className="hidden sm:block">Charles Acosta</span> <span className="sm:hidden">C.A</span> <Link href="https://github.com/charlesacosta163" target="_blank"><FaGithub className="w-4 h-4 text-gray-500" /></Link></p>

            <p className="text-xs text-gray-500">Not affiliated with Infinite Flight</p>
        </div>
    </footer>
  )
}

export default Footer