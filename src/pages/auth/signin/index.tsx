import { SignIn } from '@clerk/nextjs'

const SignInPage = () => (
  <div className='h-screen 2-screen flex justify-center items-center'>
    <SignIn path='/auth/signin' routing='path' signUpUrl='/auth/signup' />
  </div>
)

export default SignInPage
