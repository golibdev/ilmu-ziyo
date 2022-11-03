import React, {useEffect, useState} from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { studentApi } from '../api/studentApi'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import { toast } from 'react-toastify'
import { StudentPagination } from '../components/Pagination/StudentPagination'
import { downloadExcel } from "react-export-table-to-excel";

export const Student = () => {
   const [students, setStudents] = useState([])
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [pageCount, setPageCount] = useState(0)

   const getAll = async () => {
      try {
         const res = await studentApi.getAll();
         if(res.status === 200 || res.status === 304) {
            const data = await res.data
            setStudents(data?.students.reverse());
            setPageCount(Math.ceil(data?.pagination.total / 10));
            setLoading(true);
         }
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      getAll()
   }, [])
   return (
      loading ? (
         <>
            <div className="card">
               <div className="card-body pb-0 d-flex align-items-center justify-content-between">
                  <PageTitle title={"O'quvchilar"} />
               </div>
            </div>
            <div className="card">
               <div className="card-body pt-4">
                  {students.length > 0 ? ( 
                     <>
                        <StudentList students={students} />
                        <StudentPagination
                           data={students}
                           currentPage={currentPage}
                           pageCount={pageCount}
                           setCurrentPage={setCurrentPage}
                           setData={setStudents}
                        />
                     </>
                  ) : (
                     <h4 className='text-center mb-0 text-danger fw-bold'>
                        O'quvchilar mavjud emas
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

const StudentList = ({ students }) => {
   const [selected, setSelected] = useState({});

   const getStudent = async (id) => {
      try {
         const res = await studentApi.getOne(id);
         setSelected(res.data.student);
      } catch (err) {}
   }


   const exportToExcelHandler = async (e) => {
      e.preventDefault()
      const header = ["F.I.SH", "Telefon raqam", "Kurs", "Holati", "Ro'yxatdan o'tgan vaqti"];

      const data = await getAllStudents()

      const body = data.map(item => ({
         fullName: item.fullName,
         phoneNumber: `"${item.phoneNumber.toString()}"`,
         course: item.courseId.title,
         status: item.status == 1 ? 'Yangi' : item.status == 2 ? "O'qiydi" : "O'qimaydi",
         registeredAt: moment(item.createdAt).format('DD.MM.YYYY HH:mm')
      }))

      let date = new Date()
      let day = date.getDay()
      let month = date.getMonth()
      let year = date.getFullYear()

      downloadExcel({
         fileName: `Students_${day}_${month+1}_${year}`,
         sheet: "Students",
         tablePayload: {
            header,
            body
         }
      })
   } 

   const getAllStudents = async () => {
      try {
         const res = await studentApi.getAllNoPage()
         return res.data?.students
      } catch (err) {}
   }
   
   return (
      <div className='table-responsive'>
         <button className='btn btn-primary mb-3' onClick={exportToExcelHandler}>
            <span className='me-2'>Export to Excel</span>
            <i className='fas fa-file-excel'></i>
         </button>
         <table className='table table-striped table-hover table-bordered'>
            <tbody>
               <tr className='text-center'>
                  <th>#</th>
                  <th>F.I.SH</th>
                  <th>Telefon</th>
                  <th>Kurs</th>
                  
                  <th>Ro'yxatdan o'tgan vaqti</th>
                  <th>Holat</th>
                  <th>Tahrirlash</th>
               </tr>
               {students.map((student, index) => (
                  <tr key={index}>
                     <th className='text-center'>{index + 1}</th>
                     <td className='text-center'>{student.fullName}</td>
                     <td className='text-center'>{student.phoneNumber}</td>
                     <td className='text-center'>{student.courseId.title}</td>
                     <td className='text-center'>{moment(student.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                     <td className='text-center'>
                        {student.status === 1 && <button className='btn btn-warning'>
                           <i className='fas fa-check'></i>
                           </button>}
                        {student.status === 2 && <button className='btn btn-success'>
                           <i className='fas fa-check-double'></i></button>}
                        {student.status === 3 && <button className='btn btn-danger'>
                           <i className='fas fa-ban'></i></button>}
                     </td>
                    
                     <td>
                        <div className='text-center'>
                           <button 
                              className='btn btn-warning text-white' 
                              data-bs-toggle="modal" 
                              data-bs-target={`#edit${student.id}`}
                              onClick={() => {
                                 getStudent(student.id);
                              }}
                           >
                           <i className='fas fa-edit'></i>
                        </button>
                        <UpdateStudentStatus
                           id={student.id}
                           student={selected}
                        />
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

const UpdateStudentStatus = ({id}) => {
   const [status, setStatus] = useState('')
   const handleChangeStatus = async (e) => {
      e.preventDefault()
      const check = {
         status: status.trim().length === 0
      }

      if(check.status) {
         return toast.warning("Status tanlanmagan!")
      }

      const params = {
         status: +status
      }
      try {
         console.log(status);
         const res = await studentApi.update(id, params);
         toast.success(res.data.message);

         setTimeout(() => {
            window.location.reload()
         }, 1000)
      } catch (err) {
         console.log(err);
         toast.error(err.response.data.message)
      }
   } 

   return (
      <div className="modal fade" id={`edit${id}`}  tabIndex="-1" aria-hidden="true">
         <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title card-title pb-0 pt-0">
                     O'quvchi statusini o'zgartirish
                  </h5>
                  <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
               </div>
               <div className="modal-body">
                  <form onSubmit={handleChangeStatus}>
                     <div className="col-12 mb-3">
                        <label htmlFor="status" className='text-start d-block card-title m-0 pt-0'>Holatni tanlang</label>
                        <select value={status} onChange={e => setStatus(e.target.value)} id="status" className='form-control'>
                           <option value="">Tanlang</option>
                           <option value="2">O'qiydi</option>
                           <option value="3">O'qimaydi</option>
                        </select>
                     </div>
                     <div className='col-12 text-start'>
                        <button className='btn btn-success'>
                           <i className='fas fa-save'></i>
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