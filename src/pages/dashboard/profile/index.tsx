import { RedirectToSignIn, SignedIn, SignedOut, UserProfile } from '@clerk/nextjs'
import { NextPageWithLayout } from '~/pages/_app'

const Profile: NextPageWithLayout = () => {
  return (
    <div className='flex h-fit justify-center items-center'>
      <SignedIn>
        {/* Signed in users will see their user profile */}
        <UserProfile />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  )
}

Profile.hasLayout = true
export default Profile
