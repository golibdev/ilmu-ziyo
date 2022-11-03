import React from 'react'
import { Link } from 'react-router-dom'

export const PageTitle = ({ title }) => {
   return (
      <div className="pagetitle mb-0 mt-3">
         <h1 className='mb-0 pb-0'>{title}</h1>
         <nav className='mb-0 pb-0'>
            <ol className="breadcrumb">
               <li className="breadcrumb-item"><Link to="/admin">Bosh sahifa</Link></li>
               <li className="breadcrumb-item active">{title}</li>
            </ol>
         </nav>
      </div>
   )
}