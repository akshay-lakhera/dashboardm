import React from 'react'
import CsvFileReader from 'src/components/CommonComponents/Csvfile'
import PageContainer from 'src/components/container/PageContainer'
import DashboardCard from 'src/components/shared/DashboardCard'

function CSVUplopad() {
  return (
    <PageContainer title="Sky Dog Gallery Management" description="">

      <DashboardCard title="Upload CSV">

      <CsvFileReader/>
      </DashboardCard>
    </PageContainer>
       
    
  )
}

export default CSVUplopad