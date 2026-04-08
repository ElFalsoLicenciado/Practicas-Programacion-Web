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
        if (users.some(u => u.mail === newUser)) exists = true;
        
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

    const editUser = (id, data, field) => {
        const user = getUserById(id)

        if(!user) return false

        switch (field) {
            case 'name' : user.name = data 
            break;
            
            case 'mail' : user.mail = data
            break;
            
            case 'password' : user.password = data
            break;

            case 'instrument' : user.instrument = data
            break;
        
            default:
                break;
        }
        return replaceUser(user)
    }

    const replaceUser = (user) => {
        const index = users.findIndex(u => u.id === user.id)

        if(index !== -1) {
            const editedUsers = users
            editedUsers[index] = user
            setUsers(editedUsers)
            return true
        }
        return false
    }
    
    const getCurrentUser = () => {
        const session = localStorage.getItem('currentUser');
        if (!session) return null;

        return JSON.parse(session);
    }


    const getUserById = (id) => {
        const user = users.find(u => (u.id === id))

        return user
    }

    const checkUsername = (username) => {
        const found = users.find(u => (u.username === username))
        
        if (found) return true
        return false
    }
    
    const checkMail = (mail) => {
        const found = users.find(u => (u.mail === mail))

        if (found) return true
        return false
    }
    
    const resetUsers = () => {
        setUsers(defaultUsers)
        localStorage.setItem('users', JSON.stringify(defaultUsers))        
    }
    
    const login = (credField , passField) => {
        const found = users.find(u => (u.mail === credField || u.username === credField) && u.password === passField)        
        
        if (!found) return false
        
        setSession(found)
        
        return true
    }
    
    const setSession = (sessionUser) => {
        localStorage.setItem('currentUser', JSON.stringify({
            id: sessionUser.id,
            username: sessionUser.username,
            role: sessionUser.role
        }));
    }
    
    return {
        users,
        loading,
        addUser,
        editUser,
        resetUsers,
        getCurrentUser,
        login,
        checkUsername,
        checkMail
    }
}

export default useUsuarios