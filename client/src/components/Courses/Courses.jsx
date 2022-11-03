import React from 'react'
import { Card } from './Card'

export const Courses = ({ courses }) => {
   return (
      <div className='container mt-5 mb-5' id='courses'>
         <h1 className='text-dark fw-bold text-uppercase text-center fs-1 mb-3'>O'quv Kurslari</h1>
         <hr />
         <div className="row">
            {courses.map((course, index) => (
               <Card course={course} key={index}/>
            ))}
         </div>
      </div>
   )
}
