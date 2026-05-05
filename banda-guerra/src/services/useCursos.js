import { useState } from "react";

const defaultCursos = [
    { 
        id: 0, nombre: 'Caja', 
        desc: 'Aprende las bases del tambor de guerra',
        learn: ['No se','No se','No se'],
        precio: 69, 
        img: 'https://i5.walmartimages.com/asr/65870d1a-391f-4551-b366-3a651c2dab65.66b39406ddcc7c5a3c5f88e3d75290d7.png'
    },
    {
        id: 1, nombre: 'Corneta',
        desc: 'Aprende los toques reglamentarios',
        learn: ['No se','No se','No se'],
        precio: 67,
        img: 'https://clavedemi.com/wp-content/uploads/2022/09/real_corneta.webp'
    },
    {
        id: 2, nombre: 'Señalamientos',
        desc: 'Dirección y control de la banda',
        learn: ['No se','No se','No se'],
        precio: 13,
        img: 'https://www.wikihow.com/images/thumb/1/15/Join-a-Marching-Band-Step-9.jpg/v4-728px-Join-a-Marching-Band-Step-9.jpg.webp'
    },
    {
        id: 3, nombre: 'Marcha',
        desc: 'Formaciones y disciplina de marcha',
        learn: ['No se','No se','No se'],
        precio: 5,
        img: 'https://png.pngtree.com/background/20230403/original/pngtree-bandwalas-with-instruments-marching-vector-picture-image_2266850.jpg'
    }
];

const useCursos = () => {

    const [cursos, setCursos] = useState(() => {
        try {
            const cursosGuardados = localStorage.getItem('cursos');
            if (cursosGuardados) {
                return JSON.parse(cursosGuardados);
            } else {
                localStorage.setItem('cursos', JSON.stringify(defaultCursos));
                return defaultCursos;
            }
        } catch (e) {
            console.error('Error al cargar los cursos', e);
            return defaultCursos;
        }
    });

    const loading = false;

    const getCursoById = (id) => {
        const curso = cursos.find(c => c.id === id);
        // console.log(curso);
        return curso;
    };

    const getCursoByName = (name) => {
        return cursos.find(c => c.nombre.toLowerCase() === name.toLowerCase());
    };

    const saveCursos = (newCursos) => {
        setCursos(newCursos);
        localStorage.setItem('cursos', JSON.stringify(newCursos));
    };

    return {
        cursos,
        loading,
        getCursoById,
        getCursoByName,
        saveCursos
    };
};

export default useCursos;