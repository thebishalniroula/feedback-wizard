import React from 'react'
import { type User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
type UserWithoutId = Omit<User, 'id'>
type UserWithConfirmPassword = UserWithoutId & { confirmPassword: string }
const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserWithConfirmPassword>()

  const submitHandler = (data: UserWithConfirmPassword) => {
    signIn('credentials', {
      redirect: true,
      email: data.email,
      password: data.password,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <div className='bg-grey-lighter flex min-h-screen flex-col'>
      <div className='container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2'>
        <div className='w-full rounded bg-white px-6 py-8 text-black shadow-md'>
          <h1 className='mb-8 text-center text-3xl'>Log in</h1>
          <form action='submit' onSubmit={handleSubmit(submitHandler)}>
            <input
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='Email'
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />

            <input
              type='password'
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='Password'
              {...register('password', { required: true, minLength: 6, maxLength: 16 })}
            />

            <button
              type='submit'
              className='my-1 w-full rounded bg-green-600 py-3 text-center text-white hover:bg-green-700 focus:outline-none'
            >
              {!false ? 'Log in' : 'Loging in...'}
            </button>
          </form>
          <div className='text-grey-dark mt-4 text-center text-sm'>
            By signing up, you agree to the
            <a className='border-grey-dark text-grey-dark border-b no-underline' href='#'>
              Terms of Service
            </a>{' '}
            and
            <a className='border-grey-dark text-grey-dark border-b no-underline' href='#'>
              Privacy Policy
            </a>
          </div>
        </div>

        <div className='text-grey-dark mt-6'>
          Dont have an account?
          <a className='border-blue text-blue border-b no-underline' href='../login/'>
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}

export default index
