import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSession,  signIn,signOut } from "next-auth/react";
import { useRouter } from 'next/router';


const Links = () => {
 
  const router = useRouter()
  const{data:session} = useSession()
  
  return (
    <div className='flex flex-col'>
    <Link href='/admin'>Admin</Link>
{session ?  <>
        Signed in as {session.user.email} <br />
        {/* <Link href='/admin'>Sign out</Link> */}
        <button onClick={() => router.push('/admin')}>Admin Dashboard</button>
      </>:<> Not signed in <br />
      <Link href='/signin'>Sign in</Link>
</>}
    </div>
  )
}

export default Links