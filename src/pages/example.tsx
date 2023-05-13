import { UserButton } from '@clerk/nextjs'

export default function Example() {
  return (
    <>
      <header>
        <UserButton />
      </header>
      <SignInPage />
      <div>Your page's content can go here.</div>
    </>
  )
}
import { SignIn } from '@clerk/clerk-react'

// Render the sign in component in your
// custom sign in page.
function SignInPage() {
  return <SignIn />
}
