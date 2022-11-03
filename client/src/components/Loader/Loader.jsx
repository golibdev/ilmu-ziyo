import React from 'react'
import { useLocation } from 'react-router-dom'

export const Loader = () => {
   const path = useLocation().pathname
   return (
      <div id={path !== '/' ? `loader-container` : 'v-100'} className='d-flex align-items-center justify-content-center'>
         <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
         </div>
      </div>
   )
}