import React from 'react'

export const Footer = () => {
   return (
      <div className='bg-dark shadow p-5'>
         <div className="container">
            <div className="row gy-3">
               <div className="col-lg-4 col-md-6 col-12">
                  <h3 className='text-white footer-title mb-3 fw-bold'>Bog'lanish</h3>
                  <ul className='p-0 text-white' style={{ listStyle: 'none' }}>
                     <li><b>Telefon</b>: +998 99 669 00 90</li>
                     <li><b>Faks</b>: +998 99 669 00 90</li>
                     <li><b>Email</b>: perfectbuxgalter@perfectbuxgalter.uz</li>
                  </ul>
               </div>
               <div className="col-lg-4 col-md-6 col-12">
                  <h3 className='text-white fw-bold footer-title'>Manzil</h3>
               </div>
               <div className="col-lg-4 col-md-6 col-12">
                  <h3 className='text-white fw-bold footer-title'>Ijtimoiy tarmoqlar</h3>
                  <ul className='d-flex fs-3 p-0' style={{ listStyle: 'none' }}>
                     <li className='me-3'>
                        <a href="#" className='text-secondary'>
                           <i className='fab fa-youtube'></i>
                        </a>
                     </li>
                     <li className='me-3'>
                        <a href="#" className='text-secondary'>
                           <i className='fab fa-telegram'></i>
                        </a>
                     </li>
                     <li className='me-3'>
                        <a href="#" className='text-secondary'>
                           <i className='fab fa-instagram'></i>
                        </a>
                     </li>
                     <li className='me-3'>
                        <a href="#" className='text-secondary'>
                           <i className='fab fa-twitter'></i>
                        </a>
                     </li>
                     <li className='me-3'>
                        <a href="#" className='text-secondary'>
                           <i className='fab fa-facebook'></i>
                        </a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}
