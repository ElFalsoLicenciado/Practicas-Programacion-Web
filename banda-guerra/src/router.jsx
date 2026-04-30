import { BrowserRouter, Routes, Route } from 'react-router-dom' //Tomamos partes o fragmentos de la libreria.
import AppLayout from './layouts/AppLayout'
import Home from './views/HomeView'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' />
                    <Route path='/admin' />
                    <Route path='/about-us'/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}