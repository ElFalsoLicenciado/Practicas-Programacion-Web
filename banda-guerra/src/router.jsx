import { BrowserRouter, Routes, Route } from 'react-router-dom' //Tomamos partes o fragmentos de la libreria.
import AppLayout from './layouts/AppLayout'
import Home from './views/HomeView'
import Credential from './views/CredentialsView'
import Admin from './views/AdminView'
import AboutUs from './views/AboutUsView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Credential/>}/>
                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}