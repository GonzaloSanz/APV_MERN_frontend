import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from '../hooks/useAuth';
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
  const { auth, actualizarDatos } = useAuth();

  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes('')) {
      setAlerta({
        msg: 'El nombre y el correo electrónico son obligatorios',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    let regexEmail = new RegExp("^[[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$");

    // Comprobar si el email es válido
    if (!regexEmail.test(email)) {
      setAlerta({
        msg: 'El correo electrónico no es válido',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    setAlerta({});

    const resultado = await actualizarDatos(perfil);

    setAlerta(resultado);

    setTimeout(() => {
      setAlerta({});
    }, 3000);
  }

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Información aquí</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 mg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            <div>
              <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu Nombre"
                className="w-full mt-3 border bg-gray-50 rounded-md p-2"
                value={perfil.nombre || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div>
              <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio Web</label>

              <input
                id="web"
                name="web"
                type="text"
                placeholder="Tu Sitio Web"
                className="w-full mt-3 border bg-gray-50 rounded-md p-2"
                value={perfil.web || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}

              />
            </div>

            <div>
              <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>

              <input
                id="telefono"
                name="telefono"
                type="text"
                placeholder="Tu Teléfono"
                className="w-full mt-3 border bg-gray-50 rounded-md p-2"
                value={perfil.telefono || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div>
              <label htmlFor="email" className="uppercase font-bold text-gray-600">Correo Electrónico</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Tu Correo Electrónico"
                className="w-full mt-3 border bg-gray-50 rounded-md p-2"
                value={perfil.email || ''}
                onChange={e => setPerfil({
                  ...perfil,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="w-full block px-10 py-3 cursor-pointer bg-indigo-700 hover:bg-indigo-800 transition-colors duration-200 rounded-md text-white font-bold uppercase"
            />
          </form>
        </div>
      </div>

    </>
  )
}

export default EditarPerfil;