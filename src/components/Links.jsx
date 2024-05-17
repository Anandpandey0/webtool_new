import Link from 'next/link'
import React from 'react'
import { useSession,  signIn,signOut } from "next-auth/react";


const Links = () => {
  const {data:session} = useSession()
  return (
    <div className='flex flex-col'>
    <Link href='/admin'>Admin</Link>
{session ?  <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>:<> Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
</>}
    </div>
  )
}

export default Links