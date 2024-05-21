import React, { useEffect, useState } from 'react'
import PersistentDrawerLeft from '../assests/MiniDrawer'
import MiniDrawer from '../assests/MiniDrawer'
import { useSession } from 'next-auth/react'
import CustomizedSnackbars from '@/assests/CustomizedSnackbars'

const Dashboard = () => {
  const {data:session} = useSession();
  const [showToast ,setShowToast] = useState(false)
  useEffect(()=>{
    if(session)
      setShowToast(true)
    
  },[session])
  return (

      <>
      {showToast && <CustomizedSnackbars open={showToast}/>}
      <MiniDrawer/>
      
    </>
  )
}

export default Dashboard