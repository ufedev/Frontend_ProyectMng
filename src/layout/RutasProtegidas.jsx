import useAuth from "../hooks/useAuth"
import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useEffect } from "react"
const RutasProtegidas = () => {
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
      {auth._id ? (
        <div className="text-white md:min-h-full">
          <Header />
          <div className="md:flex md:gap-1 md:min-h-screen">
            <Sidebar />

            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default RutasProtegidas
