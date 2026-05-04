import { useState } from "react"
import Form from "../components/FormBuilder"
import { adminCourseConfig, adminUserConfig } from "../forms";

export default function AdminView() {

  const [ isCourse, setIsCourse ] = useState(true);

  return (
      <div>
          <h1 className='h1-title'>Sitio de administración</h1>
          <p className='p-text'> Un aplauso para la administración</p>
          <Form config={isCourse ? adminCourseConfig : adminUserConfig}/>
      </div>
  )
}
