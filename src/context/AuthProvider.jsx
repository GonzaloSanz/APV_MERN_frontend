import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState('');

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('apv_token');

            // Si no hay token, detiene la autenticación
            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Obtener los datos del usuario con ese token
                const { data } = await clienteAxios('/veterinarios/perfil', config);
                setAuth(data);

            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }

        autenticarUsuario();
    }, [auth, setAuth]);

    const cerrarSesion = () => {
        // Eliminar el token de LocalStorage y vaciar Auth
        localStorage.removeItem('apv_token');

        setAuth({});
    }

    const actualizarDatos = async datos => {
        const token = localStorage.getItem('apv_token');

        // Si no hay token, detiene la autenticación
        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try { 
            const { data } = await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);
            setAuth(data);

            return {
                msg: 'Perfil actualizado correctamente'
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
        const token = localStorage.getItem('apv_token');

        // Si no hay token, detiene la autenticación
        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try { 
            const { data } = await clienteAxios.put('/veterinarios/actualizar-password', datos, config);

            return {
                msg: data.msg
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarDatos,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };

export default AuthContext;