import Image from 'next/image'
import Link from 'next/link'

type CardProps = {
  id: string
  image: string | null
  title: string
  description: string | null
  slug: string
}

const Card = ({ id, title, image, description, slug }: CardProps) => {
  return (
    <Link
      href={`/dashboard/form/edit/${slug}`}
      className='flex flex-col gap-2 bg-[#302c2c] rounded-md w-48 h-44 overflow-hidden cursor-pointer'
    >
      <Image
        height={200}
        width={200}
        src={
          image ||
          'https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }
        alt=''
      />
      <div className='px-3 pb-3'>
        <p className=' truncate'>{title}</p>
      </div>
    </Link>
  )
}

export default Card
