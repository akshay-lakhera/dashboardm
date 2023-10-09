import { Button } from '@mui/material'
import React from 'react'
import PageContainer from 'src/components/container/PageContainer'
import DashboardCard from 'src/components/shared/DashboardCard'
import StateModal from './StateModal'
let ActionButton=(<Button variant="contained">Add</Button>)

function State() {



  return (
       <PageContainer title="States" description="this is Typography">
          <DashboardCard title="States" action={ActionButton}>
         <StateModal />
          </DashboardCard>
       </PageContainer>

  )
}

export default State