import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
const NuevoColaborador = () => {
  const {
    obtenerProyecto,
    colaborador,
    setColaborador,
    agregarColaborador,
    proyecto,
  } = useProyectos()
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    setColaborador({})
    async function ejecutar() {
      await obtenerProyecto(params?.id)
      if (!proyecto?._id) {
        navigate("/")
      }
    }
    ejecutar()
  }, [])

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold text-stone-200">
        <span className="text-indigo-400">Nuevo Colaborador-</span>
        <Link
          className="hover:text-red-100 transition-colors"
          to={`/proyectos/${params.id}`}
        >
          {" "}
          Proyecto {proyecto?.nombre}
        </Link>
      </h1>
      <FormularioColaborador />

      {colaborador._id && (
        <>
          <div className="w-full md:w-3/4 rounded bg-stone-800 mx-auto mt-10 p-5">
            <div className="flex justify-between items-center">
              <h1 className="font-bold capitalize text-stone-200 text-xl">
                {colaborador.nombre}
              </h1>
              <button
                className="px-5 py-2 border rounded font-bold text-sm  hover:bg-stone-200 hover:text-stone-900  transition-colors"
                onClick={() => {
                  agregarColaborador(colaborador.email)
                }}
              >
                Agregar Colaborador
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NuevoColaborador
