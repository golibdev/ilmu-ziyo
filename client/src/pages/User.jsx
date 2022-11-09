import React, {useEffect, useState} from 'react'
import { PageTitle } from '../components/PageTitle/PageTitle'
import { userApi } from '../api/userApi'
import { Loader } from '../components/Loader/Loader'
import moment from 'moment'
import { toast } from 'react-toastify'
import { downloadExcel } from "react-export-table-to-excel";
import { UserPagination } from '../components/Pagination/UserPagination'

export const User = () => {
   const [users, setUsers] = useState([])
   const [loading, setLoading] = useState(false)
   const [currentPage, setCurrentPage] = useState(1)
   const [pageCount, setPageCount] = useState(0)

   const getAll = async () => {
      try {
         const res = await userApi.getAll();
         if(res.status === 200 || res.status === 304) {
            const data = await res.data
            setUsers(data?.users.reverse());
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
                  <PageTitle title={"Buyurtmachilar"} />
               </div>
            </div>
            <div className="card">
               <div className="card-body pt-4">
                  {users.length > 0 ? ( 
                     <>
                        <UserList users={users} />
                        <UserPagination
                           currentPage={currentPage}
                           pageCount={pageCount}
                           setCurrentPage={setCurrentPage}
                           setData={setUsers}
                        />
                     </>
                  ) : (
                     <h4 className='text-center mb-0 text-danger fw-bold'>
                        Buyurtmachilar mavjud emas
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

const UserList = ({ users }) => {

   const exportToExcelHandler = async (e) => {
      e.preventDefault()
      const header = ["F.I.SH", "Telefon raqam", "Xizmat", "Ro'yxatdan o'tgan vaqti"];

      const data = await getAllUsers();

      const body = data.map(item => ({
         fullName: item.fullName,
         phoneNumber: `"${item.phoneNumber.toString()}"`,
         course: item.serviceId.title,
         registeredAt: moment(item.createdAt).format('DD.MM.YYYY HH:mm')
      }))

      let date = new Date()
      let day = date.getDay()
      let month = date.getMonth()
      let year = date.getFullYear()

      downloadExcel({
         fileName: `Users_${day}_${month+1}_${year}`,
         sheet: "Users",
         tablePayload: {
            header,
            body
         }
      })
   } 

   const getAllUsers = async () => {
      try {
         const res = await userApi.getAllNoPage();
         return res.data?.users
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
                  <th>Xizmat</th>
                  <th>Ro'yxatdan o'tgan vaqti</th>
               </tr>
               {users.map((student, index) => (
                  <tr key={index}>
                     <th className='text-center'>{index + 1}</th>
                     <td className='text-center'>{student.fullName}</td>
                     <td className='text-center'>{student.phoneNumber}</td>
                     <td className='text-center'>{student.serviceId.title}</td>
                     <td className='text-center'>{moment(student.createdAt).format('DD.MM.YYYY HH:mm')}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}