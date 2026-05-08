const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const adminCourseConfig = ({ 
    cursos, addCurso, updateCurso, deleteCurso, getCursoById, refreshCursos
}) => ({
    addCourse: {
        initialValues: {
            title: '',
            description: '',
            learnPoints: [''],
            image: '',
            price: ''
        },
        fields : [
            {
                id: 'admin-add-course-name',
                name: 'title',
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
                name: 'description',
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
                id: 'admin-add-course-learn',
                name: 'learnPoints',
                label: '¿Qué aprenderá el alumno?',
                type: 'dynamic-list',
                required: true,
                hint: 'Agrega los puntos de aprendizaje',
                validate: v => v.length === 1 && v[0].length === 0  ? 'Agrega al menos un punto' : ''
            },
            {
                id: 'admin-add-course-img',
                name: 'image',
                label: 'Imagen del curso',
                type: 'url',
                required: false,
                placeholder: 'Ej: URL de una imagen',
                hint: 'URL válida de la imgaen (opcional)',
                validate: v => !v ? '' : 
                (!urlPattern.test(v) && !v.startsWith('assets/'))  ? 'URL no válida' : '',
                autoComplete: 'no'
            },
            {
                id: 'admin-add-course-price',
                name: 'price',
                label: 'Precio del curso',
                type: 'number',
                required: true,
                placeholder: 'Ej: 99',
                hint: 'Debe ser un número mayor a 0',
                validate: v => {
                    if (!v) return 'Este campo es obligatorio'
                    if (isNaN(v)) return 'Debe ser un número'
                    if (Number(v) <= 0) return 'Debe ser mayor a 0'
                    return ''
                },
                autoComplete: 'off',
                min: 0,
                step: 1
            }
        ],
        
        actions: [{
            type: 'submit',
            label: 'Guardar curso',
            className: ''
        }],
        onSubmit: async (data, { showToast, resetForm }) => {
            
            try {
                
                await addCurso(data);
                
                showToast('Curso guardado', 'success');
                
                resetForm();
                
                await refreshCursos();
                
            } catch (err) {
                
                console.error(err);
                
                showToast('Error al guardar curso', 'error');
            }
        }
    },
    manageCourse: {
        initialValues: {
            select_course: 'select',
            title: '',
            description: '',
            learnPoints: [''],
            image: '',
            price: ''
        },
        fields : [
            {
                id: 'admin-manage-course-select',
                name: 'select_course',
                label: 'Curso a editar',
                type: 'select',
                required: true,
                options: [
                    { value: 'select', label: 'Selecciona un curso' },
                    
                    ...cursos.map(course => ({
                        value: course.id,
                        label: course.title
                    }))
                ],
                validate: v =>
                    v == 'select' ? 'Elige un curso' : '',
                autoComplete: 'off',
                onChange: async (value, ctx) => {
                    
                    if (value === 'select') {
                        
                        ctx.resetForm();
                        
                        return;
                    }
                    
                    try {
                        
                        const course = await getCursoById(value);
                        
                        ctx.setValues(prev => ({
                            ...prev,
                            
                            select_course: value,
                            title: course.title,
                            description: course.description,
                            learnPoints: course.learnPoints?.length
                            ? course.learnPoints
                            : [''],
                            image: course.image,
                            price: course.price
                        }));
                        
                    } catch (err) {
                        
                        console.error(err);
                        
                        ctx.showToast('Error al cargar curso', 'error');
                    }
                }
            },
            {
                id: 'admin-manage-course-name',
                name: 'title',
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
                name: 'description',
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
                id: 'admin-manage-course-learn',
                name: 'learnPoints',
                label: '¿Qué aprenderá el alumno?',
                type: 'dynamic-list',
                required: false,
                hint: 'Agrega los puntos de aprendizaje',
                validate: v => v.length === 0 ? 'Agrega al menos un punto' : ''
            },
            {
                id: 'admin-manage-course-img',
                name: 'image',
                label: 'Imagen del curso',
                type: 'url',
                required: false,
                placeholder: 'Ej: URL de una imagen',
                hint: 'URL válida de la imgaen (opcional)',
                validate: v => !v ? '' : 
                (!urlPattern.test(v) && !v.startsWith('assets/'))  ? 'URL no válida' : '',
                autoComplete: 'no'
            },
            {
                id: 'admin-manage-course-price',
                name: 'price',
                label: 'Precio del curso',
                type: 'number',
                required: false,
                placeholder: 'Ej: 99',
                hint: 'Debe ser un número mayor a 0',
                validate: v => {
                    if (!v) return ''
                    if (isNaN(v)) return 'Debe ser un número'
                    if (Number(v) <= 0) return 'Debe ser mayor a 0'
                    return ''
                },
                autoComplete: 'off',
                min: 0,
                step: 1
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
                className: 'bg-[#dc3545]',
                onClick: async (data, ctx) => {
                    
                    try {
                        
                        await deleteCurso(data.select_course);
                        
                        await refreshCursos();
                        
                        ctx.showToast('Curso eliminado', 'warning');
                        
                        ctx.setValues({
                            select_course: 'select',
                            title: '',
                            description: '',
                            learnPoints: [''],
                            image: '',
                            price: ''
                        });
                        
                    } catch (err) {
                        
                        console.error(err);
                        
                        ctx.showToast('Error al eliminar curso', 'error');
                    }
                }                
            }
        ],
        onSubmit: async (data, { showToast }) => {
            
            try {
                
                await updateCurso(data.select_course, data);
                
                await refreshCursos();
                
                showToast('Curso actualizado', 'success');
                
            } catch (err) {
                
                console.error(err);
                
                showToast('Error al actualizar curso', 'error');
            }
        }
    }
});