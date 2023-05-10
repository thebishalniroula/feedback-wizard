import React from 'react'

const success = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col items-center'>
        <span>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='inline h-12 w-12'>
            <path
              fill-rule='evenodd'
              d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
              clip-rule='evenodd'
            />
          </svg>
        </span>
        <h1 className='text-3xl'>Your response has been submited.</h1>
        <p className='text-xl'>We have successfully received your response.</p>
      </div>
    </div>
  )
}

export default success
