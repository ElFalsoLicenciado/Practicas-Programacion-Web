import { BrowserRouter, Routes, Route } from 'react-router-dom' //Tomamos partes o fragmentos de la libreria.
import AppLayout from './layouts/AppLayout'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}