import React from 'react'
import Card from '~/components/dashboard/FormCard'
import LastCard from '~/components/dashboard/NewFormCard'
import Loading from '~/components/ui/Loading'
import { NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'
const Index: NextPageWithLayout = () => {
  const { data: forms, isLoading } = api.form.getAllByUser.useQuery()
  if (isLoading) {
    return (
      <>
        <h1 className='p-5 text-2xl font-semibold border-b border-opacity-20 border-b-white'>Your forms</h1>
        <div className='h-1/2 w-full flex justify-center items-center'>
          <Loading />
        </div>
      </>
    )
  }
  return (
    <>
      <h1 className='p-5 text-2xl font-semibold border-b border-opacity-20 border-b-white'>Your forms</h1>
      <div className='flex flex-wrap gap-4 p-5 mt-10'>
        {forms?.map((form) => (
          <Card
            key={form.id}
            id={form.id}
            title={form.title}
            image={form.thumbnail}
            description={form.description}
            slug={form.slug}
          />
        ))}
        <LastCard />
      </div>
    </>
  )
}
Index.hasLayout = true
export default Index
