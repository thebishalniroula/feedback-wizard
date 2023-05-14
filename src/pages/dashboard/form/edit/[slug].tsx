import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Tabs from '~/components/ui/Tabs'
import { NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'
import Loading from '~/components/ui/Loading'
import { Question, type Form, Submission } from '~/server/db'
import Link from 'next/link'

type QuestionsStateType = {
  [questionId: string]: string
}
const convertObjectToArray = (obj: QuestionsStateType | undefined) => {
  if (!obj) {
    return undefined
  }
  const keys = Object.keys(obj)
  return keys.map((key) => ({ questionId: key, question: obj[key] as string }))
}

const Form: NextPageWithLayout = () => {
  const router = useRouter()

  const { slug } = router.query
  if (!slug) return null
  if (Array.isArray(slug)) return null

  const { data: form, isLoading } = api.form.getOneWithSubmissions.useQuery(slug)

  if (isLoading) {
    return (
      <div className='h-1/2 w-full flex justify-center items-center'>
        <Loading />
      </div>
    )
  }
  if (!form) {
    return <p>No such form exists in the database.</p>
  }

  const tabsData = [
    {
      label: 'Edit',
      component: <FormEdit form={form} />,
    },
    {
      label: 'Submissions',
      component: <SubmissionsTable formId={form.id} />,
    },
  ]
  return (
    <div className=''>
      <div className='relative w-full h-52'>
        <Image
          src={
            form.thumbnail ||
            'https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          }
          fill
          className='object-cover'
          alt={form.title}
        />
      </div>

      <h1 className='text-center text-3xl mt-4 mb-3'>{form.title}</h1>
      <p className='text-center text-slate-200 mb-6'>{form.description}</p>
      <div className='flex flex-col justify-center items-center mb-5'>
        {window !== undefined && (
          <Link className='text-slate-400 underline' href={`${window.location.origin}/form/${form.slug}`}>
            {`${window.location.origin}/form/${form.slug}`}
          </Link>
        )}
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.origin}/form/${form.slug}`)
            window && window.alert('Link copied to clipboard.')
          }}
          className='flex gap-3 my-5 py-2 px-4 bg-blue-800 text-slate-200 font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
            />
          </svg>
          Copy
        </button>
      </div>
      <Tabs tabs={tabsData} />
    </div>
  )
}
Form.hasLayout = true
export default Form

const FormEdit = ({ form }: { form: Form & { questions: Question[] } }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestions({ ...questions, [e.target.getAttribute('data-questionId') as string]: e.target.value })
  }
  const [questions, setQuestions] = useState<QuestionsStateType>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [thumbnail, setThumbnail] = useState<string>()
  const context = api.useContext()
  const { mutate, isLoading: isUpdating } = api.form.update.useMutation({
    onSuccess: () => {
      context.form.invalidate()
    },
  })
  const handleSubmit = () => {
    mutate({ formId: form.id, title, description, questions: convertObjectToArray(questions), thumbnail })
  }

  return (
    <div className='my-4 pb-12'>
      <div>
        <div className='mx-auto flex max-w-[80%] flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='block text-gray-200'>Title </label>
            <input
              type='text'
              name='title'
              className='w-full rounded-lg bg-slate-300 p-2 text-gray-800 placeholder:text-gray-600'
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={form.title}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <label className='block text-gray-200'> Description </label>
            <input
              type='text'
              name='description'
              className='w-full rounded-lg bg-slate-300 p-2 text-gray-800 placeholder:text-gray-600'
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={form.description ?? ''}
            />
          </div>
          {form?.questions.map((question, index) => (
            <div className='flex flex-col gap-2' key={question.id}>
              <label className='block text-gray-200'> Question {index + 1} </label>
              <input
                type='text'
                data-questionId={question.id}
                className='w-full rounded-lg bg-slate-300 p-2 text-gray-800 placeholder:text-gray-600'
                onChange={handleChange}
                defaultValue={question.question}
              />
            </div>
          ))}

          <button
            type='submit'
            className='mt-5 rounded-lg bg-orange-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-orange-400'
            onClick={handleSubmit}
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  )
}

const SubmissionsTable = ({ formId }: { formId: string }) => {
  const { data: submissions, isLoading } = api.submission.getByFormId.useQuery({ formId })
  if (isLoading) {
    return (
      <div className='h-1/2 w-full flex justify-center items-center'>
        <Loading />
      </div>
    )
  }
  if (!submissions || submissions.length == 0) {
    return (
      <div className='h-1/2 w-full flex justify-center items-center'>
        <p>No submissions available.</p>
      </div>
    )
  }
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:mx-0.5 lg:mx-0.5'>
        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full'>
              <thead className='bg-gray-200 border-b'>
                <tr>
                  <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                    #
                  </th>
                  {submissions[0]?.answers.map((answer) => {
                    return (
                      <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                        {answer.question.question}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, index) => {
                  return (
                    <tr className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{index + 1}</td>
                      {submission.answers.map((answer) => (
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                          {answer.answer}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
