import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();

    const [cargando, setCargando] = useState(true);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('apv_token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);

            } catch (error) {
                console.log(error);
            }

            setCargando(false);
        }

        obtenerPacientes();
    }, [auth, pacientes]);

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('apv_token');

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            // Edición
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado);

                setAlerta({
                    msg: 'Paciente modificado correctamente'
                });

                setTimeout(() => {
                    setAlerta({});
                }, 3000);

            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });

                setTimeout(() => {
                    setAlerta({});
                }, 3000);
            }

        } else {
            // Nuevo registro
            try {
                // Almacenar el paciente en la base de datos
                const { data } = await clienteAxios.post('/pacientes', paciente, config);

                // Recoger los valores que interesan en pacienteAlmacenado
                const { createAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                setPacientes([...pacientes, pacienteAlmacenado]);

                setAlerta({
                    msg: 'Paciente agregado correctamente'
                });

                setTimeout(() => {
                    setAlerta({});
                }, 3000);

            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
        setPaciente({});

        Swal.fire({
            title: '¿Deseas eliminar este paciente?',
            text: "No se podrán revertir los cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',

        }).then(async (result) => {
            if (result.isConfirmed) {

                const token = localStorage.getItem('apv_token');

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    // Eliminar paciente y notificarlo con una alerta
                    const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                    Swal.fire({
                        icon: 'success',
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 2500
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    return (
        <PacientesContext.Provider
            value={{
                cargando,
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                alerta,
                setAlerta,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export { PacientesProvider };

export default PacientesContext;