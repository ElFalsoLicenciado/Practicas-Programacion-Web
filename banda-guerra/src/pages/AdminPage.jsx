import React from "react";
import AdminCourseForm  from "../components/AdminCourseForm";
import './AdminPage.css'

const AdminPage = () => {
    
    return (
        <div id='admin-page'>
            <h2 className='admin-page-h2'>Sitio de administración</h2>
            <p className='admin-page-p'> Un aplauso para la administración</p>
            <div id='admin-form'>
                <AdminCourseForm>
                    
                </AdminCourseForm>
            </div>
        </div>
    )
}

export default AdminPage