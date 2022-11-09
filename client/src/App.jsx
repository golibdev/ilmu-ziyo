import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Course } from './pages/Course'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Service } from './pages/Service'
import { Student } from './pages/Student'
import { User } from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/admin' element={<AppLayout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='/admin/students' element={<Student/>} />
          <Route path='/admin/courses' element={<Course/>} />
          <Route path='/admin/profile' element={<Profile/>} />
          <Route path='/admin/users' element={<User/>} />
          <Route path='/admin/services' element={<Service/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
