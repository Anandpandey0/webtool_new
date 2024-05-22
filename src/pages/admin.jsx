import BasicButtons from '@/components/BasicButtons'
import Dashboard from '@/components/Dashboard'
import React from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

const admin = () => {

  return (
    <>
<Head><title>Admin</title></Head>
    
   
    <Dashboard/>
    </>
  )
}

export default admin