import React, {useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import { userApi } from '../../api/userApi'

export const UserPagination = ({ setData, pageCount, setCurrentPage, currentPage }) => {

   const handlePageClick = (event) => {
      setCurrentPage(event.selected + 1)
   }
   
   useEffect(() => { 
      const getUsers = async (currentPage) => {
         try {
            const res = await userApi.getPaging(currentPage)
            setData(res.data.users)
         } catch (err) {}
      }
      getUsers(currentPage)
   }, [currentPage])
   return (
      <nav className="courses-pagination mt-50">
         <ReactPaginate 
            breakLabel="..."
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            nextLabel={<i className="fa fa-angle-right font-weight-bold"></i>}
            previousLabel={<i className="fa fa-angle-left font-weight-bold"></i>}
            pageCount={pageCount}
            containerClassName="pagination"
            pageClassName="page-item"
            activeClassName="active"
            activeLinkClassName='active'
            disabledClassName="disabled"
            breakClassName="page-item"
            nextClassName='page-item'
            previousClassName='page-item'
            pageLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextLinkClassName='page-link'
         />
      </nav>
   )
}