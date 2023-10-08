import Image from 'next/image'
import Link from 'next/link'
import CopyIcon from '../icons/dashboard/copy'
type CardProps = {
  id: string
  image: string | null
  title: string
  description: string | null
  slug: string
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string
const Card = ({ id, title, image, description, slug }: CardProps) => {
  const handleUrlCopy = async (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault()
    await window.navigator.clipboard.writeText(`${baseUrl}/form/${slug}`)
    alert('Url copied to clipboard')
  }

  return (
    <Link
      href={`/dashboard/form/edit/${slug}`}
      className='flex flex-col gap-2 bg-[#302c2c] rounded-md h-50 w-50  overflow-hidden cursor-pointer'
    >
      <Image
        height={200}
        width={200}
        src={
          image ||
          'https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }
        alt=''
        style={{
          height: 'auto',
          width: 'auto',
        }}
      />
      <div className='px-3'>
        <p className='truncate'>{title}</p>
        <p
          className='text-slate-300 font-extralight flex items-center gap-2 py-2 cursor-pointer hover:text-slate-50'
          onClick={handleUrlCopy}
        >
          <CopyIcon height={20} width={20} /> Copy sharable url
        </p>
      </div>
    </Link>
  )
}

export default Card
