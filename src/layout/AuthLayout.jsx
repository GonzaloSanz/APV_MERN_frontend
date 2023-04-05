import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:flex md:items-center gap-12 my-20 md:mt-28 p-8 md:p-5">
        <Outlet />

      </main>
    </>
  )
}

export default AuthLayout;