import { useState, useEffect } from "react";

const defaultUsers = [
    {
        id :  69, role : 'admin', nombre : 'Alberto Montoya',
        username : 'asbestus', correo : 'example@gmail.com', password : 'wevos',
        instrumento : 'ninguno', fechaRegistro : new Date('2025-06-15')
    },

    {
        id : 13, role : 'user', name : 'Yazmin Garcia',
        username : 'iazmin', mail : 'example@gmail.com' , password : 'minions',
        instrument : 'caja', regDate : new Date()
    }
]

const useUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        try {
            const usuariosGuardados = localStorage.getItem('users')
            
            if (usuariosGuardados) {
                setUsers(JSON.parse(usuariosGuardados))
            }

            else {
                setUsers(defaultUsers)
                localStorage.setItem('users', JSON.stringify(defaultUsers))
            }
            console.log('Usuarios cargados correctamente');
        } catch (e) {
            console.error('Error al cargar los usuarios', e);
            setUsers(defaultUsers)
        } finally {
            setLoading(false)
        }
    }

    const addUser = (newUser) => {
        const exists = false;

        if (users.some(u => u.username === newUser.username)) exists = true;
        if (users.some(u => u.mail === newUser)) exists = true;

        if (exists) return true
        
        newUser.id = cursos.length > 0 ? cursos[cursos.length - 1].id + 1 : 1

        const newUsers = [...users, newUser]
        setUsers(newUsers)
        localStorage.setItem('users', JSON.stringify(newUsers))
        return true
    }

    const resetUsers = () => {
        setUsers(defaultUsers)
        localStorage.setItem('users', JSON.stringify(defaultUsers))        
    }

    const login = (credField , passField) => {
        const found = users.find(u => (u.mail === credField || u.username === credField) && u.password === passField)

        if (!found) return false



        return true
    }

    const setSession = (sessionUser) => {
        
    }



    return {
        loading,
        addUser,
        resetUsers
    }
}

export default userUsuarios