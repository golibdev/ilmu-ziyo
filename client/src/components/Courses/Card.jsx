import React from 'react'

export const Card = ({ course }) => {
   return (
      <div className="col-lg-4">
         <div className="card shadow m-2">
            <img src={course.image} className="card-img-top img-fluid mb-3" style={{ height: '230px' }} alt="course image"/>
            <div className="card-body pb-0">
               <div className="d-flex justify-content-between">
                  <p className="badge bg-success bg-opacity-10 text-success mb-0">{course.title}</p>
               </div>
               <h5 className="card-title fw-normal mb-0">{course.title}</h5>
            </div>
            <div className="card-footer pt-0 pb-3">
               <hr/>
               <a href="#contact" className='btn btn-primary'>
                  Ariza qoldirish
               </a>
            </div>
         </div>
      </div>
   )
}
