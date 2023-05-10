import Link from 'next/link'
import React from 'react'

const Card = () => {
  return (
    <div className='w-48 h-80 bg-slate-500 flex flex-col items-center justify-center rounded-md'>
      <Link href='/dashboard/form/create'>
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
      </Link>
      <p>New form</p>
    </div>
  )
}

export default Card
