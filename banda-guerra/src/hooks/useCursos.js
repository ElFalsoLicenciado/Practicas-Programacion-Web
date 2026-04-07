import { useState, useEffect } from "react";

const cursosDefault = [
    { 
        id: 0, nombre: 'Caja', 
        desc: 'Aprende las bases del tambor de guerra', 
        precio: 69, 
        img: 'https://i5.walmartimages.com/asr/65870d1a-391f-4551-b366-3a651c2dab65.66b39406ddcc7c5a3c5f88e3d75290d7.png'
    },
    
    {
        id: 1, nombre: 'Corneta',
        desc: 'Aprende los toques reglamentarios',
        precio: 67,
        img: 'https://clavedemi.com/wp-content/uploads/2022/09/real_corneta.webp'
    },
    
    {
        id: 2, nombre: 'Señalamientos',
        desc: 'Dirección y control de la banda',
        precio: 13,
        img: 'https://www.wikihow.com/images/thumb/1/15/Join-a-Marching-Band-Step-9.jpg/v4-728px-Join-a-Marching-Band-Step-9.jpg.webp'
    },
    
    {
        id: 3, nombre: 'Marcha',
        desc: 'Formaciones y disciplina de marcha',
        precio: 5,
        img: 'https://png.pngtree.com/background/20230403/original/pngtree-bandwalas-with-instruments-marching-vector-picture-image_2266850.jpg'
    }
]


const useCursos = () => {
    
    const [cursos, setCursos] = useState([])
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        cargarCursos()
    }, [])
    
    const cargarCursos = () => {
        try {
            const cursosGuardados = localStorage.getItem('cursos')
            if (cursosGuardados) {
                setCursos(JSON.parse(cursosGuardados))
            }
            else{
                setCursos(cursosDefault)
                localStorage.setItem('cursos', JSON.stringify(cursosDefault))
            }
            console.log('Cursos cargados correctamente.')
        } catch (e) {
            console.error('Error al cargar los cursos', e)
            setCursos(cursosDefault)
        } finally {
            setLoading(false)
        }
    }
    
    const agregarCurso = (nuevoCurso) => {
        const existe = cursos.some(s => s.nombre.toLowerCase() === nuevoCurso.nombre.toLowerCase())
        
        if (existe) {
            return false 
        }
        
        const nuevosCursos = [...cursos, nuevoCurso]
        setCursos(nuevosCursos)
        localStorage.setItem('cursos', JSON.stringify(nuevosCursos))
        return true 
    }
    
    const resetCursos = () => {
        setCursos(cursosDefault)
        localStorage.setItem('cursos', JSON.stringify(cursosDefault))
    }
    
    const getCursoById = (id) => {
        return cursos.find(c => c.id === id);
    }

    const getCursoByName = (name) => {
        return cursos.find(c => c.nombre.toLowerCase() === name);
    }
    
    return {
        cursos,
        loading,
        agregarCurso,
        resetCursos,
        getCursoById,
        getCursoByName
    }
}

export default useCursos