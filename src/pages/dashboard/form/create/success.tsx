import React from 'react'

const success = () => {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white'>
      <div className='max-w-xl px-5 text-center'>
        <h2 className='mb-2 text-[42px] font-bold text-zinc-800'>Success ✔</h2>
        <p className='mb-2 text-lg text-zinc-500'>
          Your form has successfully been created.
          <span className='block font-medium text-indigo-500'>Visit to see your form</span>.
        </p>
        <a
          href='/login'
          className='mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700'
        >
          Open the App →
        </a>
      </div>
    </div>
  )
}

export default success
