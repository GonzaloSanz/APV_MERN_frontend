import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        // Comprobar si el token es válido
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setTokenValido(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    }

    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    // Comprobar longitud de la contraseña
    if (password.trim().length < 8) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 8 caracteres',
        error: true
      });

      return;
    }

    // Cambiar contraseña
    try {
      const { data } = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, { password });

      setAlerta({
        msg: data.msg
      });

      setPasswordModificado(true);
      setPassword('');

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
        <h1 className="text-indigo-600 font-black text-6xl capitalize">Restablece tu Contraseña y no Pierdas Acceso a tus <span className="text-black">pacientes</span></h1>
      </div>

      <div className="md:w-1/2 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <label htmlFor="password" className="uppercase text-gray-600 block text-md font-bold">Nueva Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Tu Nueva Contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-lg"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Cambiar Contraseña"
              className="w-full mt-4 p-3 transition-colors duration-200 bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-bold uppercase rounded-lg"
            />
          </form>
        )}

        {passwordModificado && <Link to="/" className='block text-center my-6 text-gray-500'>Iniciar Sesión</Link>}
      </div>
    </>
  )
}

export default NuevoPassword;