import Link from 'next/link'
import React from 'react'

const Card = () => {
  return (
    <Link
      href='/dashboard/form/create'
      className='w-48 bg-gray-600 text-slate-300 flex flex-col items-center justify-center rounded-md'
    >
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-20 h-20'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        <p>New form</p>
      </div>
    </Link>
  )
}

export default Card
