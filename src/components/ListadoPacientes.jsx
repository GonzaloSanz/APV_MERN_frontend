import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {

  const { cargando, pacientes } = usePacientes();

  if (cargando) return '';

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-bold text-3xl text-center capitalize">Listado de pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">Gestiona tus <span className="text-indigo-600 font-bold">Pacientes y Citas</span></p>

          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>

      ) : (

        <>
          <h2 className="font-bold text-3xl text-center capitalize">No hay pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span></p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes;