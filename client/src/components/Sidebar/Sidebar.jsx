import React, {  } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { navLinkInfos } from '../../constants/navLinkInfo'

export const Sidebar = ({ toggle, clickToggle }) => {
   const isMobile = useMediaQuery({ maxWidth: 1199 })
   const location = useLocation().pathname
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
                        <i className={`${item.icon} ${location === item.link ? 'text-white' : ''} me-2`}></i>
                        <span className={location === item.link ? `card-title text-white pb-0 pt-0 mb-0` : 'card-title pt-0 pb-0 mb-0'}>{item.title}</span>
                     </Link>
                  </li>
               ))}
            </ul>

         </aside>
      </div>
   )
}