import React from 'react'
import { serverUrl } from '../../constants'

export const Card = ({ item, type }) => {
   return (
      <div className="col-lg-4">
         <div className="card shadow m-2">
            {type == 'course' ? (
               <img src={item.image} className="card-img-top img-fluid mb-3" style={{ height: '230px' }} alt="course image"/>
            ): (
               <img src={`${serverUrl}${item.image}`} className="card-img-top img-fluid mb-3" style={{ height: '230px' }} alt="course image"/>
            )}
            <div className="card-body pb-0">
               <div className="d-flex justify-content-between">
                  <p className="badge bg-success bg-opacity-10 text-success mb-0">{item.title}</p>
               </div>
               <h5 className="card-title fw-normal mb-0">{item.title}</h5>
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
