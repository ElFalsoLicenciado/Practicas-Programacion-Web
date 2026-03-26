import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'         //Rute 1
import LoginPage from './pages/CredentialsPage'       //Ruta 2
import AdminPage from './pages/AdminPage'       //Ruta 3
import AboutUsPage from './pages/AboutUsPage'   //Ruta 4
import CoursePage from './pages/CoursePage'     //Ruta 5


function App() {
  return (
    <>
    <div className='app'>
      <Header/>
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/about-us' element={<AboutUsPage/>}/>
          <Route path='/course' element={<CoursePage/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default App
