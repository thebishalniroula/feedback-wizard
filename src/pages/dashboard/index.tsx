import React from 'react'
import { NextPageWithLayout } from '../_app'
import Link from 'next/link'
import FormIcon from '~/components/icons/dashboard/form'
import CreateFormIcon from '~/components/icons/dashboard/create-form'

const index: NextPageWithLayout = () => {
  return (
    <div className='flex p-10 gap-6'>
      <Card text='Create form' link='/dashboard/form/create' icon={CreateFormIcon} />
      <Card text='View forms' link='/dashboard/form' icon={FormIcon} />
    </div>
  )
}
index.hasLayout = true
export default index

const Card = ({
  text,
  link,
  icon,
}: {
  text: string
  link: string
  icon: ({ height, width, color }: { height: number; width: number; color?: string | undefined }) => React.JSX.Element
}) => {
  const FormIcon = icon
  return (
    <Link
      href={link}
      className='flex items-center justify-center gap-5 text-center px-10 py-12  bg-slate-400 rounded-lg text-slate-800 font-medium text-xl'
    >
      {<FormIcon height={50} width={50} color='#ffcc' />}
      {text}
    </Link>
  )
}
