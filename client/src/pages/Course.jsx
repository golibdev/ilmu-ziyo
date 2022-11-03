import React, { useState, useEffect } from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { courseApi } from '../api/courseApi'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import { toast } from 'react-toastify'

export const Course = () => {
   const [courses, setCourses] = useState([])
   const [loading, setLoading] = useState(false);

   const getAllCourses = async () => {
      try {
         const res = await courseApi.getAll()
         setCourses(res.data.courses.reverse())
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getAllCourses();
   }, [])
   return (
      loading ? (
         <>
            <div className="card">
               <div className="card-body pb-0 d-flex align-items-center justify-content-between">
                  <PageTitle title={'Kurslar'} />
                  <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create">
                     <i className='fas fa-plus-circle'></i>
                  </button>
               </div>
            </div>
            <CreateCourse getAllCourses={getAllCourses} />
            <div className="card">
               <div className="card-body pt-4">
                  {courses.length > 0 ? <CourseList courses={courses} /> : (
                     <h4 className='text-center mb-0 text-danger fw-bold'>
                        Kurslar mavjud emas
                     </h4>
                  )}
               </div>
            </div>
         </>
      ) : (
         <Loader/>
      )
   )
}

const CourseList = ({ courses }) => {
   return (
      <div className='table-responsive '>
         <table className='table table-striped table-hover table-bordered'>
            <tbody>
               <tr className='text-center'>
                  <th>#</th>
                  <th>Kurs id</th>
                  <th>Kurs nomi</th>
                  <th>O'quvchilar soni</th>
                  <th>Yaratilgan vaqti</th>
                  <th>Tahrirlash</th>
               </tr>
               {courses.map((course, index) => (
                  <tr key={index}>
                     <th className='text-center'>{index + 1}</th>
                     <td className='text-center'>{course.id}</td>
                     <td className='text-center'>{course.title}</td>
                     <td className='text-center'>{course.students.length}</td>
                     <td className='text-center'>{moment(course.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                     <td>
                        <div className='text-center'>
                           <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#edit${course._id}`}>
                           <i className='fas fa-edit'></i>
                        </button>
                        </div>
                        <UpdateCourse id={course._id} course={course} />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

const CreateCourse = () => {
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [image, setImage] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()
      
      const check = {
         title: title.trim().length === 0,
         description: description.length === 0
      }

      if (check.title || check.description) {
         toast.error('Barcha maydolarni to\'ldiring!')
         return
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', image)

      try {
         const res = await courseApi.create(formData)
         toast.success(res.data.message)
         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         console.log(err);
      }
   }
   return (
      <div className="modal fade" id="create"  tabIndex="-1" aria-hidden="true">
         <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title card-title pb-0 pt-0">Kurs qo'shish</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                     <div className="col-12">
                        <div className='mb-3'>
                           <label className='card-title m-0 pt-0' htmlFor="image">Kurs rasmi</label>
                           <input 
                              type="file"
                              className='form-control' 
                              id="image" 
                              onChange={e => setImage(e.target.files[0])} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="title" className='card-title m-0 pt-0 card-title'>Kurs nomi</label>
                           <input 
                              type="text"
                              className='form-control' 
                              id="title" 
                              placeholder='Kurs nomi' 
                              value={title} 
                              onChange={e => setTitle(e.target.value)} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="description" className='card-title m-0 pt-0 card-title'>Kurs haqida</label>
                           <textarea
                              rows={8}
                              type="text"
                              className='form-control' 
                              id="description" 
                              placeholder='Kurs haqida' 
                              value={description} 
                              onChange={e => setDescription(e.target.value)} 
                           />
                        </div>
                     </div>
                     <div className='col-12'>
                        <button className='btn btn-primary'>
                           <i className='fas fa-plus'></i>
                        </button>
                     </div>
                  </form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
   )
}

const UpdateCourse = ({ id, course }) => {
   const [title, setTitle] = useState(course.title)
   const [description, setDescription] = useState(course.description)
   const [image, setImage] = useState(course.image)

   const handleUpdate = async (e) => {
      e.preventDefault()
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      try {
         const res = await courseApi.update(id, formData)
         toast.success(res.data.message)

         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         console.log(err);
         toast.error(err.response.data.message)
      }
   }

   return (
      <div className="modal fade" id={`edit${id}`}  tabIndex="-1" aria-hidden="true">
         <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title card-title pb-0 pt-0">Kursni tahrirlash</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleUpdate}>
                     <div className="col-12">
                        <div className='mb-3'>
                           <label className='card-title m-0 pt-0' htmlFor="image">Kurs rasmi</label>
                           <input 
                              type="file"
                              className='form-control' 
                              id="image" 
                              onChange={e => setImage(e.target.files[0])} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="title" className='card-title m-0 pt-0 card-title'>Kurs nomi</label>
                           <input 
                              type="text"
                              className='form-control' 
                              id="title" 
                              placeholder='Kurs nomi' 
                              value={title} 
                              onChange={e => setTitle(e.target.value)} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="description" className='card-title m-0 pt-0 card-title'>Kurs haqida</label>
                           <textarea
                              rows={8}
                              type="text"
                              className='form-control' 
                              id="description" 
                              placeholder='Kurs haqida' 
                              value={description} 
                              onChange={e => setDescription(e.target.value)} 
                           />
                        </div>
                     </div>
                     <div className='col-12'>
                        <button className='btn btn-primary'>
                           <i className='fas fa-plus'></i>
                        </button>
                     </div>
                  </form>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>
   )
} 