import { useState, useEffect } from "react";

const defaultUsers = [
    {
        id :  69, role : 'admin', name : 'Alberto Montoya',
        username : 'asbestus', mail : 'example@gmail.com', password : 'wevos',
        instrument : 'ninguno', regDate : new Date('2025-06-15')
    },
    {
        id : 70, role : 'teacher', name : 'Yazmin Garcia',
        username : 'iazmin', mail : 'yazmin@gmail.com' , password : 'minions',
        instrument : 'ninguno', regDate : new Date()
    },
    {
        id : 13, role : 'teacher', name : 'Ruben Lara',
        username : 'ruben', mail : 'ruben@gmail.com',  password : 'desweb',
        instrument : 'ninguno', regDate : new Date()
    },
    {
        id : 67, role : 'user', name : 'Candido Ortega',
        username : 'iowosyse', mail : 'cande@gmail.com', password : 'chamba',
        instrument : 'corneta', regDate : new Date('2025-08-11') 
    }
]

const useUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        loadUsers()
    }, [])
    
    const loadUsers = () => {
        try {
            const usuariosGuardados = localStorage.getItem('users')
            
            if (usuariosGuardados) {
                const parsedUsers = JSON.parse(usuariosGuardados)
                setUsers(parsedUsers)
            } else {
                setUsers(defaultUsers)
                localStorage.setItem('users', JSON.stringify(defaultUsers))
            }
        } catch (e) {
            console.error('Error al cargar los usuarios', e);
            setUsers(defaultUsers)
        } finally {
            setLoading(false)
        }
    }
    
    const addUser = (newUser) => {
        let exists = false;
        
        if (users.some(u => u.username === newUser.username)) exists = true;
        if (users.some(u => u.mail === newUser.mail)) exists = true;
        
        if (exists) return false
        
        let userId = users.length > 0 ? users[users.length - 1].id + 1 : 1
        
        while (true) {
            if (users.some(u => u.id === userId)) userId = userId + 1
            else break
        }
        
        newUser.id = userId
        newUser.role = 'user'
        
        const newUsers = [...users, newUser]
        setUsers(newUsers)
        localStorage.setItem('users', JSON.stringify(newUsers))
        
        setSession(newUser)
        
        return true
    }

    const editUser = (updatedUser) => {
        try {
            // Obtener usuarios actuales del localStorage
            const usuariosGuardados = localStorage.getItem('users')
            if (usuariosGuardados) {
                let parsed = JSON.parse(usuariosGuardados)
                const index = parsed.findIndex(u => u.id === updatedUser.id)
                
                if (index !== -1) {
                    // Actualizar el usuario
                    parsed[index] = { ...parsed[index], ...updatedUser }
                    
                    // Guardar en localStorage
                    localStorage.setItem('users', JSON.stringify(parsed))
                    
                    // IMPORTANTE: Actualizar el estado users también
                    setUsers(parsed)
                    
                    // Actualizar currentUser si es el mismo usuario
                    const current = getCurrentUserFromLocal()
                    if (current && current.id === updatedUser.id) {
                        const updatedCurrent = { ...current, ...updatedUser }
                        localStorage.setItem('currentUser', JSON.stringify(updatedCurrent))
                        setCurrentUser(updatedCurrent)
                    }
                    
                    return true
                }
            }
            return false
        } catch (e) {
            console.error('Error al editar usuario:', e)
            return false
        }
    }

    const replaceUser = (user) => {
        const index = users.findIndex(u => u.id === user.id)
        if (index !== -1) {
            const editedUsers = [...users]
            editedUsers[index] = user
            setUsers(editedUsers)
            localStorage.setItem('users', JSON.stringify(editedUsers))
            return true
        }
        return false
    }
    
    const getCurrentUserFromLocal = () => {
        const session = localStorage.getItem('currentUser');
        if (!session) return null;
        return JSON.parse(session);
    }

    const getCurrentUser = () => {
        // Primero intentar desde el estado
        if (currentUser) return currentUser;
        
        // Si no, desde localStorage
        const session = localStorage.getItem('currentUser');
        if (!session) return null;
        
        const sessionUser = JSON.parse(session);
        
        // Buscar el usuario completo en el estado users
        const fullUser = users.find(u => u.id === sessionUser.id);
        if (fullUser) {
            setCurrentUser(fullUser);
            return fullUser;
        }
        
        return sessionUser;
    }

    const getUserById = (id) => {
        // Buscar primero en el estado users (que debería estar actualizado)
        let user = users.find(u => u.id === id)
        
        // Si no está en el estado, buscar en localStorage
        if (!user) {
            try {
                const usuariosGuardados = localStorage.getItem('users')
                if (usuariosGuardados) {
                    const parsed = JSON.parse(usuariosGuardados)
                    user = parsed.find(u => u.id === id)
                    // Actualizar el estado si encontramos el usuario
                    if (user) {
                        setUsers(parsed)
                    }
                }
            } catch (e) {
                console.error('Error al buscar usuario:', e)
            }
        }
        
        return user || null
    }

    const checkUsername = (username) => {
        const found = users.find(u => u.username === username)
        if (found) return true
        return false
    }
    
    const checkMail = (mail) => {
        const found = users.find(u => u.mail === mail)
        if (found) return true
        return false
    }
    
    const resetUsers = () => {
        setUsers(defaultUsers)
        localStorage.setItem('users', JSON.stringify(defaultUsers))        
    }
    
    const login = (credField, passField) => {
        const found = users.find(u => (u.mail === credField || u.username === credField) && u.password === passField)        
        
        if (!found) return false
        
        setSession(found)
        setCurrentUser(found)
        
        return true
    }
    
    const setSession = (sessionUser) => {
        const sessionData = {
            id: sessionUser.id,
            username: sessionUser.username,
            role: sessionUser.role,
            name: sessionUser.name,
            mail: sessionUser.mail,
            instrument: sessionUser.instrument
        }
        localStorage.setItem('currentUser', JSON.stringify(sessionData));
        setCurrentUser(sessionData)
    }
    
    // Nueva función para refrescar el usuario actual
    const refreshCurrentUser = () => {
        const session = localStorage.getItem('currentUser');
        if (session) {
            const sessionUser = JSON.parse(session);
            const fullUser = users.find(u => u.id === sessionUser.id);
            if (fullUser) {
                setCurrentUser(fullUser);
                return fullUser;
            }
            setCurrentUser(sessionUser);
            return sessionUser;
        }
        return null;
    }
    
    return {
        users,
        loading,
        currentUser,
        addUser,
        editUser,
        replaceUser,
        resetUsers,
        getUserById,
        getCurrentUser,
        refreshCurrentUser,
        login,
        checkUsername,
        checkMail
    }
}

export default useUsuarios