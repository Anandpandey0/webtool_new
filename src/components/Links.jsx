import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSession,  signIn,signOut } from "next-auth/react";
import { useRouter } from 'next/router';


const Links = () => {
  const {data:session} = useSession()
  const router = useRouter()
  
  return (
    <div className='flex flex-col'>
    <Link href='/admin'>Admin</Link>
{session ?  <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => router.push('/admin')}>Admin Dashboard</button>
      </>:<> Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
</>}
    </div>
  )
}

export default Links