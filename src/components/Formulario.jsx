import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fechaAlta, setFechaAlta] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState('');

  const { guardarPaciente, paciente, alerta, setAlerta } = usePacientes();

  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFechaAlta(new Date(paciente.fechaAlta).toLocaleDateString('en-CA'));
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar formulario
    if ([nombre, propietario, email, fechaAlta, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    // Comprobar si el email es válido
    let regexEmail = new RegExp("^[[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$");

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

    await guardarPaciente({ nombre, propietario, email, fechaAlta, sintomas, id });

    // Reiniciar el formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFechaAlta('');
    setSintomas('');
    setId('');
  }

  const { msg } = alerta;

  return (
    <>
      <h2 className="font-bold text-3xl text-center capitalize">Administrador de pacientes</h2>

      <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y <span className="text-indigo-600 font-bold">Adminístralos</span></p>


      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-md shadow-lg px-5 py-10 mb-10 lg:mb-0">

        {msg && <Alerta alerta={alerta} />}

        <div className="mb-6">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="propietario" className="text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Correo Electrónico del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="fechaAlta" className="text-gray-700 uppercase font-bold">Fecha Alta</label>
          <input
            id="fechaAlta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechaAlta}
            onChange={e => setFechaAlta(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea
            id="sintomas"
            placeholder="Describe los síntomas aquí..."
            rows="5"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase w-full p-3 rounded-md cursor-pointer transition-colors duration-200"
          value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
        />

      </form>
    </>
  )
}

export default Formulario;