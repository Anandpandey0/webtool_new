import Link from 'next/link'
import React, { useEffect } from 'react'
import { useSession,  signIn,signOut } from "next-auth/react";
import { useRouter } from 'next/router';


const Links = () => {
 
  const router = useRouter()
  const{data:session} = useSession()
  
  return (
  <div className='flex gap-4'>
  <Link href='/'>Home</Link>
  <Link href='/farmer_details'>Farmer Details</Link>
  <Link href='/field_details'>Field Details</Link>
  <Link href='/super_admin'>Super Admin</Link>
  
  
  </div>
  )
}

export default Links