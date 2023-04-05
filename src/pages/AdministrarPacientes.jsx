import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <button 
        type="button"
        className="mx-10 mb-10 md:hidden bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase p-3 rounded-md cursor-pointer transition-colors duration-200"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>

      <div className={`${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes;