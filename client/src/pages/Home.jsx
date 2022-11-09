import React, { useState, useEffect } from 'react'
import { Carousel } from '../components/Carousel/Carousel'
import { Navbar } from '../components/Navbar/Navbar'
import { courseApi } from '../api/courseApi'
import { Loader } from '../components/Loader/Loader'
import { Wrapper } from '../components/Courses/Wrapper'
import { Contact } from '../components/Contact/Contact'
import { Footer } from '../components/Footer/Footer'
import { serviceApi } from '../api/serviceApi'

export const Home = () => {
   const [courses, setCourses] = useState([])
   const [services, setServices] = useState([])
   const [loading, setLoading] = useState(false)

   const getAllCourses = async () => {
      try {
         const resCourse = await courseApi.getAll();
         const resService = await serviceApi.getAll();
         setCourses(resCourse.data.courses);
         setServices(resService.data.services);
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
            <Wrapper data={courses} type={"course"} />
            <Wrapper data={services} type={"service"} />
            <Contact courses={courses} services={services}/>
            <Footer/>
         </>
      ) : (
         <Loader/>
      )
   )
}
