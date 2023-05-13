import { Spacer, Text } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { Box } from '~/components/styles/box'
import { NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'
import Loading from '~/components/ui/Loading'
import { Question, type Form, Submission } from '~/server/db'

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
    <>
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
      <p className='text-center text-slate-200 mb-4'>{form.description}</p>
      <Tabs tabs={tabsData} />
    </>
  )
}
Form.hasLayout = true
export default Form
import { useState } from 'react'

type TabType = {
  label: string
  component: React.JSX.Element
}
type TabsPropsType = TabType[]
export function Tabs({ tabs }: { tabs: TabsPropsType }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div>
      <div className='flex border-b justify-center gap-20 bg-[#242424c3] w-[80%] mx-auto mb-8 rounded-sm'>
        {/* Loop through tab data and render button for each. */}
        {tabs.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 transition-colors duration-300 text-lg ${
                idx === activeTabIndex ? 'border-slate-200' : 'border-transparent hover:border-gray-200'
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {/* Show active tab content. */}
      {tabs.map((tab, idx) => {
        if (idx === activeTabIndex) {
          return tab.component
        }
      })}
    </div>
  )
}

const FormEdit = ({ form }: { form: Form & { questions: Question[] } }) => {
  return (
    <div className='my-4 pb-12'>
      <div>
        <div className='mx-auto flex max-w-[80%] flex-col gap-6'>
          {form?.questions.map((question, index) => (
            <div className='flex flex-col gap-2' key={question.id}>
              <label className='block text-gray-200'> Question {index + 1} </label>
              <input
                type='text'
                className='w-full rounded-lg bg-slate-300 p-2 text-gray-800 placeholder:text-gray-600'
                onChange={(e) => {
                  // setAnswers({ ...answers, [question.id]: e.target.value })
                }}
                defaultValue={question.question}
              />
            </div>
          ))}

          <button
            type='submit'
            className='mt-5 rounded-lg bg-orange-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-orange-400'
            // disabled={isSubmitting}
            // onClick={hanldeSubmit}
          >
            Save
            {/* {isSubmitting ? 'Submitting...' : 'Submit'} */}
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
