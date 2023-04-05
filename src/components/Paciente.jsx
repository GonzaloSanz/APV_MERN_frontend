import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
    const { setEdicion, eliminarPaciente } = usePacientes();
    const { nombre, propietario, email, fechaAlta, sintomas, _id } = paciente;

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha);

        return new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(nuevaFecha);
    };

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl space-y-3">
            <p className="font-bold uppercase">Nombre: <span className="ml-1 font-normal normal-case text-black">{nombre}</span></p>
            <p className="font-bold uppercase">Propietario: <span className="ml-1 font-normal normal-case text-black">{propietario}</span></p>
            <p className="font-bold uppercase">Correo Electrónico: <span className="ml-1 font-normal normal-case text-black">{email}</span></p>
            <p className="font-bold uppercase">Fecha Alta: <span className="ml-1 font-normal normal-case text-black">{formatearFecha(fechaAlta)}</span></p>
            <p className="font-bold uppercase">Síntomas: <span className="ml-1 font-normal normal-case text-black">{sintomas}</span></p>

            <div className="w-full flex gap-4">
                <button
                    type="button"
                    className="w-1/2 md:w-auto mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase px-3 md:px-10 py-2 rounded-md cursor-pointer transition-colors duration-200"
                    onClick={() => setEdicion(paciente)}
                >Editar</button>

                <button
                    type="button"
                    className="w-1/2 md:w-auto mt-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase px-3 md:px-10 py-2 rounded-md cursor-pointer transition-colors duration-200"
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>

        </div>

    )
}

export default Paciente;