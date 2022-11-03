import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Course } from './pages/Course'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Student } from './pages/Student'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/admin' element={<AppLayout/>}>
          <Route index element={<Student/>} />
          <Route path='/admin/courses' element={<Course/>} />
          <Route path='/admin/profile' element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
