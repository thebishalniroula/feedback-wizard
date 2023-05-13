import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { api } from '~/utils/api'
type Answers = {
  [questionId: string]: string
}
const convertObjectToArray = (obj: Answers) => {
  const keys = Object.keys(obj)
  return keys.map((key) => ({ questionId: key, answer: obj[key] as string }))
}
const Form: NextPage = () => {
  const router = useRouter()
  const { data: form, isLoading } = api.form.getById.useQuery(router.query.id as string)
  const { mutate, isLoading: isSubmitting } = api.submission.create.useMutation({
    onSuccess: () => {
      router.replace('/form/success')
    },
  })
  const [answers, setAnswers] = useState<Answers>()

  const hanldeSubmit = () => {
    if (!form || !answers) return
    mutate({ formId: form.id, answers: convertObjectToArray(answers) })
  }

  return (
    <div className='max-w-screen min-h-screen bg-slate-900 pb-12'>
      <div>
        <img
          className='h-80 w-full object-cover'
          src={
            form?.thumbnail
              ? form?.thumbnail
              : `https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`
          }
          alt=''
        />
        <h1 className='my-5 text-center text-3xl font-semibold text-gray-200'>{form?.title}</h1>
        <p className='mx-auto mb-7 max-w-[80%] text-xl text-gray-300'>{form?.description}</p>
        <div className='mx-auto flex max-w-[80%] flex-col gap-6'>
          {form?.questions.map((question) => (
            <div className='flex flex-col gap-2' key={question.id}>
              <label className='block text-gray-200'> {question.question} </label>
              <input
                type='text'
                className='w-full rounded-lg bg-slate-300 p-2 text-gray-800 placeholder:text-gray-600'
                placeholder='Answer'
                onChange={(e) => {
                  setAnswers({ ...answers, [question.id]: e.target.value })
                }}
              />
            </div>
          ))}

          <button
            type='submit'
            className='mt-5 rounded-lg bg-orange-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-orange-400'
            disabled={isSubmitting}
            onClick={hanldeSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form
