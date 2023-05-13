import Image from 'next/image'

type CardProps = {
  id: string
  image: string | null
  title: string
  description: string | null
}

const Card = ({ id, title, image, description }: CardProps) => {
  return (
    <div className='flex flex-col gap-2 bg-gray-600 rounded-md w-48 overflow-hidden cursor-pointer'>
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
    </div>
  )
}

export default Card
