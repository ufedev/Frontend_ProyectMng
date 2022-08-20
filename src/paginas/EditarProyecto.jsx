import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Formulario from "../components/Formulario"
import Spinner from "../components/Spinner"

const EditarProyecto = () => {
  const { id } = useParams()

  const { proyecto, cargando, obtenerProyecto } = useProyectos()

  useEffect(() => {
    obtenerProyecto(id)
  }, [])

  const { nombre } = proyecto

  if (cargando) return <Spinner />
  return (
    <div className="p-5">
      <h1 className="text-white text-4xl font-bold">
        Editar:
        <Link
          className="hover:text-red-100 transition-all"
          to={`/proyectos/${id}`}
        >
          {nombre}
        </Link>{" "}
      </h1>
      <Formulario proyecto={proyecto} />
    </div>
  )
}

export default EditarProyecto
