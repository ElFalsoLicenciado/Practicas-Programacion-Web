const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const adminCourseConfig = {
    addCourse: {
        initialValues: {
            course_name: '',
            course_desc: '',
            course_img: ''
        },
        fields : [
            {
                id: 'admin-add-course-name',
                name: 'course_name',
                label: 'Nombre del curso',
                type: 'text',
                required: true,
                placeholder: 'Introduzca aquí el nombre',
                hint: 'Mínimo 3 caracteres, máximo 50',
                validate: v => !v ? 'Este campo es obligatorio' : v.length < 3 ? 'Mínimo 3 caracteres' : v.length > 20 ? 'Máximo 50 caracteres' : '',
                autoComplete: 'no'
            },
            {
                id: 'admin-add-course-desc',
                name: 'course_desc',
                label: 'Descripción del curso',
                type: 'textarea',
                required: true,
                placeholder: 'Introduzca aquí la descripción',
                hint: 'Mínimo 10 caracteres, máximo 200',
                validate: v => !v ? 'Este campo es obligatorio' : v.length < 10 ? 'Mínimo 10 caracteres' : v.length > 200 ? 'Máximo 200 caracteres' : '',
                autoComplete: 'no',
                rows: 4
            },
            {
                id: 'admin-add-course-img',
                name: 'course_img',
                label: 'Imagen del curso',
                type: 'url',
                required: false,
                placeholder: 'Ej: URL de una imagen',
                hint: 'URL válida de la imgaen (opcional)',
                validate: v => (!urlPattern.test(v) && !v.startsWith('assets/')) ? 'URL no válida' : '',
                autoComplete: 'no'
            }
        ],
        
        actions: [{
            type: 'submit',
            label: 'Guardar curso',
            className: ''
        }],
        onSubmit: (data, {showToast}) => {
            showToast('Curso guardado', 'success')
        }
    },
    manageCourse: {
        initialValues: {
            select_course: 'select',
            course_name: '',
            course_desc: '',
            course_img: ''
        },
        fields : [
            {
                id: 'admin-manage-course-select',
                name: 'select_course',
                label: 'Curso a editar',
                type: 'select',
                required: true,
                options: [
                    { value: 'select', label: 'Selecciona un curso'},
                    { value: 'course1', label: 'Curso 1' },
                    { value: 'course2', label: 'Curso 2' },
                    { value: 'course3', label: 'Curso 3' }
                ],
                autoComplete: 'off'
            },
            {
                id: 'admin-manage-course-name',
                name: 'course_name',
                label: 'Nombre del curso',
                type: 'text',
                required: false,
                placeholder: 'Introduzca aquí el nombre',
                hint: 'Mínimo 3 caracteres, máximo 50',
                validate: v => !v ? '' : v.length < 3 ? 'Mínimo 3 caracteres' : v.length > 20 ? 'Máximo 50 caracteres' : '',
                autoComplete: 'no'
            },
            {
                id: 'admin-manage-course-desc',
                name: 'course_desc',
                label: 'Descripción del curso',
                type: 'textarea',
                required: false,
                placeholder: 'Introduzca aquí la descripción',
                hint: 'Mínimo 10 caracteres, máximo 200',
                validate: v => !v ? '' : v.length < 10 ? 'Mínimo 10 caracteres' : v.length > 200 ? 'Máximo 200 caracteres' : '',
                autoComplete: 'no',
                rows: 4
            },
            {
                id: 'admin-manage-course-img',
                name: 'course_img',
                label: 'Imagen del curso',
                type: 'url',
                required: false,
                placeholder: 'Ej: URL de una imagen',
                hint: 'URL válida de la imgaen (opcional)',
                validate: v => !v ? '' : (!urlPattern.test(v)) ? 'URL no válida' : '',
                autoComplete: 'no'
            }
        ],
        
        actions: [
            {
                type: 'submit',
                label: 'Guardar curso',
                className: ''
            },
            {
                type: 'button',
                label: 'Eliminar',
                className: 'bg-[#dc3545]'
            }
        ],
        onSubmit: (data, {showToast}) => {
            showToast('Curso guardado', 'success')
        }
    }
}