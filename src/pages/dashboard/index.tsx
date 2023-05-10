import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import Card from '~/components/dashboard/card'
import LastCard from '~/components/dashboard/LastCard'
import { api } from '~/utils/api'
// import Card from '~/components/Card'
const index = () => {
  const { data: forms, isLoading } = api.form.getAllByUser.useQuery()
  if (isLoading) {
    return 'Loading...'
  }
  return (
    <div className='flex flex-wrap gap-4 min-h-screen p-5'>
      <LastCard />
      {forms?.map((form) => (
        <Card key={form.id} title={form.title} image={form.thumbnail} description={form.description} />
      ))}
    </div>
  )
}

export default index
type CardProps = {
  image: string | null
  title: string
  description: string | null
}

const Card = ({ title, image, description }: CardProps) => {
  return (
    <div className='flex flex-col gap-2 bg-slate-500 rounded-md w-48 h-80 justify-between'>
      <Image
        height={200}
        width={200}
        src={
          image ||
          'https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }
        alt=''
      />
      <div className='p-2 flex-grow flex flex-col justify-between'>
        <p className='text-xl'>{title}</p>
        <p className='text-slate-300 leading-5 text-ellipsis'>
          {description || 'This form does not have a description'}{' '}
        </p>
        <div className='flex justify-between'>
          <Link href={''} className='p-2 bg-slate-400'>
            Preview
          </Link>
          <Link href={''} className='p-2 bg-blue-400'>
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
