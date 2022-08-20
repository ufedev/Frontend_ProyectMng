import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Spinner from "../components/Spinner"
import ModalTarea from "../components/ModalTarea"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import Tarea from "../components/Tarea"
import Colaborador from "../components/Colaborador"
import useAdmin from "../hooks/useAdmin"
import { formatearFecha } from "../helpers"
import { io } from "socket.io-client"
let socket

const Proyecto = () => {
  const { id } = useParams()
  const {
    proyecto,
    cargando,
    obtenerProyecto,
    eliminarProyecto,
    handleModal,
    socketAgregarTarea,
    socketEditarTarea,
    socketEliminarTarea,
    socketCambiarEstado,
  } = useProyectos()
  const admin = useAdmin()
  useEffect(() => {
    obtenerProyecto(id)
  }, [])
  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL)
    socket.emit("abrir proyecto", id)
  }, [])

  useEffect(() => {
    socket.on("tarea agregada", (tarea) => {
      if (tarea.proyecto === proyecto._id) socketAgregarTarea(tarea)
    })

    socket.on("tarea editada", (tarea) => {
      if (tarea.proyecto._id === proyecto._id) socketEditarTarea(tarea)
    })

    socket.on("tarea eliminada", (tarea) => {
      if (tarea.proyecto._id === proyecto._id) socketEliminarTarea(tarea)
    })

    socket.on("estado cambiado", (tarea) => {
      if (tarea.proyecto._id === proyecto._id) socketCambiarEstado(tarea)
    })
  })

  const { nombre, descripcion, cliente, fechaEntrega, tareas } = proyecto

  if (cargando) return <Spinner />
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div>
          <div>
            <h1 className="font-bold text-4xl">{nombre}</h1>
            <p className="text-sm py-1 text-stone-300">{descripcion}</p>
            <p className="text-sm  text-stone-300">
              Cliente : <span className="font-bold">{cliente}</span>
            </p>
            <p className="text-sm font-bold">
              Fecha de Entrega : {formatearFecha(fechaEntrega)}
            </p>
          </div>

          <div>
            <ModalTarea proyecto={proyecto} />
            <ModalEliminarTarea proyecto={proyecto} />
            <ModalEliminarColaborador proyecto={proyecto} />
          </div>
        </div>
        {admin && (
          <div>
            <div className="p-1 text-stone-400 hover:text-white">
              <Link to={`/proyectos/editar/${id}`} className="flex gap-2">
                {" "}
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>{" "}
                Editar
              </Link>
            </div>
            <div className="p-1 text-stone-400 hover:text-white">
              <button
                onClick={() => {
                  eliminarProyecto(id)
                }}
                className="flex gap-2"
              >
                {" "}
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>{" "}
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-10 gap-3">
        <h3 className="text-3xl font-bold text-stone-300">Tareas</h3>
        {admin && (
          <button
            onClick={handleModal}
            className="px-5 py-2 border rounded flex gap-2 hover:bg-stone-100 hover:text-stone-900 font-bold transition-all w-full justify-center  md:w-1/4 xl:w-1/12 "
          >
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
                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
              />
            </svg>
            Nueva Tarea
          </button>
        )}
      </div>
      <div className="p-y bg-stone-600 mt-5 rounded shadow">
        {tareas?.length > 0 ? (
          <>
            {tareas.map((tarea) => (
              <Tarea key={tarea?._id} tarea={tarea} />
            ))}
          </>
        ) : (
          <p className="p-5 font-bold">No hay tareas actualmente</p>
        )}
      </div>
      {admin && (
        <>
          <div className="mt-10">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-stone-300">
                Colaboradores
              </h3>
              <Link
                to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
                className="p-1 text-stone-400 hover:text-white font-bold flex gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Añadir
              </Link>
            </div>
          </div>
          <div className="">
            {proyecto?.colaboradores?.length > 0 ? (
              proyecto.colaboradores.map((col) => (
                <Colaborador key={col._id} colaborador={col} />
              ))
            ) : (
              <p className="p-5 font-bold">
                No hay Colaboradores en este proyecto
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Proyecto
