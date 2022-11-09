import React, { useState, useEffect } from 'react'
import { summaryApi } from '../api/summaryApi'
import { Loader } from '../components/Loader/Loader'
import { SummaryCard } from '../components/SummaryCard/SummaryCard'

export const Dashboard = () => {
   const [summary, setSummary] = useState({})
   const [loading, setLoading] = useState(false)

   const getSummaryData = async () => {
      try {
         const res = await summaryApi.getSummaryData()
         setSummary(res.data.summary)
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getSummaryData()
   }, [])
   return (
      loading ? (
         <div className='row'>
            <SummaryCard 
               title={"O'quvchilar"}
               data={summary.student.total}
               icon={'fas fa-user-graduate'}
               color={'info'}
            />
            <SummaryCard 
               title={"Yangi o'quvchilar"}
               data={summary.student.new}
               icon={'fas fa-check'}
               color={'warning'}
            />
            <SummaryCard 
               title={"O'qiydiganlar"}
               data={summary.student.resolve}
               icon={'fas fa-check-double'}
               color={'success'}
            />
            <SummaryCard 
               title={"O'qimaydiganlar"}
               data={summary.student.reject}
               icon={'fas fa-ban'}
               color={'danger'}
            />
            <SummaryCard 
               title={"Buyurtmachilar"}
               data={summary.user.total}
               icon={'fas fa-user-cog'}
               color={'primary'}
            />
            <SummaryCard 
               title={"Xizmatlar"}
               data={summary.service.total}
               icon={'fas fa-taxi'}
               color={'secondary'}
            />
            <SummaryCard 
               title={"Kurslar"}
               data={summary.course.total}
               icon={'fas fa-book'}
               color={'primary'}
            />
         </div>
      ) : (
         <Loader/>
      )
   )
}
