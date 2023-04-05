import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  // Hacer tiempo hasta que termine la autenticanción
  if (cargando) return ''

  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : <Navigate to="/" />}
      <Footer />

    </>
  )
}

export default RutaProtegida;