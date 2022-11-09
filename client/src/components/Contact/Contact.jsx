import React from 'react'
import Select from 'react-select'
import { ToastContainer } from 'react-toastify'
import { CoursesTab } from './CoursesTab'
import { ServiceTab } from './ServiceTab'

export const Contact = ({ courses, services }) => {

   return (
      <div className='container mt-5 mb-5' id='contact'>
         <h1 className='text-dark text-uppercase fw-bold text-center fs-1 mb-3'>
            Ariza qoldirish
         </h1>
         <hr />
         <form className='row'>
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
               <div className="card shadow mt-3">
                  <div className="card-header">
                     <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                           <button className="nav-link active card-title px-3 py-2" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Xizmatlar</button>
                        </li>
                        <li className="nav-item" role="presentation">
                           <button className="nav-link  card-title px-3 py-2" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Kurslar</button>
                        </li>
                     </ul>
                  </div>
                  <div className="card-body pt-3 tab-content" id="pills-tabContent">
                     <ServiceTab services={services}/>
                     <CoursesTab courses={courses}/>
                  </div>
               </div>
            </div>
         </form>
         <ToastContainer/>
      </div>
   )
}
