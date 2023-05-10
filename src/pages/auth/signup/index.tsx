import React, { useState } from 'react'
import { type User } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { api } from '~/utils/api'
import { useRouter } from 'next/router'
type UserWithoutId = Omit<User, 'id'>
type UserWithConfirmPassword = UserWithoutId & { confirmPassword: string }
const index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserWithConfirmPassword>()

  const router = useRouter()
  const { mutate, isLoading } = api.user.create.useMutation({ onSuccess: () => router.replace('/auth/login') })
  const submitHandler = (data: UserWithConfirmPassword) => {
    mutate(data)
  }

  return (
    <div className='bg-grey-lighter flex min-h-screen flex-col'>
      <div className='container mx-auto flex max-w-sm flex-1 flex-col items-center justify-center px-2'>
        <div className='w-full rounded bg-white px-6 py-8 text-black shadow-md'>
          <h1 className='mb-8 text-center text-3xl'>Sign up</h1>
          <form action='submit' onSubmit={handleSubmit(submitHandler)}>
            <input
              type='text'
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='Full Name'
              {...register('name', { required: true })}
            />
            <input
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='username'
              {...register('username', {
                required: true,
              })}
            />
            <input
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='Email'
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
            {errors.email && <p className='text-red-600 text-sm -mt-4 mb-1'>Please enter a valid email</p>}
            <input
              type='password'
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='Password'
              {...register('password', { required: true, minLength: 6, maxLength: 16 })}
            />
            {errors.password && (
              <p className='text-red-600 text-sm -mt-4 mb-1'>
                Password is required and shoould be between 6 and 16 characters.
              </p>
            )}

            <input
              type='password'
              className='border-grey-light mb-4 block w-full rounded border p-3'
              placeholder='Confirm Password'
              {...register('confirmPassword', { required: true, minLength: 6, maxLength: 16 })}
            />
            {getValues().password !== getValues().confirmPassword && (
              <p className='text-red-600 text-sm -mt-4 mb-1'>Password do not match.</p>
            )}

            <button
              type='submit'
              className='my-1 w-full rounded bg-green-600 py-3 text-center text-white hover:bg-green-700 focus:outline-none'
            >
              {!isLoading ? 'Create Account' : 'Creating...'}
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
          Already have an account?
          <a className='border-blue text-blue border-b no-underline' href='../login/'>
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  )
}

export default index
