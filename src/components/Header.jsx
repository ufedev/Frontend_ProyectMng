import { Link, useNavigate } from "react-router-dom"

import useProyectos from "../hooks/useProyectos"
import useAuth from "../hooks/useAuth"

import ModalBuscar from "./ModalBuscar"
const Header = () => {
  const { handleModalBuscar, cerrarSessionStates } = useProyectos()
  const { cerrarSession } = useAuth()

  const handleClose = () => {
    cerrarSessionStates()
    cerrarSession()
  }
  return (
    <header>
      <ModalBuscar />
      <div className="flex flex-col gap-3 md:flex-row md:justify-between px-5 py-10 items-center">
        <h1 className="text-2xl text-indigo-500 font-bold">
          Administrador de <span className="text-white">Proyectos</span>
        </h1>
        <button
          onClick={handleModalBuscar}
          className="flex gap-2 items-center font-bold flex-row-reverse hover:scale-105 transition-all"
        >
          Buscar Proyecto{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <div className="flex gap-3 items-center">
          <Link
            to="/proyectos"
            className="font-bold uppercase hover:text-indigo-400 transition-colors"
          >
            Proyectos
          </Link>
          <button
            className="cursor-pointer text-indigo-400 text-sm font-bold border rounded border-indigo-300 p-2 hover:bg-indigo-300 hover:text-black transition-all"
            onClick={handleClose}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
