import { useState } from "react";

const defaultCursos = [
    { 
        id: 0, title: 'Caja', 
        description: 'Aprende las bases del tambor de guerra',
        learnPoints: ['No se','No se','No se'],
        price: 69, 
        image: 'https://i5.walmartimages.com/asr/65870d1a-391f-4551-b366-3a651c2dab65.66b39406ddcc7c5a3c5f88e3d75290d7.png'
    },
    {
        id: 1, title: 'Corneta',
        description: 'Aprende los toques reglamentarios',
        learnPoints: ['No se','No se','No se'],
        price: 67,
        image: 'https://clavedemi.com/wp-content/uploads/2022/09/real_corneta.webp'
    },
    {
        id: 2, title: 'Señalamientos',
        description: 'Dirección y control de la banda',
        learnPoints: ['No se','No se','No se'],
        price: 13,
        image: 'https://www.wikihow.com/images/thumb/1/15/Join-a-Marching-Band-Step-9.jpg/v4-728px-Join-a-Marching-Band-Step-9.jpg.webp'
    },
    {
        id: 3, title: 'Marcha',
        description: 'Formaciones y disciplina de marcha',
        learnPoints: ['No se','No se','No se'],
        price: 5,
        image: 'https://png.pngtree.com/background/20230403/original/pngtree-bandwalas-with-instruments-marching-vector-picture-image_2266850.jpg'
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
        return cursos.find(c => c.title.toLowerCase() === name.toLowerCase());
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