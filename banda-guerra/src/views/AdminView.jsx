import { useState } from "react"
import Form from "../components/FormBuilder"
import { adminCourseConfig, adminUserConfig } from "../forms";

export default function AdminView() {

  const [ isCourse, setIsCourse ] = useState(true);
  const [ isAddCourse, setIsAddCourse ] = useState(true);
  const [ isAddUser, setIsAddUser ] = useState(true);

  const currentKey = isCourse
  ? (isAddCourse ? 'addCourse' : 'manageCourse')
  : (isAddUser ? 'addUser' : 'manageUser');

const currentConfig = isCourse
  ? (!isAddCourse ? adminCourseConfig.addCourse : adminCourseConfig.manageCourse)
  : (!isAddUser ? adminUserConfig.addUser : adminUserConfig.manageUser);

  return (
      <div className=''>
          <h1 className='h1-title'>Sitio de administración</h1>
          <p className='p-text'> Un aplauso para la administración</p>
          <div className='flex flex-row'>
            <div className='form-switch-container form-normal-switch-container'>
                <button type="button" className={`form-switch form-normal-switch ${isCourse ? 'form-switch-active' : ''}`} onClick={() => setIsCourse(true)}>Gestión de cursos</button>
                <button type="button" className={`form-switch form-normal-switch ${!isCourse ? 'form-switch-active' : ''}`} onClick={() => setIsCourse(false)}>Gestión de usuarios</button>
            </div>
          </div>
          <Form key={currentKey} config={currentConfig}>
            {
                isCourse && (
                    <div className='flex flex-row'>
                        <div className='form-switch-container form-small-switch-container'>
                            <button type="button" onClick={() => setIsAddCourse(true)} className={`form-switch form-small-switch ${isAddCourse ? 'form-switch-active' : ''}`}>Editar un curso</button>
                            <button type="button" onClick={() => setIsAddCourse(false)} className={`form-switch form-small-switch ${!isAddCourse ? 'form-switch-active' : ''}`} >Añadir un curso</button>
                        </div>
                    </div>
                )
            }
            
            {
                !isCourse && (
                <div className='flex flex-row'>
                    <div className='form-switch-container form-small-switch-container'>
                        <button type="button" onClick={() => setIsAddUser(true)} className={`form-switch form-small-switch ${isAddUser ? 'form-switch-active' : ''}`}>Editar un usuario</button>
                        <button type="button" onClick={() => setIsAddUser(false)} className={`form-switch form-small-switch ${!isAddUser ? 'form-switch-active' : ''}`} >Añadir un usuario</button>
                    </div>
                </div>
                )
            }
          </Form>
      </div>
  )
}
