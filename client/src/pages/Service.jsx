import React, { useState, useEffect } from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { serviceApi } from '../api/serviceApi'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import { toast } from 'react-toastify'

export const Service = () => {
   const [services, setServices] = useState([])
   const [loading, setLoading] = useState(false);

   const getAllServices = async () => {
      try {
         const res = await serviceApi.getAll()
         setServices(res.data.services.reverse())
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getAllServices();
   }, [])
   return (
      loading ? (
         <>
            <div className="card">
               <div className="card-body pb-0 d-flex align-items-center justify-content-between">
                  <PageTitle title={'Xizmatlar'} />
                  <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create">
                     <i className='fas fa-plus-circle'></i>
                  </button>
               </div>
            </div>
            <CreateService />
            <div className="card">
               <div className="card-body pt-4">
                  {services.length > 0 ? <ServicesList services={services} /> : (
                     <h4 className='text-center mb-0 text-danger fw-bold'>
                        Xizmatlar mavjud emas
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

const ServicesList = ({ services }) => {
   return (
      <div className='table-responsive '>
         <table className='table table-striped table-hover table-bordered'>
            <tbody>
               <tr className='text-center'>
                  <th>#</th>
                  <th>Kurs id</th>
                  <th>Kurs nomi</th>
                  <th>Buyurtmachilar soni</th>
                  <th>Yaratilgan vaqti</th>
                  <th>Tahrirlash</th>
               </tr>
               {services.map((service, index) => (
                  <tr key={index}>
                     <th className='text-center'>{index + 1}</th>
                     <td className='text-center'>{service.id}</td>
                     <td className='text-center'>{service.title}</td>
                     <td className='text-center'>{service.users.length}</td>
                     <td className='text-center'>{moment(service.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                     <td>
                        <div className='text-center'>
                           <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#edit${service._id}`}>
                           <i className='fas fa-edit'></i>
                        </button>
                        </div>
                        <UpdateService id={service._id} service={service} />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

const CreateService = () => {
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
         const res = await serviceApi.create(formData)
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
                  <h5 className="modal-title card-title pb-0 pt-0">Xizmat qo'shish</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                     <div className="col-12">
                        <div className='mb-3'>
                           <label className='card-title m-0 pt-0' htmlFor="image">Xizmat rasmi</label>
                           <input 
                              type="file"
                              className='form-control' 
                              id="image" 
                              onChange={e => setImage(e.target.files[0])} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="title" className='card-title m-0 pt-0 card-title'>Xizmat nomi</label>
                           <input 
                              type="text"
                              className='form-control' 
                              id="title" 
                              placeholder='Xizmat nomi' 
                              value={title} 
                              onChange={e => setTitle(e.target.value)} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="description" className='card-title m-0 pt-0 card-title'>Xizmat haqida</label>
                           <textarea
                              rows={8}
                              type="text"
                              className='form-control' 
                              id="description" 
                              placeholder='Xizmat haqida' 
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

const UpdateService = ({ id, service }) => {
   const [title, setTitle] = useState(service.title)
   const [description, setDescription] = useState(service.description)
   const [image, setImage] = useState(service.image)

   const handleUpdate = async (e) => {
      e.preventDefault()
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      try {
         const res = await serviceApi.update(id, formData)
         toast.success(res.data.message)

         setTimeout(() => {
            window.location.reload()
         }, 1000);
      } catch (err) {
         toast.error(err.response.data.message)
      }
   }

   return (
      <div className="modal fade" id={`edit${id}`}  tabIndex="-1" aria-hidden="true">
         <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title card-title pb-0 pt-0">Xizmatni tahrirlash</h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleUpdate}>
                     <div className="col-12">
                        <div className='mb-3'>
                           <label className='card-title m-0 pt-0' htmlFor="image">Xizmat rasmi</label>
                           <input 
                              type="file"
                              className='form-control' 
                              id="image" 
                              onChange={e => setImage(e.target.files[0])} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="title" className='card-title m-0 pt-0 card-title'>Xizmat nomi</label>
                           <input 
                              type="text"
                              className='form-control' 
                              id="title" 
                              placeholder='xizmat nomi' 
                              value={title} 
                              onChange={e => setTitle(e.target.value)} 
                           />
                        </div>
                        <div className='mb-3'>
                           <label htmlFor="description" className='card-title m-0 pt-0 card-title'>Xizmat haqida</label>
                           <textarea
                              rows={8}
                              type="text"
                              className='form-control' 
                              id="description" 
                              placeholder='Xizmat haqida' 
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