import React, {  } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

export const Sidebar = ({ toggle, clickToggle }) => {
   const isMobile = useMediaQuery({ maxWidth: 1199 })
   const location = useLocation().pathname

   const navLinkInfos = [
      {
         title: "O'quvchilar",
         link: '/admin',
         icon: location === '/admin' ? 'fas fa-users text-white': 'fas fa-users',
      },
      {
         title: 'Kurslar',
         link: '/admin/courses',
         icon: location === '/admin/courses' ? 'fas fa-book text-white': 'fas fa-book',
      }
   ]
   return (
      <div className={toggle ? 'toggle-sidebar' : ''}>
         <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

               {navLinkInfos.map(item => (
                  <li className="nav-item" key={item.link}>
                     <Link className={
                        location === item.link ?
                           'nav-link bg-primary' : 'nav-link'
                     } to={item.link} onClick={isMobile && clickToggle}>
                        <i className={`${item.icon} me-2`}></i>
                        <span className={location === item.link ? `card-title text-white pb-0 pt-0 mb-0` : 'card-title pt-0 pb-0 mb-0'}>{item.title}</span>
                     </Link>
                  </li>
               ))}
            </ul>

         </aside>
      </div>
   )
}