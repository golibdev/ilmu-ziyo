import React from 'react'

export const SummaryCard = ({ title, data, icon, color }) => {
   return (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12">
         <div className="card shadow">
            <div className="card-header">
               <p className={`card-text fw-bold card-title p-0 text-${color}`}>{title}</p>
            </div>
            <div className='card-body pt-3 pb-2 d-flex align-items-center justify-content-between'>
               <h1 className={`p-0 fw-bold text-${color}`} style={{ fontSize: '70px' }}>{data}</h1>
               <h1 className={`p-0 fw-bold text-${color}`} style={{ fontSize: '50px' }}><i className={icon}></i></h1>
            </div>
         </div>
      </div>
   )
}
