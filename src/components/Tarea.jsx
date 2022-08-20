import { formatearFecha } from "../helpers"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"
import ModalAlerta from "./ModalAlerta"
const Tarea = ({ tarea }) => {
  const { modalEditarTarea, cambiarEstadoTarea, handleModalEliminar, alerta } =
    useProyectos()

  const admin = useAdmin()

  return (
    <>
      {!admin && <ModalAlerta alerta={alerta} />}
      <div
        className={`flex w-full ${
          !admin && "flex-col"
        } justify-between items-center md:flex-row  border-b p-5 last-of-type:border-none gap-2`}
      >
        <div className="flex flex-col justify-start items-center md:items-start w-4/5">
          <h1 className="font-bold text-xl">{tarea.nombre}</h1>
          <p className="text-sm text-stone-300 ">{tarea.descripcion}</p>
          <p className="text-sm text-stone-200">
            Fecha{" "}
            <span className="font-bold">
              {formatearFecha(tarea.fechaEntrega)}
            </span>
          </p>
          {tarea.estado && (
            <p className="mt-2 text-sm bg-green-500 font-bold p-1 rounded">
              Completada por: {""}
              <span>{tarea.completado.nombre}</span>
            </p>
          )}
        </div>

        <div className="flex gap-2 flex-col md:flex-row">
          {admin && (
            <button
              className="px-5 py-2  rounded text-sm bg-indigo-600  hover:bg-indigo-500 hover:text-stone-900 font-bold transition-all"
              onClick={() => {
                modalEditarTarea(tarea)
              }}
            >
              Editar
            </button>
          )}

          <button
            onClick={() => {
              cambiarEstadoTarea(tarea)
            }}
            className={`${
              tarea?.estado
                ? "bg-green-400 text-stone-700 hover:bg-green-200"
                : "bg-stone-400 text-stone-700 hover:bg-red-200 "
            } px-5 py-2  rounded text-sm  hover:text-stone-900 font-bold transition-all`}
          >
            {tarea?.estado ? "Completa" : "Incompleta"}
          </button>
          {admin && (
            <button
              onClick={() => {
                handleModalEliminar(tarea)
              }}
              className="px-5 py-2  rounded text-sm bg-red-700  hover:bg-red-600 hover:text-stone-300 font-bold transition-all"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Tarea
