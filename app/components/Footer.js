import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='relative bottom-0'>
      <footer className='flex h-12 items-center justify-center px-4 bg-black text-white'>
       <p className='text-center text-xs'>Copyright &copy; {currentYear} Get Me A Chai - All rights reserved</p>
      </footer>
    </div>
  )
}

export default Footer
