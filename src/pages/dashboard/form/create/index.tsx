import React from 'react'
import { useState } from 'react'
import { api } from '~/utils/api'

const create = () => {
  return (
    <div className='flex justify-center'>
      <MultiStepForm />
    </div>
  )
}

export default create

const MultiStepForm = () => {
  const [questions, setQuestions] = useState<string[]>([''])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }
  const { mutate, isLoading } = api.form.create.useMutation()
  const handleSubmit = () => {
    mutate({ title, description, questions })
  }
  return (
    <div className='flex items-center justify-center h-screen w-[30rem]'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full lg:max-w-xl text-gray-900'>
        <h2 className='text-lg font-medium mb-4 text-teal-900'>Step {step} of 2</h2>
        <div className='flex mb-4'>
          <div
            className={`w-1/2 border-r border-gray-400  ${
              step === 1 ? 'bg-blue-500 text-gray-900' : 'bg-gray-200'
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(1)}
          >
            Step 1
          </div>
          <button
            disabled={title === ''}
            className={`w-1/2 ${
              step === 2 ? 'bg-blue-500 text-gray-900' : 'bg-gray-200'
            } p-2 text-center cursor-pointer`}
            onClick={() => title !== '' && setStep(2)}
          >
            Step 2
          </button>
        </div>
        {step === 1 ? (
          <Step1 title={title} setTitle={setTitle} desc={description} setDesc={setDescription} />
        ) : (
          <Step2 questions={questions} setQuestions={setQuestions} submitHandler={handleSubmit} isLoading={isLoading} />
        )}
        <div className='flex justify-between mt-6'>
          {step > 1 && (
            <button className='bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400' onClick={handleBack}>
              Back
            </button>
          )}
          {step < 2 && (
            <button
              disabled={title === ''}
              className='bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600'
              onClick={(e) => title !== '' && handleNext()}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const Step1 = ({
  title,
  setTitle,
  desc,
  setDesc,
}: {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  desc: string
  setDesc: React.Dispatch<React.SetStateAction<string>>
}) => (
  <div>
    <h3 className='text-lg font-medium mb-4 text-slate-800'>Enter title and description of your form.</h3>
    <div className='mb-4'>
      <label className='block font-medium mb-2 text-gray-700' htmlFor='name'>
        Title
      </label>
      <input
        type='text'
        id='name'
        name='name'
        className='w-full border border-gray-400 p-2'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className='mb-4'>
      <label className='block font-medium mb-2 text-gray-700' htmlFor='description'>
        Description
      </label>
      <input
        type='email'
        id='description'
        name='email'
        className='w-full border border-gray-400 p-2'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
    </div>
  </div>
)

const Step2 = ({
  questions,
  setQuestions,
  submitHandler,
  isLoading,
}: {
  questions: string[]
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>
  submitHandler: () => void
  isLoading: boolean
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestions((prev) => {
      prev[parseInt(e.target.getAttribute('data-q-number') as unknown as string)] += e.target.value

      return prev
    })
  }

  return (
    <div>
      <h3 className='text-lg font-medium mb-4 text-slate-800'>Step 2</h3>
      {questions.map((q, i) => (
        <div className='mb-4' key={i}>
          <label className='block font-medium mb-2 text-gray-700' htmlFor='password'>
            Question {i + 1}
          </label>
          <input
            data-q-number={i}
            type='text'
            id='password'
            name='password'
            className='w-full border border-gray-400 p-2'
            onChange={handleChange}
          />
        </div>
      ))}
      <div className='flex flex-col justify-start items-start gap-4'>
        <button onClick={() => setQuestions((prev) => [...prev, ''])} className='bg-slate-200 p-2 flex self-end'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
            <path
              fillRule='evenodd'
              d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
              clipRule='evenodd'
            />
          </svg>
          Add
        </button>
        <button className='bg-blue-500 p-3 flex' onClick={submitHandler}>
          {isLoading ? 'Submiting...' : 'submit'}
        </button>
      </div>
    </div>
  )
}
