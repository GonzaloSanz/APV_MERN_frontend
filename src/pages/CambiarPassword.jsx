import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
  const { guardarPassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    password_actual: '',
    password_nueva: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      return;
    }

    if (password.password_nueva.length < 8) {
      setAlerta({
        msg: 'La contraseña nueva debe tener al menos 8 caracteres',
        error: true
      });

      return;
    }

    // Cambiamos la contraseña
    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);

    // Si no hay error, se vacía el objeto de contraseña
    if (!respuesta.error) {
      setTimeout(() => {
        setAlerta({});
      }, 4000);

      setPassword({
        password_actual: '',
        password_nueva: ''
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Contraseña aquí</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 mg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            <div>
              <label htmlFor="password_actual" className="uppercase font-bold text-gray-600">Contraseña Actual</label>

              <input
                id="password_actual"
                name="password_actual"
                type="password"
                placeholder="Tu Contraseña Actual"
                className="w-full mt-3 border bg-gray-50 rounded-md p-2"
                value={password.password_actual}
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div>
              <label htmlFor="password_nuevo" className="uppercase font-bold text-gray-600">Contraseña Nueva</label>

              <input
                id="password_nueva"
                name="password_nueva"
                type="password"
                placeholder="Tu Nueva Contraseña"
                className="w-full mt-3 border bg-gray-50 rounded-md p-2"
                value={password.password_nueva}
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Cambiar Contraseña"
              className="w-full block px-10 py-3 cursor-pointer bg-indigo-700 hover:bg-indigo-800 transition-colors duration-200 rounded-md text-white font-bold uppercase"
            />
          </form>
        </div>
      </div>

    </>
  )
}

export default CambiarPassword;