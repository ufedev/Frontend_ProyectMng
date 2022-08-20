import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const Sidebar = () => {
  const { auth } = useAuth()

  return (
    <aside className="md:w-1/4 xl:w-1/6 bg-stone-800 p-2">
      <p className=" font-bold p-5 capitalize">Hola {auth.nombre}</p>
      <nav>
        <Link
          to="nuevo-proyecto"
          className="text-center block border border-indigo-400 font-bold text-lg rounded p-2 hover:text-indigo-400 transition-colors"
        >
          Nuevo Proyecto
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar
