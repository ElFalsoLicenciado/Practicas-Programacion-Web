import React from "react";
import AdminCourseForm  from "../components/AdminCourseForm";
import useCursos from "../hooks/useCursos";

import './AdminPage.css'

const AdminPage = () => {
    const {agregarCurso, resetCursos } = useCursos()

    const handleCursoAgregado = (nuevoCurso) => {
        return agregarCurso(nuevoCurso)
    }

    const handleResetCursos = () => {
        resetCursos()
    }
    
    return (
        <div id='admin-page'>
            <h1 className='h1-title'>Sitio de administración</h1>
            <p className='p-text'> Un aplauso para la administración</p>
            <div className='form-container'>
                <div className='form'>
                    <AdminCourseForm
                        onCursoAgregado={handleCursoAgregado}
                        onResetCursos={handleResetCursos}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminPage