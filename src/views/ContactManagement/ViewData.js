import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BackDropLoader from 'src/components/CommonComponents/BackdropLoader'
import ContactTable from 'src/components/CommonComponents/ContactTable'
import NoDataFound from 'src/components/CommonComponents/NoDataFound'
import PageContainer from 'src/components/container/PageContainer'
import DashboardCard from 'src/components/shared/DashboardCard'
import { API_CALL } from 'src/services/APICalls'

function ViewData() {
    const [Messages, setMessages] = useState([])
      const [toggle, setToggle] = useState(false)
      const [showBackDrop, setshowBackDrop] = useState(false)
  const reloadPage=()=>setToggle(!toggle)
    useEffect(() => {
      (async ()=>{
        try {
      setshowBackDrop(true)

        const {data} =await API_CALL.Contact.get({})
        if(data.success){
          setshowBackDrop(false)
          setMessages(data.data)
        }else{
          setshowBackDrop(false)
        }
    } catch (error) {
        console.log(error)
          setshowBackDrop(false)

        toast.error("Error while fetching data")
    }
 })()
    }, [toggle])
    
  return (
     <PageContainer title="Sky Dog Contact Management" description="">

      <DashboardCard title="Messages" >
     {showBackDrop&&   <BackDropLoader/>}
{Messages.length ? <ContactTable  tableData={Messages} reloadPage={reloadPage}/>:<NoDataFound/>}
      </DashboardCard>
     </PageContainer>
  )
}

export default ViewData