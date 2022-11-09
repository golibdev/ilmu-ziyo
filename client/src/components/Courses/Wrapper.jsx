import React from 'react'
import { Card } from './Card'

export const Wrapper = ({ data, type }) => {
   return (
      <div className='container mt-5 mb-5' id='courses'>
         <h1 className='text-dark fw-bold text-uppercase text-center fs-1 mb-3'>
            {type == 'course' ? "O'quv Kurslari" : "Xizmatlar"}
         </h1>
         <hr />
         <div className="row">
            {data.map((item, index) => (
               <Card item={item} key={index} type={type} />
            ))}
         </div>
      </div>
   )  
}
