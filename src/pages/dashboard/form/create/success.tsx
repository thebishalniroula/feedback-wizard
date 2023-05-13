import Link from 'next/link'
import React from 'react'
import { NextPageWithLayout } from '~/pages/_app'

const success: NextPageWithLayout = () => {
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12  bg-slate-800'>
      <div className='max-w-xl px-5 text-center'>
        <h2 className='mb-2 text-[42px] font-bold text-zinc-300'>Success ✔</h2>
        <p className='mb-2 text-lg text-zinc-400'>
          Your form has successfully been created.
          <Link href={'/dashboard/form/create'} className='block font-medium text-indigo-300'>
            Create another form
          </Link>
        </p>
        <Link
          href='/dashboard/form'
          className='mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700'
        >
          Go to forms
        </Link>
      </div>
    </div>
  )
}

success.hasLayout = true
export default success
