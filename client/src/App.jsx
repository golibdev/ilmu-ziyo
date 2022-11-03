import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Course } from './pages/Course'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Student } from './pages/Student'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/admin' element={<AppLayout/>}>
          <Route path='/admin/courses' element={<Course/>} />
          <Route index element={<Student/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
