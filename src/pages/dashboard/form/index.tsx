import React from 'react'
import Card from '~/components/dashboard/FormCard'
import LastCard from '~/components/dashboard/NewFormCard'
import { NextPageWithLayout } from '~/pages/_app'
import { api } from '~/utils/api'
const Index: NextPageWithLayout = () => {
  const { data: forms, isLoading } = api.form.getAllByUser.useQuery()
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <h1 className='p-5 text-2xl font-semibold'>Your forms</h1>
      <div className='flex flex-wrap gap-4 p-5'>
        {forms?.map((form) => (
          <Card key={form.id} id={form.id} title={form.title} image={form.thumbnail} description={form.description} />
        ))}
        <LastCard />
      </div>
    </>
  )
}
Index.hasLayout = true
export default Index
