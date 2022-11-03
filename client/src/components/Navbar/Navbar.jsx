import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
         <div className="container">
            <Link className="navbar-brand" to={"/"}>
               <img src="/assets/image/logo.svg" alt="logo" style={{ width: 100 }} />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                     <Link className="nav-link active fw-bold" aria-current="page" to="/">Bosh sahifa</Link>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link active fw-bold" aria-current="page" href="#courses">O'quv kurslari</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link active fw-bold" aria-current="page" href="#contact">Ariza qoldirish</a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}
