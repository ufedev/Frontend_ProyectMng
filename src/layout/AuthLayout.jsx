import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const AuthLayout = () => {
  const { auth, cargando } = useAuth()

  if (cargando) {
    return (
      <div className="text-white font-bold text-xl flex justify-center items-center h-screen w-full">
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <>
      {!auth?._id ? (
        <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
          <div className="md:w-2/3 lg:w-1/2">
            <Outlet />
          </div>
        </main>
      ) : (
        <Navigate to="/proyectos" />
      )}
    </>
  )
}

export default AuthLayout
