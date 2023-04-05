import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../../config/axios';

const Login = () => {
    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        // Comprobar si los campos están vacíos
        if ([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return;
        }

        // Comprobar si el email es válido
        let regexEmail = new RegExp("^[[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$");

        if (!regexEmail.test(email)) {
            setAlerta({
                msg: 'El correo electrónico no es válido',
                error: true
            });

            return;
        }

        try { 
            // Login de usuario
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
            localStorage.setItem('apv_token', data.token);

            setAuth(data);
            
            navigate('/admin');

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta;

    return (
        <>
            <div className="md:w-1/2 mb-12 md:mb-0">
                <h1 className="text-indigo-600 font-black text-6xl capitalize">Inicia Sesión y Administra tus <span className="text-black">pacientes</span></h1>
            </div>

            <div className="md:w-1/2 shadow-lg px-5 py-10 rounded-xl bg-white">

                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-6">
                        <label htmlFor="email" className="uppercase text-gray-600 block text-md font-bold">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="El Correo Electrónico"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-md font-bold">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="La Contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="w-full mt-4 p-3 transition-colors duration-200 bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-bold uppercase rounded-lg"
                    />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes una cuenta? Regístrate</Link>
                    <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvidé mi Contraseña</Link>
                </nav>

            </div>
        </>
    )
}

export default Login;