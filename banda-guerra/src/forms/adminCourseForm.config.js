const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const adminCourseConfig = {
    initialValues: {
        course_name: '',
        course_desc: '',
        course_img: ''
    },
    fields : [
        {
            id: 'admin-course-name',
            name: 'course-name',
            label: 'Nombre del curso',
            type: 'text',
            required: true,
            placeholder: 'Introduzca aquí el nombre',
            hint: 'Mínimo 3 caracteres, máximo 50',
            validate: v => !v ? 'Este campo es obligatorio' : v.length < 3 ? 'Mínimo 3 caracteres' : v.length > 20 ? 'Máximo 50 caracteres' : '',
            autoComplete: 'no'
        },
        {
            id: 'admin-course-desc',
            name: 'course-desc',
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
            id: 'admin-course-img',
            name: 'course-img',
            label: 'Imagen del curso',
            type: 'url',
            required: false,
            placeholder: 'Ej: URL de una imagen',
            hint: 'URL válida de la imgaen (opcional)',
            validate: v => (!urlPattern.test(v) && !v.startsWith('assets/')) ? 'URL no válida' : '',
            autoComplete: 'no'
        }
    ],

    submitText: 'Crear curso',

    onSubmit: (data, {showToast}) => {
        showToast('Curso guardado', 'success')
    }

}