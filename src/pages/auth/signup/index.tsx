import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => (
  <div className='h-screen w-screen flex justify-center items-center'>
    <SignUp path='/auth/signup' routing='path' signInUrl='/auth/signin' />
  </div>
)

export default SignUpPage
