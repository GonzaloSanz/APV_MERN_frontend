import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="flex justify-around gap-5 border-b pb-4 px-3">
        <Link to="/admin/perfil" className="font-bold uppercase text-gray-500">Mis Datos</Link>
        <Link to="/admin/cambiar-password" className="font-bold uppercase text-gray-500">Cambiar Contraseña</Link>
    </div>
  )
}

export default AdminNav;