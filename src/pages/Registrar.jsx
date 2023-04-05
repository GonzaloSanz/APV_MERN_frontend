import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      });

      return;
    }

    if (password.length < 8) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 8 caracteres',
        error: true
      });

      return;
    }

    setAlerta({});

    // Registrar el usuario
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });

      setAlerta({
        msg: 'Usuario creado correctamente, revisa tu correo electrónico',
        error: false
      })

      // Resetear el formulario
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alerta;

  return (
    <>
      <div className="md:w-1/2 mb-12 md:mb-0">
        <h1 className="text-indigo-600 font-black text-6xl capitalize">Crea tu Cuenta y Administra tus <span className="text-black">pacientes</span></h1>
      </div>

      <div className="md:w-1/2 shadow-lg px-5 py-10 rounded-xl bg-white">
        <form onSubmit={handleSubmit} noValidate>
          {msg && <Alerta alerta={alerta} />}

          <div className="mb-6">
            <label htmlFor="nombre" className="uppercase text-gray-600 block text-md font-bold">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu Nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="uppercase text-gray-600 block text-md font-bold">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Tu Correo Electrónico"
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
              placeholder="Tu Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="repetir_password" className="uppercase text-gray-600 block text-md font-bold">Repetir Contraseña</label>
            <input
              id="repetir_password"
              type="password"
              placeholder="Repite la Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Registrarse"
            className="w-full mt-4 p-3 transition-colors duration-200 bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-bold uppercase rounded-lg"
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvidé mi Contraseña</Link>
        </nav>

      </div>
    </>
  )
}

export default Registrar;