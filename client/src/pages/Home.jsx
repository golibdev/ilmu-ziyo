import React, { useState, useEffect } from 'react'
import { Carousel } from '../components/Carousel/Carousel'
import { Navbar } from '../components/Navbar/Navbar'
import { courseApi } from '../api/courseApi'
import { Loader } from '../components/Loader/Loader'
import { Courses } from '../components/Courses/Courses'
import { Contact } from '../components/Contact/Contact'
import { Footer } from '../components/Footer/Footer'

export const Home = () => {
   const [courses, setCourses] = useState([])
   const [loading, setLoading] = useState(false)

   const getAllCourses = async () => {
      try {
         const res = await courseApi.getAll();
         setCourses(res.data.courses);
         setLoading(true)
      } catch (err) {}
   }

   useEffect(() => {
      getAllCourses()
   }, [])
   return (
      loading ? (
         <>
            <Navbar/>
            <Carousel/>
            <Courses courses={courses}/>
            <Contact courses={courses}/>
            <Footer/>
         </>
      ) : (
         <Loader/>
      )
   )
}
