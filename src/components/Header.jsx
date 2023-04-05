import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { cerrarSesion } = useAuth();

    return (
        <header className="py-10 px-5 md:px-0 bg-indigo-600">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-center">
                <h1 className="font-bold text-2xl text-indigo-200 mb-7 lg:mb-0">Administrador de Pacientes <span className="text-white font-black">Veterinaria</span></h1>
                
                <nav className="flex gap-6">
                    <Link to="/admin" className="text-white text-md uppercase font-bold">Pacientes</Link>
                    <Link to="/admin/perfil" className="text-white text-md uppercase font-bold">Perfil</Link>
                
                    <button onClick={cerrarSesion} className="text-white text-md uppercase font-bold">Cerrar Sesión</button>
                
                </nav>
            </div>
        </header>
    )
}

export default Header;