'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdownref = useRef(null)

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (dropdownref.current && !dropdownref.current.contains(e.target)) {
        // to know that clicking screen event is "not" contained by the ref "dropdownref"
        // not to close the dropdown when when clicked inside the dropdown
        setShowDropdown(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])


  const handleDropdownClick = (e) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  if (session) {
    return (
      <>
        <nav className='fixed z-10 top-0 w-full flex h-12 items-center justify-between px-4 bg-gradient-to-r from-black via-gray-800 to-black text-white'>
          <Link href='/' className="flex items-center gap-2 logo font-bold text-lg">
            <img className='scaleHover w-8 mb-2' src="pngwing.com (7).png" alt="" />
            <span>Get Me A Chai</span>
          </Link>
          <div ref={dropdownref} className='flex gap-1 justify-center items-center'>
            {/* <button className="relative inline-flex items-center justify-center p-0.5 mt-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 me-1 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {session.user.email}
              </span>
            </button> */}

            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" onClick={handleDropdownClick} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 me-1 font-medium rounded-lg text-xs xs:text-md px-3 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 mt-1" type="button">Welcome {session.user.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            <div id="dropdown" className={`${showDropdown ? "" : "hidden"} bg-black absolute z-20 top-12 divide-y  divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                </li>
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                </li>
                <li>
                  <Link href='#' onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>

            <button type="button" onClick={() => signOut()} className="text-white hidden xs:block bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center mb-2 mt-3">Sign out</button>
          </div>
        </nav>

      </>
    )
  }
  return (
    <div>
      <nav className='fixed z-10 top-0 w-full flex h-12 items-center justify-between px-4  bg-gradient-to-r from-black via-gray-800 to-black text-white'>
        <Link href='/' className="flex items-center gap-2 logo font-bold text-lg">
          <img className='scaleHover w-8 mb-2' src="pngwing.com (7).png" alt="" />
          <span>Get Me A Chai</span>
        </Link>
        {/* <ul className='flex justify-between gap-6'>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Sign Up</li>
          <li>Login</li>
        </ul> */}
        <div>
          <Link href='/login'>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 mt-3">Log in</button>
          </Link>
        </div>

      </nav>
    </div>
  )
}

export default Navbar
